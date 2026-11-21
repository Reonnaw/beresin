-- Beresin core schema. Keep in sync with types/database.ts (regenerate with `pnpm db:types`).

create type public.user_role as enum ('customer', 'technician', 'admin');
create type public.module_type as enum (
  'battery', 'fan', 'ram', 'ssd', 'keyboard', 'screen', 'motherboard', 'expansion_card'
);
create type public.issue_severity as enum ('low', 'medium', 'high', 'critical');
create type public.service_type as enum ('drop_off', 'home_service');
create type public.booking_status as enum ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
create type public.order_status as enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled');

-- Tables ---------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now()
);

create table public.laptop_models (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text not null,
  release_year integer,
  model_url text,
  thumbnail_url text,
  created_at timestamptz not null default now()
);

create table public.laptop_components (
  id uuid primary key default gen_random_uuid(),
  model_id uuid not null references public.laptop_models (id) on delete cascade,
  module_type public.module_type not null,
  name text not null,
  mesh_name text not null,
  explode_direction double precision[] not null default '{0,1,0}',
  description text,
  created_at timestamptz not null default now(),
  unique (model_id, mesh_name)
);

create table public.diagnostic_issues (
  id uuid primary key default gen_random_uuid(),
  module_type public.module_type not null,
  title text not null,
  symptoms text[] not null default '{}',
  description text,
  severity public.issue_severity not null default 'medium',
  estimated_cost_min integer not null check (estimated_cost_min >= 0),
  estimated_cost_max integer not null,
  estimated_duration_minutes integer not null default 60 check (estimated_duration_minutes > 0),
  created_at timestamptz not null default now(),
  check (estimated_cost_max >= estimated_cost_min)
);

create table public.spare_parts (
  id uuid primary key default gen_random_uuid(),
  -- null = universal part that fits every model
  model_id uuid references public.laptop_models (id) on delete set null,
  module_type public.module_type not null,
  sku text not null unique,
  name text not null,
  description text,
  price integer not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  model_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.service_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  model_id uuid not null references public.laptop_models (id),
  technician_id uuid references public.profiles (id) on delete set null,
  status public.booking_status not null default 'pending',
  service_type public.service_type not null,
  scheduled_at timestamptz not null,
  address text,
  notes text,
  diagnosis jsonb not null default '{}',
  estimated_cost integer check (estimated_cost >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (service_type <> 'home_service' or address is not null)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  status public.order_status not null default 'pending',
  total_amount integer not null check (total_amount >= 0),
  shipping_address text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  spare_part_id uuid not null references public.spare_parts (id),
  quantity integer not null check (quantity > 0),
  unit_price integer not null check (unit_price >= 0)
);

create index on public.laptop_components (model_id);
create index on public.diagnostic_issues (module_type);
create index on public.spare_parts (module_type);
create index on public.spare_parts (model_id);
create index on public.service_bookings (user_id);
create index on public.orders (user_id);
create index on public.order_items (order_id);

-- Triggers -------------------------------------------------------------------

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger service_bookings_updated_at before update on public.service_bookings
  for each row execute function public.set_updated_at();
create trigger orders_updated_at before update on public.orders
  for each row execute function public.set_updated_at();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row level security ---------------------------------------------------------

create function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('technician', 'admin')
  );
$$;

alter table public.profiles enable row level security;
alter table public.laptop_models enable row level security;
alter table public.laptop_components enable row level security;
alter table public.diagnostic_issues enable row level security;
alter table public.spare_parts enable row level security;
alter table public.service_bookings enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Own profile or staff can read" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_staff());
create policy "Users update own profile" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
-- Users may edit contact fields only; role changes go through the dashboard.
revoke update on public.profiles from authenticated;
grant update (full_name, phone) on public.profiles to authenticated;

create policy "Catalog is public" on public.laptop_models
  for select to anon, authenticated using (true);
create policy "Catalog is public" on public.laptop_components
  for select to anon, authenticated using (true);
create policy "Catalog is public" on public.diagnostic_issues
  for select to anon, authenticated using (true);
create policy "Active parts are public" on public.spare_parts
  for select to anon, authenticated using (is_active or public.is_staff());

create policy "Own bookings or staff can read" on public.service_bookings
  for select to authenticated using (user_id = auth.uid() or public.is_staff());
create policy "Users create pending bookings" on public.service_bookings
  for insert to authenticated
  with check (user_id = auth.uid() and status = 'pending' and technician_id is null);
create policy "Staff update bookings" on public.service_bookings
  for update to authenticated using (public.is_staff()) with check (public.is_staff());

-- Orders are created only through place_order, so there is no insert policy.
create policy "Own orders or staff can read" on public.orders
  for select to authenticated using (user_id = auth.uid() or public.is_staff());
create policy "Staff update orders" on public.orders
  for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "Items of readable orders" on public.order_items
  for select to authenticated using (
    exists (
      select 1 from public.orders o
      where o.id = order_id and (o.user_id = auth.uid() or public.is_staff())
    )
  );

-- Checkout -------------------------------------------------------------------

-- Prices come from the database, never from the client, and stock is reserved
-- atomically: any failure rolls back the whole order.
create function public.place_order(items jsonb, shipping_address text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_order uuid;
  v_total integer := 0;
  v_item record;
begin
  if v_user is null then
    raise exception 'Silakan masuk terlebih dahulu.' using errcode = '28000';
  end if;
  if coalesce(btrim(shipping_address), '') = '' then
    raise exception 'Alamat pengiriman wajib diisi.' using errcode = 'P0001';
  end if;
  if jsonb_typeof(items) <> 'array' or jsonb_array_length(items) = 0 then
    raise exception 'Keranjang kosong.' using errcode = 'P0001';
  end if;

  insert into public.orders (user_id, total_amount, shipping_address)
  values (v_user, 0, btrim(shipping_address))
  returning id into v_order;

  for v_item in
    select r.spare_part_id, r.quantity, p.price, p.name
    from (
      select x.spare_part_id, sum(x.quantity)::integer as quantity
      from jsonb_to_recordset(items) as x (spare_part_id uuid, quantity integer)
      group by x.spare_part_id
    ) r
    left join public.spare_parts p on p.id = r.spare_part_id and p.is_active
    order by r.spare_part_id -- fixed lock order avoids deadlocks between checkouts
  loop
    if v_item.price is null then
      raise exception 'Spare part tidak tersedia lagi.' using errcode = 'P0001';
    end if;
    if v_item.quantity is null or v_item.quantity < 1 then
      raise exception 'Jumlah barang tidak valid.' using errcode = 'P0001';
    end if;

    update public.spare_parts
    set stock = stock - v_item.quantity
    where id = v_item.spare_part_id and stock >= v_item.quantity;
    if not found then
      raise exception 'Stok % tidak mencukupi.', v_item.name using errcode = 'P0001';
    end if;

    insert into public.order_items (order_id, spare_part_id, quantity, unit_price)
    values (v_order, v_item.spare_part_id, v_item.quantity, v_item.price);
    v_total := v_total + v_item.quantity * v_item.price;
  end loop;

  update public.orders set total_amount = v_total where id = v_order;
  return v_order;
end;
$$;

revoke execute on function public.place_order(jsonb, text) from public, anon;
grant execute on function public.place_order(jsonb, text) to authenticated;
