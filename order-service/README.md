# 🍽️ Restaurant Microservice System

Sistem restoran berbasis microservice menggunakan **NestJS**, **RabbitMQ**, **MySQL**, dan **Docker Compose**.

---

## 📦 Arsitektur Microservices

- `order-service`: Menangani pemesanan makanan.
- `kitchen-service`: Memproses pesanan.
- `notification-service`: Mengirim notifikasi email ke pelanggan.
- `RabbitMQ`: Message broker dengan fanout exchange.
- `MySQL`: Menyimpan data menu dan order.

---

## 🚀 Cara Menjalankan

### 1. Pastikan Sudah Terinstall

- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- Node.js v16+ (jika ingin menjalankan service manual)

### 2. Jalankan Semua Layanan

```bash
docker-compose up --build
```

Untuk menjalankan di background:

```bash
docker-compose up -d
```

### 3. Hentikan Semua Layanan

```bash
docker-compose down
```

Untuk menghentikan sekaligus hapus data volume:

```bash
docker-compose down -v
```

---

## 🛠️ .env untuk Notification Service

Buat file `.env` di folder `notification-service`:

```
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_username_here
EMAIL_PASS=your_password_here
EMAIL_FROM=no-reply@restaurant.com
```

---

## 🔌 API Endpoints (Order Service)

| Method | Endpoint                   | Description             |
|--------|----------------------------|-------------------------|
| GET    | `/menu`                   | Menampilkan daftar menu |
| POST   | `/order`                  | Membuat pesanan         |
| GET    | `/order/:id/status`       | Cek status pesanan      |

Contoh `POST /order` payload:

```json
{
  "email": "user@example.com",
  "items": [1, 2]
}
```

---

## 📡 RabbitMQ Queues

- `order.confirmation` → dikonsumsi oleh `notification-service`
- `order.process` → dikonsumsi oleh `kitchen-service`

---

## 💡 Catatan Tambahan

- Pre-populated menu tersedia secara otomatis saat container MySQL dijalankan.
- Pastikan port berikut tidak digunakan oleh aplikasi lain:
  - MySQL: `3306`
  - RabbitMQ: `5672`, `15672`
  - OrderService: `3000`

---

## 🧪 Testing Email

Gunakan [Mailtrap.io](https://mailtrap.io/) untuk mengecek email notifikasi dari `notification-service`, dapat disetting di .env notification-service.

---
