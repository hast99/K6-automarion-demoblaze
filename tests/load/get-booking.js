import http from "k6/http"; // Modul utama untuk mengirim request HTTP (seperti GET, POST, dll.)
import { check } from "k6"; // Fitur untuk memvalidasi respons dari server (Assertion)

// Fungsi ini otomatis membuat file laporan rapi setelah pengujian selesai.
export { handleSummary } from "../../reporter.js";

// =========================================================================================
// 1. OPTIONS: Konfigurasi beban pengujian & Batas Batas Kelulusan Performa (SLA)
// =========================================================================================
export const options = {
    vus: 20,         // menyimulasikan 20 Virtual Users (pengguna palsu) secara bersamaan.
    duration: "30s", // 20 user di atas akan mengakses link API terus-menerus selama 30 detik.

    // THRESHOLDS: Gerbang penentu kelulusan performa (SLA - Service Level Agreement)
    // Digunakan untuk mendeteksi 'Performance Regression' jika ada perlambatan sistem.
    thresholds: {
        // 'p(95)<1000' artinya: 95% dari total request yang dikirim kecepatannya harus di bawah 1000 ms (1 detik).
        // Jika server merespons lebih lambat dari 1 detik (misal 1200 ms), k6 akan menandai tes ini GAGAL (FAIL).
        http_req_duration: ["p(95)<1000"],
    },
};

// =========================================================================================
// 2. DEFAULT FUNCTION: Alur pengujian utama (Dijalankan berulang kali oleh 20 user di atas)
// =========================================================================================
export default function () {
    
    // HTTP GET: Di sini k6 mengirimkan request GET untuk mengambil/membaca daftar ID booking dari server.
    // Berbeda dengan POST, metode GET tidak membutuhkan kiriman data (payload) atau params khusus.
    // Semua data respons balikan dari server akan disimpan di dalam variabel 'res'.
    const res = http.get(
        "https://restful-booker.herokuapp.com/booking"
    );

    // CHECK: Melakukan validasi fungsional terhadap respons yang ada di variabel 'res' tadi.
    check(res, {
        // Memastikan server mengembalikan HTTP Status Code 200 (artinya request berhasil diproses)
        "Get Booking Success": (r) => r.status === 200,
    });
}