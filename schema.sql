DROP TABLE IF EXISTS kandidat;
DROP TABLE IF EXISTS pemilih;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS users;

-- Tabel Kandidat
CREATE TABLE kandidat (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  visi_misi TEXT,
  total_suara INTEGER DEFAULT 0
);

-- Tabel Pengguna (Gabungan Admin, Demo, dan Pemilih)
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'pemilih', -- otomatis jadi pemilih kalau tidak diisi
  status_voting INTEGER DEFAULT 0 
);

-- Data Contoh Kandidat
INSERT INTO kandidat (nama, visi_misi) VALUES 
('Budi Santoso', 'Mewujudkan lingkungan yang bersih, aman, dan sejahtera.'),
('Siti Aminah', 'Fokus pada pemberdayaan UMKM lokal dan kegiatan positif pemuda.');

-- Data Contoh Pengguna (Ada Admin, Demo, dan Warga)
INSERT INTO users (username, password, role, status_voting) VALUES 
('admin', 'admin123', 'admin', 0),
('demo', 'demo123', 'demo', 0), -- Ini akun untuk Reviewer (Read-Only)
('warga01', '0812345678', 'pemilih', 0), 
('warga02', '0898765432', 'pemilih', 0);