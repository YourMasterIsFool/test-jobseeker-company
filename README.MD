# Laravel Jobseeker Company

🚀 **Laravel test payment gateway** adalah aplikasi berbasis Laravel yang menyediakan fitur transaksi **deposit** dan **withdraw** beserta menggunakan websocket

## 📋 Requirements

- **PHP 8.2**
- **Docker & Docker Compose**
- **Composer** (Dependency Manager untuk PHP)



## 🛠️ Installation Guide
### 1️⃣ Clone Repository
```bash
git clone https://github.com/YourMasterIsFool/test-jobseeker-company.git
cd test-jobseker-company
```


## Backend

```bash
cd backend2
```
### 2️⃣ Jalankan Docker Compose
Jika menggunakan Docker, jalankan perintah berikut:
```bash
docker-compose up -d
```

### 3️⃣ Install Dependencies
Jalankan perintah berikut untuk menginstal dependensi Laravel:
```bash
composer install
```

### 4️⃣ Copy dan Konfigurasi Environment
template env sudah tersedia .env
```bash
cp .env
```
Lalu, edit file `.env` untuk menyesuaikan konfigurasi database dan service lainnya.

### 5️⃣ Generate Application Key
```bash
php artisan key:generate
```
### 5️⃣ Install api
```bash
php artisan install:api
```
### 6️⃣ Migrasi Database
Jalankan migrasi database untuk membuat tabel yang diperlukan:
```bash
php artisan migrate
```

### 7️⃣ Jalankan Seeder
Tambahkan data awal ke dalam database dengan menjalankan seeder:
```bash
php artisan db:seed
```

### 8️⃣ Jalankan Server
Setelah semua konfigurasi selesai, jalankan Laravel:
```bash
php artisan serve
```
Akses aplikasi melalui **[http://localhost:8000](http://localhost:8000)**
Dokumentasi postman ada di [sini](https://app.getpostman.com/join-team?invite_code=db2eb05bc70ff2dd23537baee9fb104e621662464d634d06d7370fde6374b78a&target_code=d33ebc7b7e5a14326ce62f5e2e13549a)


## FRONTEND

```bash
cd frontend
```
## Install dependencies
```bash
npm install
```
## Running Server
```bash
npm run dev
```



