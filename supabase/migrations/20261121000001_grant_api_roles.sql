-- Newer Supabase projects no longer grant table access to the API roles by
-- default; RLS policies only filter rows, so each role needs explicit grants.

grant usage on schema public to anon, authenticated;

grant select on public.laptop_models, public.laptop_components,
  public.diagnostic_issues, public.spare_parts to anon, authenticated;

-- Profile updates stay limited to the column grant in the init schema.
grant select on public.profiles to authenticated;
grant select, insert, update on public.service_bookings to authenticated;
grant select, update on public.orders to authenticated;
grant select on public.order_items to authenticated;
