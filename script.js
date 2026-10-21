/* ==========================================================================
   SCRIPT.JS - Logika Interaktif & Dukungan Mode Offline (PWA)
   ========================================================================== */

/* ==========================================================================
   1. FITUR PENCARIAN MENU (REAL-TIME SEARCH)
   ========================================================================== */
// Fungsi ini dipanggil setiap kali pengguna mengetik huruf di kolom pencarian (onkeyup)
function searchMenu() {
    // Ambil nilai teks yang diketik pengguna dan ubah ke huruf kecil semua (lowercase)
    // Tujuannya agar pencarian tidak sensitif terhadap perbedaan huruf besar/kecil
    let input = document.getElementById('searchInput').value.toLowerCase();
    
    // Ambil seluruh elemen kartu menu berdasarkan kelas 'menu-item'
    let items = document.getElementsByClassName('menu-item');

    // Lakukan perulangan (looping) untuk mengecek setiap item menu satu per satu
    for (let i = 0; i < items.length; i++) {
        // Ambil data nama menu dari atribut 'data-name' pada elemen HTML
        let menuName = items[i].getAttribute('data-name');
        
        // Cek apakah nama menu mengandung kata/huruf yang diketik pengguna
        if (menuName.includes(input)) {
            // Jika cocok, tampilkan kembali elemen kartu menu dengan gaya 'flex'
            items[i].style.display = "flex";
        } else {
            // Jika tidak cocok, sembunyikan elemen kartu menu tersebut
            items[i].style.display = "none";
        }
    }
}

/* ==========================================================================
   2. FITUR TOMBOL PESAN & NOTIFIKASI BERHASIL (TOAST NOTIFICATION)
   ========================================================================== */
// Fungsi ini dipanggil saat tombol "Pesan" pada salah satu produk diklik
function pesanMenu(namaMakanan) {
    // Ambil elemen kotak notifikasi berdasarkan ID 'toast'
    let toast = document.getElementById("toast");

    // Ubah teks di dalam kotak notifikasi secara dinamis sesuai nama makanan yang dipilih
    toast.innerText = "Pesanan '" + namaMakanan + "' berhasil dicatat!";

    // Tambahkan kelas 'show' untuk memicu animasi pop-up dari CSS
    toast.className = "show";

    // Gunakan timer (setTimeout) selama 3 detik (3000 milidetik)
    // Setelah 3 detik, hapus kelas 'show' agar kotak notifikasi otomatis tertutup kembali
    setTimeout(function() { 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}

/* ==========================================================================
   3. FITUR KEMAMPUAN OFFLINE (SERVICE WORKER REGISTRATION)
   ========================================================================== */
// Mengecek apakah peramban (browser) pengguna mendukung fitur Service Worker
if ('serviceWorker' in navigator) {
    // Menunggu halaman selesai dimuat sepenuhnya sebelum mendaftarkan service worker
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('Service Worker berhasil didaftarkan! Cakupan:', registration.scope);
            })
            .catch(function(error) {
                console.log('Pendaftaran Service Worker gagal:', error);
            });
    });
}
