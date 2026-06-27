# K6 Performance & Regression Testing

![k6](https://img.shields.io/badge/K6-PERFORMANCE%20TESTING-7D64FF?style=for-the-badge\&logo=k6\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JAVASCRIPT-ES6-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/NODE.JS-18+-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GITHUB_ACTIONS-CI/CD-2088FF?style=for-the-badge\&logo=github-actions\&logoColor=white)

Framework **Performance Testing** dan **Regression Testing** berbasis **k6** yang digunakan untuk menguji performa dan stabilitas API pada aplikasi **Restful Booker**.

Framework ini terintegrasi dengan **GitHub Actions** sehingga pengujian dapat dijalankan secara otomatis setiap kali terjadi perubahan kode pada repository.

---

# 📌 Tentang Proyek

Project ini dibuat untuk mensimulasikan pengujian performa API menggunakan k6 dengan berbagai skenario pengujian seperti:

* Smoke Testing
* Load Testing
* API Regression Testing
* Performance Validation
* Continuous Integration Testing

Target aplikasi:

**https://restful-booker.herokuapp.com**

---

# 🎯 Tujuan Pengujian

* Memastikan endpoint API dapat diakses.
* Mengukur response time API.
* Mengukur throughput aplikasi.
* Memvalidasi response API.
* Melakukan pengujian CRUD secara end-to-end.
* Mendeteksi penurunan performa aplikasi sejak dini.

---

# 🛠 Teknologi yang Digunakan

| Teknologi          | Fungsi                        |
| ------------------ | ----------------------------- |
| k6                 | Performance Testing Framework |
| JavaScript         | Bahasa Pemrograman            |
| Node.js            | Runtime Environment           |
| GitHub Actions     | CI/CD Pipeline                |
| Restful Booker API | Test Environment              |

---

# 📂 Struktur Project

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
├── reports
│   ├── summary.html
│   ├── result.json
│   └── result.csv
│
├── reporter.js
│
├── README.md
└── .gitignore
```

---

# 🚀 Skenario Pengujian

## Smoke Test

Memastikan API dalam kondisi aktif dan dapat diakses.

### Endpoint

```http
GET /ping
```

### File

```text
tests/smoke/health-check.js
```

---

## Load Test - Get Booking

Mengukur performa endpoint daftar booking.

### Endpoint

```http
GET /booking
```

### File

```text
tests/load/get-booking.js
```

---

## Load Test - Create Booking

Mengukur performa endpoint pembuatan booking.

### Endpoint

```http
POST /booking
```

### File

```text
tests/load/create-booking.js
```

---

## Regression Test - CRUD Booking

Melakukan pengujian end-to-end terhadap seluruh proses booking.

### Flow

1. Generate Token
2. Create Booking
3. Get Booking Detail
4. Update Booking
5. Delete Booking

### File

```text
tests/regression/booking-crud.js
```

---

# ⚙️ Instalasi

## Clone Repository

```bash
git clone https://github.com/USERNAME/k6-performance-testing-restful-booker.git
```

Masuk ke folder project:

```bash
cd k6-performance-testing-restful-booker
```

---

## Install k6

### Windows

```bash
choco install k6
```

### MacOS

```bash
brew install k6
```

### Linux

```bash
sudo apt-get update
sudo apt-get install k6
```

Verifikasi instalasi:

```bash
k6 version
```

---

# ▶️ Menjalankan Pengujian

## Smoke Test

```bash
k6 run tests/smoke/health-check.js
```

---

## Load Test Booking

```bash
k6 run tests/load/get-booking.js
```

---

## Load Test Create Booking

```bash
k6 run tests/load/create-booking.js
```

---

## Regression Test

```bash
k6 run tests/regression/booking-crud.js
```

---

# 📊 Performance Threshold

Project ini menggunakan threshold untuk memastikan performa aplikasi tetap berada pada batas yang dapat diterima.

```javascript
thresholds: {
  http_req_duration: ["p(95)<3000"],
  http_req_failed: ["rate<0.01"]
}
```

### Kriteria

| Metrik        | Target    |
| ------------- | --------- |
| Response Time | < 3 Detik |
| Error Rate    | < 1%      |

---

# 📈 HTML Report

Project mendukung pembuatan laporan HTML menggunakan k6 Reporter.

### Reporter

```javascript
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
```

### Menjalankan Test

```bash
k6 run tests/regression/booking-crud.js
```

### Hasil

```text
reports/
└── summary.html
```

Buka file HTML tersebut menggunakan browser untuk melihat hasil pengujian secara visual.

---

# 🔄 CI/CD Pipeline

Project ini menggunakan GitHub Actions untuk menjalankan pengujian secara otomatis.

### Trigger

* Push ke branch main
* Push ke branch master
* Pull Request

### Workflow

```yaml
name: Performance & Regression Testing CI
```

### Lokasi File

```text
.github/workflows/k6-regression.yml
```

### Tahapan Pipeline

1. Checkout Source Code
2. Menjalankan Smoke Test
3. Menjalankan Load Test
4. Menjalankan Regression Test
5. Menampilkan Hasil Pengujian

---

# 📊 Contoh Hasil Pengujian

```text
checks.......................: 100.00%
http_req_duration............: avg=245ms
http_req_failed..............: 0.00%
iterations...................: 100
vus..........................: 10
```

### Interpretasi

* Success Rate : 100%
* Error Rate : 0%
* Average Response Time : 245 ms

---

# ✅ Fitur Framework

* Smoke Testing
* Load Testing
* Regression Testing
* API Performance Testing
* CRUD End-to-End Validation
* GitHub Actions CI/CD
* Performance Threshold Validation
* HTML Reporting
* Modular Project Structure

---

# 👨‍💻 Author

**Hafidh Syahputra**

Quality Assurance Engineer

### Keahlian

* Manual Testing
* API Testing
* Automation Testing
* Performance Testing