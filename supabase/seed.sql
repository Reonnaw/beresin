-- Demo catalog. Prices are whole rupiah. Safe to re-run on an empty schema only.

insert into public.laptop_models (slug, name, brand, release_year) values
  ('modular-13', 'Beresin Modular 13', 'Beresin', 2025),
  ('modular-16', 'Beresin Modular 16', 'Beresin', 2026);

-- mesh_name matches the module type, which is how the 3D workbench addresses each part.
insert into public.laptop_components (model_id, module_type, name, mesh_name, explode_direction)
select m.id, c.module_type::public.module_type, c.name, c.module_type, c.direction
from public.laptop_models m
cross join (values
  ('screen', 'Panel Layar 13.5" 2256x1504', '{0,0.5,-1}'::double precision[]),
  ('keyboard', 'Input Deck + Keyboard', '{0,1.6,0}'),
  ('battery', 'Baterai 61Wh', '{0,0.6,1}'),
  ('fan', 'Heatsink & Kipas', '{-0.6,1,-0.4}'),
  ('ssd', 'SSD NVMe M.2 2280', '{0.2,1,0.3}'),
  ('ram', 'RAM DDR5 SO-DIMM', '{0.6,1,-0.2}'),
  ('expansion_card', 'Expansion Card Bay', '{1,0,0}'),
  ('motherboard', 'Mainboard', '{0,0.3,0}')
) as c (module_type, name, direction)
where m.slug = 'modular-13';

insert into public.diagnostic_issues
  (module_type, title, symptoms, severity, estimated_cost_min, estimated_cost_max, estimated_duration_minutes)
values
  ('screen', 'Panel layar retak', '{"Garis atau retakan terlihat","Sebagian layar hitam"}', 'high', 1200000, 2100000, 60),
  ('screen', 'Backlight mati', '{"Layar gelap tapi gambar samar terlihat dengan senter"}', 'medium', 350000, 900000, 90),
  ('keyboard', 'Tombol tidak merespons', '{"Beberapa tombol tidak mengetik","Tombol terasa lengket"}', 'low', 150000, 650000, 45),
  ('keyboard', 'Kena tumpahan cairan', '{"Tombol mengetik sendiri","Touchpad tidak stabil"}', 'high', 450000, 1100000, 120),
  ('battery', 'Baterai drop', '{"Daya cepat habis","Persentase lompat-lompat"}', 'medium', 650000, 1300000, 30),
  ('battery', 'Baterai menggembung', '{"Casing bawah terangkat","Touchpad sulit diklik"}', 'critical', 750000, 1400000, 45),
  ('fan', 'Kipas berisik', '{"Bunyi mendengung","Suara kasar saat beban tinggi"}', 'low', 120000, 400000, 45),
  ('fan', 'Overheat', '{"Laptop mati sendiri saat panas","Performa turun drastis"}', 'high', 200000, 650000, 90),
  ('ssd', 'SSD tidak terdeteksi', '{"Muncul pesan no bootable device","Data tidak terbaca"}', 'critical', 450000, 2000000, 60),
  ('ssd', 'SSD lambat', '{"Booting sangat lama","Aplikasi sering not responding"}', 'medium', 150000, 1200000, 60),
  ('ram', 'RAM error', '{"Blue screen acak","Bunyi beep saat dinyalakan"}', 'high', 350000, 1500000, 30),
  ('expansion_card', 'Port USB-C tidak berfungsi', '{"Perangkat tidak terdeteksi","Charger tidak mengisi lewat port ini"}', 'low', 90000, 350000, 15),
  ('motherboard', 'Mati total', '{"Tidak ada lampu indikator","Tidak merespons tombol power"}', 'critical', 1800000, 5500000, 240),
  ('motherboard', 'Port charging rusak', '{"Tidak mengisi dari semua port"}', 'high', 650000, 1600000, 180);

insert into public.spare_parts (model_id, module_type, sku, name, description, price, stock)
select (select id from public.laptop_models where slug = p.model_slug),
       p.module_type::public.module_type, p.sku, p.name, p.description, p.price, p.stock
from (values
  ('modular-13', 'screen', 'BRS-SCR-13-2K', 'Panel Layar 13.5" 2K Matte', 'Panel IPS 2256x1504 dengan bezel magnetik.', 1650000, 6),
  ('modular-16', 'screen', 'BRS-SCR-16-QHD', 'Panel Layar 16" QHD 165Hz', 'Panel IPS 2560x1600, refresh 165Hz.', 2900000, 2),
  ('modular-13', 'keyboard', 'BRS-KBD-13-ID', 'Input Deck Keyboard Layout US', 'Input deck lengkap dengan touchpad dan keyboard backlit.', 890000, 10),
  ('modular-16', 'keyboard', 'BRS-KBD-16-NUM', 'Input Module Numpad 16"', 'Modul numpad tukar pasang untuk seri 16.', 450000, 0),
  ('modular-13', 'battery', 'BRS-BAT-13-61', 'Baterai 61Wh', 'Sel Li-ion 4 cell, 61Wh.', 1150000, 8),
  ('modular-16', 'battery', 'BRS-BAT-16-85', 'Baterai 85Wh', 'Sel Li-ion 4 cell, 85Wh.', 1450000, 3),
  ('modular-13', 'fan', 'BRS-FAN-13-HS', 'Heatsink & Kipas 13"', 'Assembly heatsink tembaga dengan kipas 4 pin.', 380000, 12),
  ('modular-16', 'fan', 'BRS-FAN-16-DUAL', 'Dual Fan Assembly 16"', 'Dua kipas untuk konfigurasi GPU diskrit.', 620000, 4),
  (null, 'ssd', 'BRS-SSD-512-G4', 'SSD NVMe 512GB Gen4', 'M.2 2280, baca hingga 5.000 MB/s.', 750000, 20),
  (null, 'ssd', 'BRS-SSD-1T-G4', 'SSD NVMe 1TB Gen4', 'M.2 2280, baca hingga 7.000 MB/s.', 1350000, 9),
  (null, 'ram', 'BRS-RAM-16-D5', 'RAM DDR5 16GB 5600MHz', 'SO-DIMM 262 pin.', 780000, 15),
  (null, 'ram', 'BRS-RAM-32-D5', 'RAM DDR5 32GB 5600MHz', 'SO-DIMM 262 pin.', 1450000, 0),
  (null, 'expansion_card', 'BRS-EXP-USBC', 'Expansion Card USB-C', 'USB-C 3.2 dengan dukungan charging.', 140000, 40),
  (null, 'expansion_card', 'BRS-EXP-HDMI', 'Expansion Card HDMI 2.1', 'Output video hingga 4K 60Hz.', 260000, 18),
  ('modular-13', 'motherboard', 'BRS-MB-13-R7', 'Mainboard Ryzen 7 7840U', 'Mainboard pengganti untuk seri 13.', 5200000, 2),
  ('modular-16', 'motherboard', 'BRS-MB-16-R9', 'Mainboard Ryzen 9 7940HS', 'Mainboard pengganti untuk seri 16.', 7400000, 1)
) as p (model_slug, module_type, sku, name, description, price, stock);
