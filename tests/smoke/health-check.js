import http from "k6/http"; // Modul utama untuk mengirim request HTTP (seperti GET)
import { check } from "k6"; // Fitur untuk memvalidasi respons dari server (Assertion)

// Mengambil fungsi pembuat laporan (report) otomatis setelah pengujian berakhir
export { handleSummary } from "../../reporter.js";

// =========================================================================================
// 1. OPTIONS: Konfigurasi beban pengujian (Pengujian minimalis / Smoke Test skala kecil)
// =========================================================================================
export const options = {
    vus: 1,        // Hanya menggunakan 1 Virtual User (1 pengguna simulasi).
    iterations: 1, // Hanya dijalankan sebanyak 1 kali putaran, setelah itu pengujian langsung berhenti.
};

// =========================================================================================
// 2. DEFAULT FUNCTION: Alur pengujian utama
// =========================================================================================
export default function () {
    
    // HTTP GET: Mengirim request ke endpoint "/ping" untuk memeriksa kesehatan (health) server.
    // Endpoint /ping umumnya didesain sangat ringan oleh developer hanya untuk membalas sinyal "panggilan".
    const res = http.get(
        "https://restful-booker.herokuapp.com/ping"
    );

    // CHECK: Melakukan validasi terhadap hasil respons server yang disimpan di variabel 'res' tadi.
    check(res, {
        // Tanda '||' berarti "ATAU" (OR secara logika programming).
        // Aturan ini memeriksa: Apakah Status Code yang dikembalikan server bernilai 201 ATAU bernilai 200.
        // Jika salah satu dari status tersebut terpenuhi, maka pengecekan dianggap sukses (Lolos).
        "Health Check Success": (r) => r.status === 201 || r.status === 200,
    });
}