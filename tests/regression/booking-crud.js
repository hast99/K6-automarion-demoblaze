import http from "k6/http"; // Modul utama untuk mengirim request ke API (seperti POST, GET, PUT, dll.)
import { check } from "k6"; // Fitur untuk melakukan validasi/assertion (memastikan respons sesuai harapan)

// Fungsi ini mengambil cetakan/template laporan yang ada di file '../../reporter.js'.
export { handleSummary } from "../../reporter.js";

// =========================================================================================
// 1. OPTIONS: Konfigurasi beban pengujian (Berapa banyak user dan berapa lama tes berjalan)
// =========================================================================================
export const options = {
    vus: 10,        // vus = Virtual Users. Artinya kita menyimulasikan 10 pengguna palsu sekaligus.
    duration: "30s", // Durasi pengujian. 10 user di atas akan membombardir API terus-menerus selama 30 detik.
};

// =========================================================================================
// 2. DEFAULT FUNCTION: Alur pengujian utama (Akan dijalankan berulang kali oleh 10 user di atas)
// =========================================================================================
export default function () {

    // PAYLOAD: Data yang akan kita kirimkan ke server (dalam kasus ini, data booking pelanggan baru).
    // JSON.stringify() berfungsi mengubah objek JavaScript menjadi format teks JSON agar dipahami oleh server API.
    const payload = JSON.stringify({
        firstname: "Hafidh",
        lastname: "QA",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-01-01",
            checkout: "2026-01-10",
        },
        additionalneeds: "Breakfast",
    });

    // Di sini kita menambahkan 'headers' untuk memberi tahu server bahwa data yang kita kirim berbentuk JSON.
    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Kita menembak URL tujuan, dengan membawa data (payload) dan pengaturan header (params) di atas.
    // Hasil atau respons dari server kemudian disimpan di dalam variabel bernama 'res'.
    const res = http.post(
        "https://restful-booker.herokuapp.com/booking",
        payload,
        params
    );

    // CHECK: Melakukan validasi terhadap hasil respons server yang disimpan di variabel 'res' tadi.
    check(res, {
        // Aturan ini memeriksa apakah Status Code dari server bernilai 200 (artinya server sukses memproses data)
        "Create Booking Success": (r) => r.status === 200,
    });
}