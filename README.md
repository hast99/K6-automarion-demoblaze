# K6 Performance & Regression Testing

![k6](https://img.shields.io/badge/k6-Latest-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

Framework Performance Testing dan Regression Testing berbasis **k6** dan **JavaScript** yang digunakan untuk menguji performa serta validasi endpoint API pada aplikasi **Restful Booker**.

Framework ini mendukung pengujian otomatis melalui **GitHub Actions** sehingga setiap perubahan kode dapat divalidasi secara berkelanjutan (Continuous Integration).

---

## 📋 Daftar Isi

- Tentang Proyek
- Teknologi yang Digunakan
- Struktur Project
- Skenario Pengujian
- Instalasi
- Menjalankan Pengujian
- CI/CD Pipeline
- Hasil Pengujian

---

# 📖 Tentang Proyek

Project ini dibuat untuk mensimulasikan pengujian performa API menggunakan k6 pada aplikasi:

https://restful-booker.herokuapp.com

Tujuan pengujian:

- Memastikan endpoint dapat menangani sejumlah request tertentu.
- Mengukur response time API.
- Memvalidasi keberhasilan request.
- Melakukan pengujian CRUD secara end-to-end.
- Mengidentifikasi potensi penurunan performa (performance degradation).

---

# 🛠 Teknologi yang Digunakan

| Tools | Keterangan |
|---------|------------|
| k6 | Performance Testing Framework |
| JavaScript | Bahasa Pemrograman |
| Node.js | Runtime Environment |
| GitHub Actions | Continuous Integration |
| Restful Booker | API Testing Environment |

---

# 📁 Struktur Project

```text
k6-performance-testing-restful-booker
│
├── .github
│   └── workflows
│       └── k6-regression.yml
│
├── tests
│   ├── smoke
│   │   └── health-check.js
│   │
│   ├── load
│   │   ├── get-booking.js
│   │   └── create-booking.js
│   │
│   └── regression
│       └── booking-crud.js
│
├── README.md
└── .gitignore
```

---

# 🚀 Skenario Pengujian

## Smoke Test
GET /ping

## Load Test - Get Booking
GET /booking

## Load Test - Create Booking
POST /booking

## Regression Test - CRUD Booking

1. Generate Token
2. Create Booking
3. Get Booking Detail
4. Update Booking
5. Delete Booking

---

# ⚙️ Instalasi

```bash
choco install k6
```

Verifikasi:

```bash
k6 version
```

---

# ▶️ Menjalankan Pengujian

```bash
k6 run tests/smoke/health-check.js
```

```bash
k6 run tests/load/get-booking.js
```

```bash
k6 run tests/load/create-booking.js
```

```bash
k6 run tests/regression/booking-crud.js
```

---

# 📊 Threshold Performance

```javascript
thresholds: {
  http_req_duration: ["p(95)<3000"],
  http_req_failed: ["rate<0.01"]
}
```

---

# 🔄 CI/CD Pipeline

Workflow GitHub Actions akan berjalan saat:

- Push ke main/master
- Pull Request ke main/master

---

# 👨‍💻 Author

**Hafidh Syahputra**

QA Engineer

GitHub: https://github.com/hast99
LinkedIn: https://www.linkedin.com/in/hafidh-syahputra
