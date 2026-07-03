// State Management Aplikasi (Mock Database)
let state = {
    mahasiswa: [
        {
            id: "m1",
            nama: "Budi Santoso",
            email: "budi@student.com",
            password: "budi123",
            nohp: "081234567890",
            universitas: "Universitas Gadjah Mada",
            semester: "5",
            foto: "BS"
        }
    ],
    pemilikUsaha: [
        {
            id: "p1",
            namaUsaha: "Warmindo Berkah",
            namaPemilik: "Joko Widodo",
            email: "joko@warung.com",
            password: "joko123",
            nohp: "085678901234",
            alamat: "Jl. Kaliurang KM 5, Sleman",
            logo: "WB"
        }
    ],
    lowongan: [
        {
            id: "job1",
            ownerId: "p1",
            namaUsaha: "Warmindo Berkah",
            posisi: "Barista & Kasir",
            kategori: "Cafe",
            gaji: "Rp 1.500.000 / bln",
            lokasi: "Sleman, Yogyakarta",
            jamKerja: "4 Jam / hari (Part-time)",
            kebutuhan: 2,
            deskripsi: "Membantu membuat minuman kopi/teh, meracik mie instan, melayani pesanan pembeli dengan ramah, dan menjaga kebersihan meja kasir.",
            persyaratan: "Mahasiswa aktif regional Jogja, ramah, jujur, mampu bekerja dalam tim, bersedia bekerja di shift sore (17.00 - 21.00)."
        },
        {
            id: "job2",
            ownerId: "p1",
            namaUsaha: "Warmindo Berkah",
            posisi: "Admin Sosmed & Kasir",
            kategori: "Admin",
            gaji: "Rp 1.800.000 / bln",
            lokasi: "Sleman, Yogyakarta",
            jamKerja: "5 Jam / hari",
            kebutuhan: 1,
            deskripsi: "Mengelola postingan harian Instagram dan TikTok warung, membalas DM/Komentar pelanggan, serta membantu merekap laporan penjualan harian.",
            persyaratan: "Mahasiswa ilmu komunikasi/bebas, kreatif, biasa membuat konten video pendek, memiliki HP yang memadai."
        },
        {
            id: "job3",
            ownerId: "toko-pintar",
            namaUsaha: "Toko Buku Pintar",
            posisi: "Penjaga Toko & Kasir",
            kategori: "Toko",
            gaji: "Rp 1.200.000 / bln",
            lokasi: "Solo, Jawa Tengah",
            jamKerja: "5 Jam / hari",
            kebutuhan: 1,
            deskripsi: "Membantu melayani pembeli buku, menata stok buku baru di rak sesuai kategori, serta mengoperasikan mesin kasir komputer.",
            persyaratan: "Mahasiswa Solo aktif, teliti, rapi, menyukai buku, ramah."
        },
        {
            id: "job4",
            ownerId: "circle-org",
            namaUsaha: "Circle Organizer",
            posisi: "Event Crew Festival",
            kategori: "Event",
            gaji: "Rp 350.000 / event",
            lokasi: "Jakarta Selatan",
            jamKerja: "8 Jam (Insidentil)",
            kebutuhan: 15,
            deskripsi: "Menjadi crew lapangan untuk festival kuliner akhir pekan. Tugas meliputi ticketing, pengawasan tenant, dan informasi pengunjung.",
            persyaratan: "Berbadan sehat, komunikatif, aktif, bersedia bekerja penuh di hari Sabtu-Minggu."
        }
    ],
    lamaran: [
        {
            id: "lamaran1",
            jobId: "job1",
            mahasiswaId: "m1",
            namaPelamar: "Budi Santoso",
            nohp: "081234567890",
            semester: "5",
            universitas: "Universitas Gadjah Mada",
            cvName: "CV_Budi_Santoso.pdf",
            catatan: "Saya memiliki pengalaman magang di cafe lokal selama 3 bulan. Sangat menyukai dunia kopi.",
            status: "Diproses", // Diproses, Diterima, Ditolak
            tanggal: "02 Jul 2026"
        }
    ],
    session: {
        activeActor: "mahasiswa", // mahasiswa, pemilik-usaha
        fidelity: "hifi", // hifi, lofi
        mahasiswaLog: {
            isLoggedIn: true,
            user: {
                id: "m1",
                nama: "Budi Santoso",
                email: "budi@student.com",
                nohp: "081234567890",
                universitas: "Universitas Gadjah Mada",
                semester: "5",
                foto: "BS"
            }
        },
        ownerLog: {
            isLoggedIn: true,
            user: {
                id: "p1",
                namaUsaha: "Warmindo Berkah",
                namaPemilik: "Joko Widodo",
                email: "joko@warung.com",
                nohp: "085678901234",
                alamat: "Jl. Kaliurang KM 5, Sleman",
                logo: "WB"
            }
        },
        navigation: {
            mahasiswa: "home", // splash, login, register, home, detail, form-lamar, status-lamaran, profil
            pemilikUsaha: "dashboard" // login, register, dashboard, tambah-lowongan, daftar-lowongan, daftar-pelamar, profil
        },
        selectedJobId: null, // detail view tracker
        selectedJobForApplicants: null, // owner view applicants tracker
        uploadedCV: null // temporary cv upload tracker
    }
};

// Salinan data default untuk tombol reset
const DEFAULT_STATE = JSON.parse(JSON.stringify(state));

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    // Inisialisasi simulator screen pertama kali
    renderScreen();
    // Jalankan timer splash jika posisi awal mahasiswa di splash
    checkSplashTimer();
});

// Switch Aktor Simulator (Mahasiswa / Pemilik Usaha)
function switchActor(actor) {
    state.session.activeActor = actor;
    
    document.getElementById("actor-mahasiswa-btn").className = `btn btn-xs d-flex align-items-center gap-1 py-1 px-2 ${actor === 'mahasiswa' ? 'btn-primary active' : 'btn-outline-light'}`;
    document.getElementById("actor-pemilik-btn").className = `btn btn-xs d-flex align-items-center gap-1 py-1 px-2 ${actor === 'pemilik-usaha' ? 'btn-primary active' : 'btn-outline-light'}`;
    
    logAction(`Peran simulator diubah ke: ${actor === "mahasiswa" ? "Mahasiswa" : "Pemilik Usaha"}`, actor === "mahasiswa" ? "mahasiswa" : "pemilik");
    
    renderScreen();
    checkSplashTimer();
}

// Switch Fidelity (High Fidelity / Low Fidelity Wireframe)
function switchFidelity(fidelity) {
    state.session.fidelity = fidelity;
    
    document.getElementById("fidelity-hifi-btn").className = `btn btn-xs d-flex align-items-center gap-1 py-1 px-2 ${fidelity === 'hifi' ? 'btn-primary active' : 'btn-outline-light'}`;
    document.getElementById("fidelity-lofi-btn").className = `btn btn-xs d-flex align-items-center gap-1 py-1 px-2 ${fidelity === 'lofi' ? 'btn-primary active' : 'btn-outline-light'}`;
    
    const screen = document.getElementById("device-screen");
    if (fidelity === "hifi") {
        screen.classList.remove("lofi");
        screen.classList.add("hifi");
    } else {
        screen.classList.remove("hifi");
        screen.classList.add("lofi");
    }
    
    logAction(`Visualisasi simulator diubah ke: ${fidelity === "hifi" ? "High Fidelity (Desain)" : "Low Fidelity (Wireframe)"}`, "system");
    renderScreen();
}

// Reset Aplikasi ke Kondisi Awal
function resetApp() {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    
    document.getElementById("actor-mahasiswa-btn").className = "btn btn-xs btn-primary d-flex align-items-center gap-1 py-1 px-2 active";
    document.getElementById("actor-pemilik-btn").className = "btn btn-xs btn-outline-light d-flex align-items-center gap-1 py-1 px-2";
    document.getElementById("fidelity-hifi-btn").className = "btn btn-xs btn-primary d-flex align-items-center gap-1 py-1 px-2 active";
    document.getElementById("fidelity-lofi-btn").className = "btn btn-xs btn-outline-light d-flex align-items-center gap-1 py-1 px-2";
    
    const screen = document.getElementById("device-screen");
    screen.classList.remove("lofi");
    screen.classList.add("hifi");
    
    const logBox = document.getElementById("log-content");
    if (logBox) {
        logBox.innerHTML = `<div class="log-item system">[System] Simulator di-reset kembali ke kondisi awal.</div>`;
    }
    
    renderScreen();
    checkSplashTimer();
}

// Logger helper
function logAction(message, type) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    const logBox = document.getElementById("log-content");
    if (!logBox) return;
    const item = document.createElement("div");
    item.className = `log-item ${type}`;
    
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    
    item.innerHTML = `[${timeStr}] ${message}`;
    logBox.appendChild(item);
    logBox.scrollTop = logBox.scrollHeight;
}

// Check splash screen redirect timer
let splashTimeout;
function checkSplashTimer() {
    clearTimeout(splashTimeout);
    if (state.session.activeActor === "mahasiswa" && state.session.navigation.mahasiswa === "home") {
        // do nothing if already home
    } else if (state.session.activeActor === "mahasiswa" && state.session.navigation.mahasiswa === "splash") {
        splashTimeout = setTimeout(() => {
            if (state.session.activeActor === "mahasiswa" && state.session.navigation.mahasiswa === "splash") {
                state.session.navigation.mahasiswa = "login";
                logAction("Splash Screen selesai (timeout 2.5s) -> Beralih ke halaman Login", "mahasiswa");
                renderScreen();
            }
        }, 2500);
    }
}

// Route helper
function navigateTo(dest) {
    if (state.session.activeActor === "mahasiswa") {
        state.session.navigation.mahasiswa = dest;
        logAction(`Mahasiswa berpindah ke halaman: ${dest.toUpperCase()}`, "mahasiswa");
    } else {
        state.session.navigation.pemilikUsaha = dest;
        logAction(`Pemilik Usaha berpindah ke halaman: ${dest.toUpperCase()}`, "pemilik");
    }
    renderScreen();
}

// Filter and search state
let searchKeyword = "";
let selectedCategory = "Semua";

// Render Router screen
function renderScreen() {
    const screen = document.getElementById("device-screen");
    const actor = state.session.activeActor;
    const fidelity = state.session.fidelity;
    
    let html = "";
    
    if (actor === "mahasiswa") {
        const page = state.session.navigation.mahasiswa;
        
        switch (page) {
            case "splash":
                html = getSplashHTML(fidelity);
                break;
            case "login":
                html = getLoginMahasiswaHTML(fidelity);
                break;
            case "register":
                html = getRegisterMahasiswaHTML(fidelity);
                break;
            case "home":
                html = getHomeMahasiswaHTML(fidelity);
                break;
            case "detail":
                html = getDetailLowonganHTML(fidelity);
                break;
            case "form-lamar":
                html = getFormLamarHTML(fidelity);
                break;
            case "status-lamaran":
                html = getStatusLamaranHTML(fidelity);
                break;
            case "profil":
                html = getProfilMahasiswaHTML(fidelity);
                break;
        }
    } else {
        // Pemilik Usaha
        const page = state.session.navigation.pemilikUsaha;
        
        switch (page) {
            case "login":
                html = getLoginOwnerHTML(fidelity);
                break;
            case "register":
                html = getRegisterOwnerHTML(fidelity);
                break;
            case "dashboard":
                html = getDashboardOwnerHTML(fidelity);
                break;
            case "tambah-lowongan":
                html = getTambahLowonganHTML(fidelity);
                break;
            case "daftar-lowongan":
                html = getDaftarLowonganHTML(fidelity);
                break;
            case "daftar-pelamar":
                html = getDaftarPelamarHTML(fidelity);
                break;
            case "profil":
                html = getProfilOwnerHTML(fidelity);
                break;
        }
    }
    
    screen.innerHTML = html;
    bindEventListeners();
}


/* ==========================================================================
   DESKTOP & MOBILE RESPONSIVE HEADER HELPER
   ========================================================================== */

function getResponsiveHeaderHTML(actor, activePage) {
    const isMahasiswa = actor === 'mahasiswa';
    const title = isMahasiswa ? "Pencari Part Time" : "Portal Mitra Bisnis";
    const logoSymbol = isMahasiswa ? "school" : "storefront";
    const brandColorClass = isMahasiswa ? "text-primary" : "text-success";
    
    let navLinksHTML = "";
    
    if (isMahasiswa) {
        navLinksHTML = `
            <a class="nav-link px-3 ${activePage === 'home' ? 'text-primary fw-bold border-bottom border-primary border-2' : 'text-muted'}" href="#" onclick="navigateTo('home')">Home</a>
            <a class="nav-link px-3 ${activePage === 'status-lamaran' ? 'text-primary fw-bold border-bottom border-primary border-2' : 'text-muted'}" href="#" onclick="navigateTo('status-lamaran')">Lamaran</a>
            <a class="nav-link px-3 ${activePage === 'profil' ? 'text-primary fw-bold border-bottom border-primary border-2' : 'text-muted'}" href="#" onclick="navigateTo('profil')">Profil Saya</a>
        `;
    } else {
        navLinksHTML = `
            <a class="nav-link px-3 ${activePage === 'dashboard' ? 'text-success fw-bold border-bottom border-success border-2' : 'text-muted'}" href="#" onclick="navigateTo('dashboard')">Dashboard</a>
            <a class="nav-link px-3 ${activePage === 'daftar-lowongan' ? 'text-success fw-bold border-bottom border-success border-2' : 'text-muted'}" href="#" onclick="navigateTo('daftar-lowongan')">Lowongan</a>
            <a class="nav-link px-3 ${activePage === 'profil' ? 'text-success fw-bold border-bottom border-success border-2' : 'text-muted'}" href="#" onclick="navigateTo('profil')">Profil Usaha</a>
        `;
    }

    return `
        <header class="app-header-bar shadow-sm">
            <div class="d-flex align-items-center gap-2">
                <span class="material-icons ${brandColorClass}" style="font-size:28px;">${logoSymbol}</span>
                <div>
                    <h1 class="h6 fw-bold mb-0 text-slate-800">${title}</h1>
                    <span class="text-muted small d-none d-md-inline" style="font-size:10px;">Fakultas Kerja Sampingan & Magang</span>
                </div>
            </div>
            
            <!-- Navigation links on Desktop -->
            <nav class="d-none d-md-flex align-items-center gap-1 nav">
                ${navLinksHTML}
            </nav>
            
            <div class="d-flex align-items-center gap-2">
                <span class="small text-muted d-none d-lg-inline">Akun Aktif:</span>
                <span class="badge ${isMahasiswa ? 'bg-primary' : 'bg-success'} text-white rounded-pill px-3 py-2 fw-semibold">
                    ${isMahasiswa ? state.session.mahasiswaLog.user.nama.split(' ')[0] : state.session.ownerLog.user.namaUsaha}
                </span>
            </div>
        </header>
    `;
}

function getResponsiveBottomNavHTML(actor, activePage) {
    const isMahasiswa = actor === 'mahasiswa';
    
    if (isMahasiswa) {
        return `
            <nav class="mobile-app-nav d-flex d-md-none shadow">
                <button class="mobile-nav-btn ${activePage === 'home' ? 'active' : ''}" onclick="navigateTo('home')">
                    <span class="material-icons">home</span>
                    <span>Home</span>
                </button>
                <button class="mobile-nav-btn ${activePage === 'status-lamaran' ? 'active' : ''}" onclick="navigateTo('status-lamaran')">
                    <span class="material-icons">assignment_turned_in</span>
                    <span>Lamaran</span>
                </button>
                <button class="mobile-nav-btn ${activePage === 'profil' ? 'active' : ''}" onclick="navigateTo('profil')">
                    <span class="material-icons">person</span>
                    <span>Profil</span>
                </button>
            </nav>
        `;
    } else {
        return `
            <nav class="mobile-app-nav d-flex d-md-none shadow">
                <button class="mobile-nav-btn ${activePage === 'dashboard' ? 'active' : ''}" onclick="navigateTo('dashboard')" style="color: ${activePage === 'dashboard' ? 'var(--success)' : 'var(--text-muted)'}">
                    <span class="material-icons">dashboard</span>
                    <span>Dashboard</span>
                </button>
                <button class="mobile-nav-btn ${activePage === 'daftar-lowongan' ? 'active' : ''}" onclick="navigateTo('daftar-lowongan')" style="color: ${activePage === 'daftar-lowongan' ? 'var(--success)' : 'var(--text-muted)'}">
                    <span class="material-icons">list_alt</span>
                    <span>Lowongan</span>
                </button>
                <button class="mobile-nav-btn ${activePage === 'profil' ? 'active' : ''}" onclick="navigateTo('profil')" style="color: ${activePage === 'profil' ? 'var(--success)' : 'var(--text-muted)'}">
                    <span class="material-icons">person</span>
                    <span>Profil</span>
                </button>
            </nav>
        `;
    }
}


/* ==========================================================================
   TEMPLATES HALAMAN: MAHASISWA (RESPONSIVE BOOTSTRAP 5)
   ========================================================================== */

function getSplashHTML(fidelity) {
    return `
        <div class="app-splash-layout" onclick="navigateTo('login')">
            <div class="app-splash-logo mx-auto">
                <img src="app_logo.png" alt="Logo">
            </div>
            <h2 class="display-6 fw-bold mb-1">Pencari Part Time</h2>
            <p class="lead small opacity-75">Solusi Kerja Sampingan Mahasiswa Terpercaya</p>
            
            <div class="mt-5 spinner-border spinner-border-sm text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="small opacity-50 mt-2" style="font-size: 10px;">Ketuk layar untuk langsung melewati</div>
        </div>
    `;
}

function getLoginMahasiswaHTML(fidelity) {
    return `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
                    <div class="form-card p-4 p-sm-5 border-0 shadow">
                        <div class="text-center mb-4">
                            <div class="d-inline-flex p-3 bg-primary-light rounded-circle text-primary mb-3">
                                <span class="material-icons" style="font-size:36px;">school</span>
                            </div>
                            <h3 class="fw-bold mb-1">Masuk Mahasiswa</h3>
                            <p class="text-muted small">Cari kerja part-time pertamamu di sini</p>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label small fw-bold">Email Mahasiswa</label>
                            <input type="email" id="student-email" class="form-control py-2" placeholder="budi@student.com" value="${state.session.mahasiswaLog.isLoggedIn ? 'budi@student.com' : ''}">
                        </div>
                        <div class="mb-4">
                            <label class="form-label small fw-bold">Password</label>
                            <input type="password" id="student-password" class="form-control py-2" placeholder="••••••••" value="${state.session.mahasiswaLog.isLoggedIn ? 'budi123' : ''}">
                        </div>
                        
                        <button class="btn btn-primary-custom w-100 py-3 mb-3" onclick="handleStudentLogin()">Masuk Akun</button>
                        <button class="btn btn-link w-100 text-decoration-none text-primary small fw-semibold" onclick="navigateTo('register')">Belum punya akun? Daftar Sekarang</button>
                        
                        <div class="mt-4 p-3 bg-light rounded text-center border border-dashed">
                            <p class="small text-primary fw-bold mb-2" style="font-size:11px;">Pintasan Cepat Akun Demo:</p>
                            <button onclick="shortcutLoginStudent()" class="btn btn-sm btn-primary px-3 py-2 fw-semibold">Login Instan Budi (UGM)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getRegisterMahasiswaHTML(fidelity) {
    return `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                    <div class="form-card p-4 p-sm-5 border-0 shadow">
                        <div class="text-center mb-4">
                            <h3 class="fw-bold mb-1">Pendaftaran Mahasiswa</h3>
                            <p class="text-muted small">Isi biodata akademis Anda untuk melamar</p>
                        </div>
                        
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label class="form-label small fw-bold">Nama Lengkap</label>
                                <input type="text" id="reg-stud-nama" class="form-control" placeholder="Budi Santoso">
                            </div>
                            <div class="col-12 col-sm-6 mb-3">
                                <label class="form-label small fw-bold">Email Mahasiswa</label>
                                <input type="email" id="reg-stud-email" class="form-control" placeholder="budi@student.com">
                            </div>
                            <div class="col-12 col-sm-6 mb-3">
                                <label class="form-label small fw-bold">Nomor HP</label>
                                <input type="tel" id="reg-stud-nohp" class="form-control" placeholder="081234567890">
                            </div>
                            <div class="col-12 col-sm-8 mb-3">
                                <label class="form-label small fw-bold">Asal Universitas</label>
                                <input type="text" id="reg-stud-uni" class="form-control" placeholder="Universitas Gadjah Mada">
                            </div>
                            <div class="col-12 col-sm-4 mb-3">
                                <label class="form-label small fw-bold">Semester</label>
                                <input type="number" id="reg-stud-sem" class="form-control" placeholder="5" min="1">
                            </div>
                            <div class="col-12 col-sm-6 mb-3">
                                <label class="form-label small fw-bold">Password</label>
                                <input type="password" id="reg-stud-pass" class="form-control" placeholder="Buat password">
                            </div>
                            <div class="col-12 col-sm-6 mb-4">
                                <label class="form-label small fw-bold">Ulangi Password</label>
                                <input type="password" id="reg-stud-pass2" class="form-control" placeholder="Ulangi password">
                            </div>
                        </div>
                        
                        <button class="btn btn-primary-custom w-100 py-3 mb-3" onclick="handleStudentRegister()">Daftar Akun Baru</button>
                        <button class="btn btn-link w-100 text-decoration-none text-primary small fw-semibold" onclick="navigateTo('login')">Sudah punya akun? Masuk</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getHomeMahasiswaHTML(fidelity) {
    const listCategories = ["Semua", "Cafe", "Toko", "Event", "Magang", "Admin", "Freelancer"];
    
    // Filter jobs
    let filteredJobs = state.lowongan;
    if (selectedCategory !== "Semua") {
        filteredJobs = filteredJobs.filter(j => j.kategori.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchKeyword.trim() !== "") {
        const query = searchKeyword.toLowerCase();
        filteredJobs = filteredJobs.filter(j => 
            j.posisi.toLowerCase().includes(query) || 
            j.namaUsaha.toLowerCase().includes(query) || 
            j.lokasi.toLowerCase().includes(query)
        );
    }
    
    let jobsListHTML = "";
    if (filteredJobs.length === 0) {
        jobsListHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <span class="material-icons mb-2 opacity-50" style="font-size:48px;">search_off</span>
                <p class="mb-0">Tidak ditemukan lowongan pekerjaan yang cocok.</p>
            </div>
        `;
    } else {
        filteredJobs.forEach(job => {
            let categoryIcon = "work_outline";
            if (job.kategori.toLowerCase() === "cafe") categoryIcon = "local_cafe";
            else if (job.kategori.toLowerCase() === "toko") categoryIcon = "store";
            else if (job.kategori.toLowerCase() === "event") categoryIcon = "event";
            else if (job.kategori.toLowerCase() === "magang") categoryIcon = "school";
            else if (job.kategori.toLowerCase() === "admin") categoryIcon = "description";
            else if (job.kategori.toLowerCase() === "freelancer") categoryIcon = "computer";
            
            jobsListHTML += `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="job-card h-100 border-0 shadow-sm" onclick="selectJob('${job.id}')">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h4 class="fs-6 fw-bold text-slate-800 mb-1 job-title">${job.posisi}</h4>
                                <span class="text-muted small job-company">${job.namaUsaha}</span>
                            </div>
                            <div class="p-2 bg-primary-light rounded-circle text-primary">
                                <span class="material-icons d-block">${categoryIcon}</span>
                            </div>
                        </div>
                        <div class="row g-2 border-top pt-3 mt-3">
                            <div class="col-6 d-flex align-items-center gap-1 small text-muted">
                                <span class="material-icons" style="font-size:14px;">payments</span>
                                <span>${job.gaji.split('/')[0]}</span>
                            </div>
                            <div class="col-6 d-flex align-items-center gap-1 small text-muted">
                                <span class="material-icons" style="font-size:14px;">schedule</span>
                                <span>${job.jamKerja.split(' ')[0]} Jam/hari</span>
                            </div>
                            <div class="col-12 d-flex align-items-center gap-1 small text-muted mt-2">
                                <span class="material-icons" style="font-size:14px;">place</span>
                                <span class="text-truncate">${job.lokasi}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    let chipsHTML = "";
    listCategories.forEach(cat => {
        let chipIcon = "apps";
        if (cat === "Cafe") chipIcon = "local_cafe";
        else if (cat === "Toko") chipIcon = "store";
        else if (cat === "Event") chipIcon = "event";
        else if (cat === "Magang") chipIcon = "school";
        else if (cat === "Admin") chipIcon = "description";
        else if (cat === "Freelancer") chipIcon = "computer";
        
        const activeClass = selectedCategory === cat ? "active" : "";
        chipsHTML += `
            <div class="cat-chip ${activeClass}" onclick="selectCategory('${cat}')">
                <span class="material-icons">${chipIcon}</span>
                <span>${cat}</span>
            </div>
        `;
    });

    return `
        <div class="d-flex flex-column min-vh-100">
            ${getResponsiveHeaderHTML('mahasiswa', 'home')}
            
            <main class="container py-4 flex-grow-1">
                <!-- Search bar & Hero Header -->
                <div class="row justify-content-center mb-4">
                    <div class="col-12 col-md-10 col-lg-8">
                        <div class="bg-primary text-white p-4 rounded-4 shadow-sm mb-4">
                            <h2 class="h4 fw-bold mb-1">Cari Kerja Part-Time Mudah</h2>
                            <p class="small opacity-75 mb-3">Temukan peluang kerja sampingan terbaik di dekat kampusmu</p>
                            
                            <div class="input-group bg-white p-1 rounded-3">
                                <span class="input-group-text bg-transparent border-0 text-muted">
                                    <span class="material-icons">search</span>
                                </span>
                                <input type="text" id="job-search-input" class="form-control border-0 shadow-none ps-0" placeholder="Ketik posisi, lokasi, atau usaha..." value="${searchKeyword}">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Category Section -->
                <div class="mb-4">
                    <h3 class="fs-6 fw-bold text-slate-800 mb-3">Kategori Part Time</h3>
                    <div class="category-chips-wrapper">
                        ${chipsHTML}
                    </div>
                </div>
                
                <!-- Job List Grid -->
                <div class="mb-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="fs-6 fw-bold text-slate-800 mb-0">Lowongan Pekerjaan Terbaru</h3>
                        <span class="badge bg-primary-light text-primary rounded-pill px-3 py-1 font-monospace">${filteredJobs.length} Lowongan</span>
                    </div>
                    
                    <div class="row g-3">
                        ${jobsListHTML}
                    </div>
                </div>
            </main>
            
            ${getResponsiveBottomNavHTML('mahasiswa', 'home')}
        </div>
    `;
}

function getDetailLowonganHTML(fidelity) {
    const job = state.lowongan.find(j => j.id === state.session.selectedJobId);
    if (!job) return `<div class="container py-5"><div class="alert alert-danger">Lowongan tidak ditemukan.</div><button class="btn btn-primary" onclick="navigateTo('home')">Kembali</button></div>`;
    
    let categoryIcon = "work_outline";
    if (job.kategori.toLowerCase() === "cafe") categoryIcon = "local_cafe";
    else if (job.kategori.toLowerCase() === "toko") categoryIcon = "store";
    else if (job.kategori.toLowerCase() === "event") categoryIcon = "event";
    else if (job.kategori.toLowerCase() === "magang") categoryIcon = "school";
    else if (job.kategori.toLowerCase() === "admin") categoryIcon = "description";
    else if (job.kategori.toLowerCase() === "freelancer") categoryIcon = "computer";
    
    // Check if student applied
    const hasApplied = state.lamaran.some(l => l.jobId === job.id && l.mahasiswaId === state.session.mahasiswaLog.user.id);
    const applyButtonHTML = hasApplied
        ? `<button class="btn btn-secondary w-100 py-3 d-flex align-items-center justify-content-center gap-2" disabled style="cursor:not-allowed;">
            <span class="material-icons">check_circle</span> Sudah Dilamar
           </button>`
        : `<button class="btn btn-primary-custom w-100 py-3 d-flex align-items-center justify-content-center gap-2" onclick="navigateTo('form-lamar')">
            <span class="material-icons">send</span> Lamar Sekarang
           </button>`;

    return `
        <div class="d-flex flex-column min-vh-100">
            ${getResponsiveHeaderHTML('mahasiswa', 'home')}
            
            <main class="container py-4 flex-grow-1">
                <!-- Back Button -->
                <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 mb-4" onclick="navigateTo('home')">
                    <span class="material-icons" style="font-size:16px;">arrow_back</span> Kembali ke Beranda
                </button>
                
                <div class="row g-4">
                    <!-- Left Side: Brand & Quick Info -->
                    <div class="col-12 col-lg-4">
                        <div class="card border-0 shadow-sm p-4 text-center rounded-4 mb-4">
                            <div class="d-inline-flex p-3 bg-primary-light text-primary rounded-4 mx-auto mb-3">
                                <span class="material-icons" style="font-size:36px;">${categoryIcon}</span>
                            </div>
                            <h2 class="h5 fw-bold text-slate-800 mb-1">${job.posisi}</h2>
                            <p class="text-muted small mb-4">${job.namaUsaha}</p>
                            
                            <hr class="my-4">
                            
                            <div class="row g-3 text-start">
                                <div class="col-6">
                                    <small class="text-muted d-block" style="font-size:10px;">Gaji</small>
                                    <strong class="text-primary small">${job.gaji}</strong>
                                </div>
                                <div class="col-6">
                                    <small class="text-muted d-block" style="font-size:10px;">Jam Kerja</small>
                                    <strong class="text-slate-800 small">${job.jamKerja}</strong>
                                </div>
                                <div class="col-6 mt-3">
                                    <small class="text-muted d-block" style="font-size:10px;">Lokasi</small>
                                    <strong class="text-slate-800 small">${job.lokasi.split(',')[0]}</strong>
                                </div>
                                <div class="col-6 mt-3">
                                    <small class="text-muted d-block" style="font-size:10px;">Kuota Kebutuhan</small>
                                    <strong class="text-slate-800 small">${job.kebutuhan} Orang</strong>
                                </div>
                            </div>
                            
                            <div class="mt-4">
                                ${applyButtonHTML}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Side: Details Description -->
                    <div class="col-12 col-lg-8">
                        <div class="card border-0 shadow-sm p-4 p-md-5 rounded-4 mb-4">
                            <h3 class="fs-5 fw-bold text-slate-800 border-start border-primary border-3 ps-3 mb-4">Deskripsi Pekerjaan</h3>
                            <p class="text-slate-700 small lh-lg mb-5">${job.deskripsi}</p>
                            
                            <h3 class="fs-5 fw-bold text-slate-800 border-start border-primary border-3 ps-3 mb-4">Persyaratan Kerja</h3>
                            <p class="text-slate-700 small lh-lg mb-0">${job.persyaratan}</p>
                        </div>
                    </div>
                </div>
            </main>
            
            ${getResponsiveBottomNavHTML('mahasiswa', 'home')}
        </div>
    `;
}

function getFormLamarHTML(fidelity) {
    const job = state.lowongan.find(j => j.id === state.session.selectedJobId);
    const user = state.session.mahasiswaLog.user;
    const cvName = state.session.uploadedCV;
    
    const cvAreaHTML = cvName 
        ? `<div class="p-3 bg-success-light border border-success border-opacity-25 rounded-3 d-flex align-items-center justify-content-between mb-3 text-success small">
            <div class="d-flex align-items-center gap-2">
                <span class="material-icons">picture_as_pdf</span>
                <span class="fw-bold">${cvName}</span>
            </div>
            <span class="material-icons" style="cursor:pointer;" onclick="removeCV()">close</span>
           </div>`
        : `<div class="custom-upload-box mb-3" onclick="simulateCVUpload()">
            <span class="material-icons">cloud_upload</span>
            <div class="fw-bold text-primary small">Klik di sini untuk mengunggah CV (PDF)</div>
            <div class="text-muted" style="font-size:9px;">Simulasi pengunggahan berkas digital</div>
           </div>`;

    return `
        <div class="d-flex flex-column min-vh-100">
            ${getResponsiveHeaderHTML('mahasiswa', 'home')}
            
            <main class="container py-4 flex-grow-1">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8 col-xl-6">
                        <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 mb-4" onclick="navigateTo('detail')">
                            <span class="material-icons" style="font-size:16px;">arrow_back</span> Batal
                        </button>
                        
                        <div class="form-card border-0 shadow">
                            <h3 class="fs-5 fw-bold text-slate-800 mb-1 border-bottom pb-3">Formulir Lamaran</h3>
                            <p class="small text-muted mb-4">Melamar sebagai <strong>${job.posisi}</strong> di <strong>${job.namaUsaha}</strong></p>
                            
                            <div class="row">
                                <div class="col-12 mb-3">
                                    <label class="form-label small fw-bold">Nama Lengkap</label>
                                    <input type="text" id="apply-nama" class="form-control" value="${user.nama}">
                                </div>
                                <div class="col-12 col-sm-6 mb-3">
                                    <label class="form-label small fw-bold">Nomor WhatsApp</label>
                                    <input type="tel" id="apply-nohp" class="form-control" value="${user.nohp}">
                                </div>
                                <div class="col-12 col-sm-6 mb-3">
                                    <label class="form-label small fw-bold">Asal Kampus</label>
                                    <input type="text" id="apply-uni" class="form-control" value="${user.universitas}">
                                </div>
                                <div class="col-12 col-sm-4 mb-3">
                                    <label class="form-label small fw-bold">Semester</label>
                                    <input type="number" id="apply-semester" class="form-control" value="${user.semester}">
                                </div>
                                <div class="col-12 mb-3 mt-2">
                                    <label class="form-label small fw-bold">Unggah Berkas CV</label>
                                    ${cvAreaHTML}
                                </div>
                                <div class="col-12 mb-4">
                                    <label class="form-label small fw-bold">Catatan Pendukung (Opsional)</label>
                                    <textarea id="apply-catatan" class="form-control" style="height:80px; resize:none;" placeholder="Tuliskan pengalaman relevan Anda..."></textarea>
                                </div>
                            </div>
                            
                            <button class="btn btn-primary-custom w-100 py-3" onclick="submitApplication()">Kirim Lamaran Sekarang</button>
                        </div>
                    </div>
                </div>
            </main>
            
            ${getResponsiveBottomNavHTML('mahasiswa', 'home')}
        </div>
    `;
}

function getStatusLamaranHTML(fidelity) {
    const myId = state.session.mahasiswaLog.user.id;
    const myAppls = state.lamaran.filter(l => l.mahasiswaId === myId);
    
    let listHTML = "";
    if (myAppls.length === 0) {
        listHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <span class="material-icons mb-2 opacity-50" style="font-size:48px;">assignment_late</span>
                <p>Belum ada lamaran yang Anda kirimkan.</p>
                <button class="btn btn-primary px-4 py-2 mt-2 fw-semibold" onclick="navigateTo('home')">Cari Lowongan</button>
            </div>
        `;
    } else {
        [...myAppls].reverse().forEach(app => {
            const job = state.lowongan.find(j => j.id === app.jobId);
            const statusClass = app.status.toLowerCase(); // diproses, diterima, ditolak
            
            let actionTextHTML = "";
            if (app.status === 'Diterima') {
                const owner = job ? state.pemilikUsaha.find(p => p.id === job.ownerId) : null;
                actionTextHTML = `
                    <div class="mt-3 p-3 bg-success-light border border-success border-opacity-25 rounded-3 text-success small">
                        <div class="fw-bold mb-1">🎉 Selamat! Lamaran Anda disetujui.</div>
                        Hubungi pemilik usaha via WhatsApp untuk koordinasi kerja: <strong class="text-decoration-underline">${owner ? owner.nohp : '085xxxx'}</strong> (${owner ? owner.namaPemilik : 'Owner'})
                    </div>
                `;
            } else if (app.status === 'Ditolak') {
                actionTextHTML = `
                    <div class="mt-3 p-3 bg-danger-light border border-danger border-opacity-25 rounded-3 text-danger small">
                        Terima kasih sudah melamar. Sayangnya lowongan ini sudah terisi penuh atau profil Anda belum cocok. Semangat berjuang lagi!
                    </div>
                `;
            }

            listHTML += `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="application-card border-0 shadow-sm h-100">
                        <div class="d-flex justify-content-between align-items-start mb-3 border-bottom pb-2">
                            <div>
                                <h4 class="fs-6 fw-bold text-slate-800 mb-1">${job ? job.posisi : 'Pekerjaan'}</h4>
                                <span class="text-muted small">${job ? job.namaUsaha : 'Usaha'}</span>
                            </div>
                            <span class="badge-status ${statusClass}">${app.status}</span>
                        </div>
                        <div class="row g-2 text-start small text-muted">
                            <div class="col-6">Tgl Kirim:</div>
                            <div class="col-6 text-end text-dark">${app.tanggal}</div>
                            <div class="col-6">Metode:</div>
                            <div class="col-6 text-end text-dark">Unggah CV PDF</div>
                        </div>
                        ${actionTextHTML}
                    </div>
                </div>
            `;
        });
    }

    return `
        <div class="d-flex flex-column min-vh-100">
            ${getResponsiveHeaderHTML('mahasiswa', 'status-lamaran')}
            
            <main class="container py-4 flex-grow-1">
                <div class="mb-4">
                    <h3 class="fs-5 fw-bold text-slate-800 mb-1">Status Lamaran Saya</h3>
                    <p class="small text-muted">Daftar pemantauan lamaran masuk yang sedang atau telah dievaluasi</p>
                </div>
                
                <div class="row g-3">
                    ${listHTML}
                </div>
            </main>
            
            ${getResponsiveBottomNavHTML('mahasiswa', 'status-lamaran')}
        </div>
    `;
}

function getProfilMahasiswaHTML(fidelity) {
    const user = state.session.mahasiswaLog.user;
    return `
        <div class="d-flex flex-column min-vh-100">
            ${getResponsiveHeaderHTML('mahasiswa', 'profil')}
            
            <main class="container py-4 flex-grow-1">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="profile-card border-0 shadow text-center p-4 p-sm-5 mb-4">
                            <div class="avatar-wrapper mx-auto mb-3">${user.foto}</div>
                            <h3 class="fs-5 fw-bold text-slate-800 mb-1">${user.nama}</h3>
                            <p class="text-muted small mb-4">${user.universitas} &bull; Semester ${user.semester}</p>
                            
                            <div class="text-start bg-light p-3 rounded-4 mb-4">
                                <div class="d-flex align-items-center gap-2 mb-3 py-1 border-bottom">
                                    <span class="material-icons text-muted" style="font-size:16px;">email</span>
                                    <span class="small">${user.email}</span>
                                </div>
                                <div class="d-flex align-items-center gap-2 py-1">
                                    <span class="material-icons text-muted" style="font-size:16px;">phone</span>
                                    <span class="small">${user.nohp}</span>
                                </div>
                            </div>
                            
                            <button class="btn btn-outline-danger w-100 py-3 d-flex align-items-center justify-content-center gap-2" onclick="handleStudentLogout()">
                                <span class="material-icons" style="font-size:18px;">logout</span> Keluar Akun Mahasiswa
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            
            ${getResponsiveBottomNavHTML('mahasiswa', 'profil')}
        </div>
    `;
}


/* ==========================================================================
   TEMPLATES HALAMAN: PEMILIK USAHA (RESPONSIVE BOOTSTRAP 5)
   ========================================================================== */

function getLoginOwnerHTML(fidelity) {
    return `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
                    <div class="form-card p-4 p-sm-5 border-0 shadow">
                        <div class="text-center mb-4">
                            <div class="d-inline-flex p-3 bg-success-light rounded-circle text-success mb-3">
                                <span class="material-icons" style="font-size:36px;">storefront</span>
                            </div>
                            <h3 class="fw-bold mb-1">Portal Bisnis</h3>
                            <p class="text-muted small">Cari pekerja part-time mahasiswa berkualitas</p>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label small fw-bold">Email Bisnis</label>
                            <input type="email" id="owner-email" class="form-control py-2" placeholder="joko@warung.com" value="${state.session.ownerLog.isLoggedIn ? 'joko@warung.com' : ''}">
                        </div>
                        <div class="mb-4">
                            <label class="form-label small fw-bold">Password</label>
                            <input type="password" id="owner-password" class="form-control py-2" placeholder="••••••••" value="${state.session.ownerLog.isLoggedIn ? 'joko123' : ''}">
                        </div>
                        
                        <button class="btn btn-success-custom w-100 py-3 mb-3" onclick="handleOwnerLogin()">Masuk Bisnis</button>
                        <button class="btn btn-link w-100 text-decoration-none text-success small fw-semibold" onclick="navigateTo('register')">Usaha belum bermitra? Daftar Mitra</button>
                        
                        <div class="mt-4 p-3 bg-light rounded text-center border border-dashed">
                            <p class="small text-success fw-bold mb-2" style="font-size:11px;">Pintasan Cepat Akun Demo:</p>
                            <button onclick="shortcutLoginOwner()" class="btn btn-sm btn-success px-3 py-2 fw-semibold">Login Instan Joko (Warmindo)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getRegisterOwnerHTML(fidelity) {
    return `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                    <div class="form-card p-4 p-sm-5 border-0 shadow">
                        <div class="text-center mb-4">
                            <h3 class="fw-bold mb-1">Pendaftaran Mitra Bisnis</h3>
                            <p class="text-muted small">Mulai publikasikan lowongan untuk mahasiswa</p>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label small fw-bold">Nama Toko / Usaha</label>
                            <input type="text" id="reg-own-usaha" class="form-control" placeholder="Warmindo Berkah">
                        </div>
                        <div class="mb-3">
                            <label class="form-label small fw-bold">Nama Pemilik Usaha</label>
                            <input type="text" id="reg-own-pemilik" class="form-control" placeholder="Joko Widodo">
                        </div>
                        <div class="mb-3">
                            <label class="form-label small fw-bold">Email Bisnis</label>
                            <input type="email" id="reg-own-email" class="form-control" placeholder="joko@warung.com">
                        </div>
                        <div class="mb-3">
                            <label class="form-label small fw-bold">Nomor HP Pemilik (WhatsApp)</label>
                            <input type="tel" id="reg-own-nohp" class="form-control" placeholder="085678901234">
                        </div>
                        <div class="mb-4">
                            <label class="form-label small fw-bold">Password</label>
                            <input type="password" id="reg-own-pass" class="form-control" placeholder="Buat password baru">
                        </div>
                        
                        <button class="btn btn-success-custom w-100 py-3 mb-3" onclick="handleOwnerRegister()">Daftar Mitra Usaha</button>
                        <button class="btn btn-link w-100 text-decoration-none text-success small fw-semibold" onclick="navigateTo('login')">Sudah punya akun bisnis? Masuk</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getDashboardOwnerHTML(fidelity) {
    const owner = state.session.ownerLog.user;
    const myJobs = state.lowongan.filter(j => j.ownerId === owner.id);
    const myJobIds = myJobs.map(j => j.id);
    
    const myAppls = state.lamaran.filter(l => myJobIds.includes(l.jobId));
    const countPelamar = myAppls.length;
    const countDiterima = myAppls.filter(l => l.status === "Diterima").length;
    const countLowongan = myJobs.length;

    return `
        <div class="d-flex flex-column min-vh-100">
            ${getResponsiveHeaderHTML('pemilik-usaha', 'dashboard')}
            
            <main class="container py-4 flex-grow-1">
                <div class="row align-items-center mb-4">
                    <div class="col">
                        <h3 class="fs-5 fw-bold text-slate-800 mb-1">Dashboard Pemilik Usaha</h3>
                        <p class="small text-muted mb-0">Selamat datang kembali, Mitra <strong>${owner.namaUsaha}</strong></p>
                    </div>
                    <div class="col-auto mt-2 mt-md-0">
                        <button class="btn btn-success-custom d-flex align-items-center gap-2 py-2" onclick="navigateTo('tambah-lowongan')">
                            <span class="material-icons" style="font-size:16px;">add</span> Buat Lowongan Baru
                        </button>
                    </div>
                </div>
                
                <!-- Metrics Grid -->
                <div class="row g-3 mb-5">
                    <div class="col-12 col-md-4">
                        <div class="dashboard-stat-card border-0 shadow-sm">
                            <div class="p-3 bg-primary-light text-primary rounded-circle">
                                <span class="material-icons d-block">work</span>
                            </div>
                            <div>
                                <h4 class="h2 fw-bold text-slate-800 mb-0">${countLowongan}</h4>
                                <span class="text-muted small" style="font-size:11px;">Lowongan Aktif</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="dashboard-stat-card border-0 shadow-sm">
                            <div class="p-3 bg-warning-light text-warning rounded-circle">
                                <span class="material-icons d-block">people</span>
                            </div>
                            <div>
                                <h4 class="h2 fw-bold text-slate-800 mb-0">${countPelamar}</h4>
                                <span class="text-muted small" style="font-size:11px;">Pelamar Masuk</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="dashboard-stat-card border-0 shadow-sm">
                            <div class="p-3 bg-success-light text-success rounded-circle">
                                <span class="material-icons d-block">verified</span>
                            </div>
                            <div>
                                <h4 class="h2 fw-bold text-slate-800 mb-0">${countDiterima}</h4>
                                <span class="text-muted small" style="font-size:11px;">Pelamar Diterima</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            ${getResponsiveBottomNavHTML('pemilik-usaha', 'dashboard')}
        </div>
    `;
}

function getTambahLowonganHTML(fidelity) {
    return `
        <div class="d-flex flex-column min-vh-100">
            ${getResponsiveHeaderHTML('pemilik-usaha', 'dashboard')}
            
            <main class="container py-4 flex-grow-1">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8">
                        <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 mb-4" onclick="navigateTo('dashboard')">
                            <span class="material-icons" style="font-size:16px;">arrow_back</span> Batal
                        </button>
                        
                        <div class="form-card border-0 shadow">
                            <h3 class="fs-5 fw-bold text-slate-800 mb-4 border-bottom pb-3">Buat Lowongan Pekerjaan Baru</h3>
                            
                            <div class="row">
                                <div class="col-12 col-md-8 mb-3">
                                    <label class="form-label small fw-bold">Nama Posisi Pekerjaan</label>
                                    <input type="text" id="add-job-posisi" class="form-control" placeholder="Barista Cafe">
                                </div>
                                <div class="col-12 col-md-4 mb-3">
                                    <label class="form-label small fw-bold">Kategori Pekerjaan</label>
                                    <select id="add-job-kategori" class="form-select">
                                        <option value="Cafe">Cafe</option>
                                        <option value="Toko">Toko</option>
                                        <option value="Event">Event</option>
                                        <option value="Magang">Magang</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Freelancer">Freelancer</option>
                                    </select>
                                </div>
                                <div class="col-12 mb-3">
                                    <label class="form-label small fw-bold">Lokasi Usaha</label>
                                    <input type="text" id="add-job-lokasi" class="form-control" placeholder="Jl. Kaliurang KM 5, Sleman">
                                </div>
                                <div class="col-12 col-sm-4 mb-3">
                                    <label class="form-label small fw-bold">Gaji / Upah Penawaran</label>
                                    <input type="text" id="add-job-gaji" class="form-control" placeholder="Rp 1.500.000 / bln">
                                </div>
                                <div class="col-12 col-sm-4 mb-3">
                                    <label class="form-label small fw-bold">Jam Kerja / Hari</label>
                                    <input type="text" id="add-job-jam" class="form-control" placeholder="4 Jam / hari">
                                </div>
                                <div class="col-12 col-sm-4 mb-3">
                                    <label class="form-label small fw-bold">Kuota Kebutuhan Pekerja</label>
                                    <input type="number" id="add-job-kebutuhan" class="form-control" placeholder="2" min="1">
                                </div>
                                <div class="col-12 mb-3 mt-2">
                                    <label class="form-label small fw-bold">Deskripsi Pekerjaan</label>
                                    <textarea id="add-job-deskripsi" class="form-control" style="height:80px; resize:none;" placeholder="Tuliskan pembagian tugas utama pekerjaan harian secara singkat..."></textarea>
                                </div>
                                <div class="col-12 mb-4">
                                    <label class="form-label small fw-bold">Persyaratan Kualifikasi Mahasiswa</label>
                                    <textarea id="add-job-persyaratan" class="form-control" style="height:80px; resize:none;" placeholder="Syarat minimum keahlian, semester, atau asal domisili..."></textarea>
                                </div>
                            </div>
                            
                            <button class="btn btn-success-custom w-100 py-3" onclick="publishLowongan()">Publikasikan Lowongan Pekerjaan</button>
                        </div>
                    </div>
                </div>
            </main>
            
            ${getResponsiveBottomNavHTML('pemilik-usaha', 'dashboard')}
        </div>
    `;
}

function getDaftarLowonganHTML(fidelity) {
    const owner = state.session.ownerLog.user;
    const myJobs = state.lowongan.filter(j => j.ownerId === owner.id);
    
    let listHTML = "";
    if (myJobs.length === 0) {
        listHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <span class="material-icons mb-2 opacity-50" style="font-size:48px;">assignment_late</span>
                <p>Anda belum mempublikasikan lowongan pekerjaan apapun.</p>
                <button class="btn btn-success px-4 py-2 mt-2 fw-semibold" onclick="navigateTo('tambah-lowongan')">Buat Sekarang</button>
            </div>
        `;
    } else {
        [...myJobs].reverse().forEach(job => {
            const applicants = state.lamaran.filter(l => l.jobId === job.id);
            const count = applicants.length;
            const accepted = applicants.filter(l => l.status === "Diterima").length;
            
            listHTML += `
                <div class="col-12 col-md-6">
                    <div class="owner-job-card h-100 border-0 shadow-sm d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h4 class="fs-6 fw-bold text-slate-800 mb-0 job-title">${job.posisi}</h4>
                                <span class="badge bg-light text-dark font-monospace" style="font-size:10px;">${job.kategori}</span>
                            </div>
                            <div class="text-muted small mb-3">${job.gaji} &bull; ${job.jamKerja}</div>
                            
                            <div class="row g-2 bg-light p-2 rounded-3 small text-muted mb-3">
                                <div class="col-6">Total Pelamar:</div>
                                <div class="col-6 text-end text-dark fw-bold">${count} Pelamar</div>
                                <div class="col-6">Kuota Diterima:</div>
                                <div class="col-6 text-end ${accepted >= job.kebutuhan ? 'text-success' : 'text-primary'} fw-bold">${accepted} / ${job.kebutuhan} Orang</div>
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-auto">
                            <button class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1" onclick="deleteLowongan('${job.id}')" title="Hapus">
                                <span class="material-icons" style="font-size:12px;">delete</span> Hapus
                            </button>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm btn-light d-flex align-items-center gap-1 border" onclick="logAction('Simulasi Sunting Lowongan sukses!','system')">
                                    <span class="material-icons" style="font-size:12px;">edit</span> Edit
                                </button>
                                <button class="btn btn-sm btn-primary d-flex align-items-center gap-1" onclick="viewApplicants('${job.id}')">
                                    <span class="material-icons" style="font-size:12px;">people</span> Kelola Pelamar (${count})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    return `
        <div class="d-flex flex-column min-vh-100">
            ${getResponsiveHeaderHTML('pemilik-usaha', 'daftar-lowongan')}
            
            <main class="container py-4 flex-grow-1">
                <div class="row align-items-center mb-4">
                    <div class="col">
                        <h3 class="fs-5 fw-bold text-slate-800 mb-1">Daftar Lowongan Kerja Aktif</h3>
                        <p class="small text-muted mb-0">Pantau dan seleksi seluruh lowongan yang telah Anda pasang</p>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-sm btn-success d-flex align-items-center gap-2 py-2" onclick="navigateTo('tambah-lowongan')">
                            <span class="material-icons" style="font-size:14px;">add</span> Tambah Pekerjaan
                        </button>
                    </div>
                </div>
                
                <div class="row g-3">
                    ${listHTML}
                </div>
            </main>
            
            ${getResponsiveBottomNavHTML('pemilik-usaha', 'daftar-lowongan')}
        </div>
    `;
}

function getDaftarPelamarHTML(fidelity) {
    const jobId = state.session.selectedJobForApplicants;
    const job = state.lowongan.find(j => j.id === jobId);
    const applicants = state.lamaran.filter(l => l.jobId === jobId);
    
    let listHTML = "";
    if (applicants.length === 0) {
        listHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <span class="material-icons mb-2 opacity-50" style="font-size:48px;">assignment_late</span>
                <p>Belum ada berkas mahasiswa yang masuk untuk lowongan ini.</p>
            </div>
        `;
    } else {
        [...applicants].reverse().forEach(app => {
            const isProcessed = app.status === "Diproses";
            const badgeClass = app.status.toLowerCase();
            
            let actionButtonsHTML = "";
            if (isProcessed) {
                actionButtonsHTML = `
                    <div class="row g-2 mt-3 pt-3 border-top">
                        <div class="col-6">
                            <button class="btn btn-sm btn-danger w-100" onclick="makeDecision('${app.id}', 'Ditolak')">Tolak Lamaran</button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-sm btn-success w-100 text-white" onclick="makeDecision('${app.id}', 'Diterima')">Terima Bekerja</button>
                        </div>
                    </div>
                `;
            } else {
                actionButtonsHTML = `
                    <div class="mt-3 pt-3 border-top text-end small font-monospace fw-bold ${app.status === 'Diterima' ? 'text-success' : 'text-danger'}">
                        KEPUTUSAN: ${app.status.toUpperCase()}
                    </div>
                `;
            }
            
            listHTML += `
                <div class="col-12 col-md-6">
                    <div class="applicant-card border-0 shadow-sm h-100">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h4 class="fs-6 fw-bold text-slate-800 mb-1">${app.namaPelamar}</h4>
                                <span class="text-muted small">${app.universitas} &bull; Semester ${app.semester}</span>
                            </div>
                            <span class="badge-status ${badgeClass}">${app.status}</span>
                        </div>
                        
                        <div class="my-3 p-3 bg-light rounded-3 small text-slate-600 border-start border-primary border-3" style="font-style:italic;">
                            "${app.catatan || 'Tidak ada catatan pelengkap'}"
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
                            <span class="small text-muted">Kontak WhatsApp:</span>
                            <span class="small text-dark fw-bold">${app.nohp}</span>
                        </div>
                        
                        <div class="p-2 bg-light rounded-2 border d-flex align-items-center justify-content-between small text-slate-700" onclick="logAction('Simulasi membuka file PDF CV: ${app.cvName}','system')" style="cursor:pointer;">
                            <div class="d-flex align-items-center gap-2">
                                <span class="material-icons text-danger" style="font-size:16px;">picture_as_pdf</span>
                                <span>${app.cvName}</span>
                            </div>
                            <span class="material-icons text-muted" style="font-size:16px;">download</span>
                        </div>
                        
                        ${actionButtonsHTML}
                    </div>
                </div>
            `;
        });
    }

    return `
        <div class="d-flex flex-column min-vh-100">
            ${getResponsiveHeaderHTML('pemilik-usaha', 'daftar-lowongan')}
            
            <main class="container py-4 flex-grow-1">
                <!-- Back Button -->
                <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 mb-4" onclick="navigateTo('daftar-lowongan')">
                    <span class="material-icons" style="font-size:16px;">arrow_back</span> Kembali ke Daftar Lowongan
                </button>
                
                <div class="mb-4">
                    <h3 class="fs-5 fw-bold text-slate-800 mb-1">Daftar Pelamar Masuk</h3>
                    <p class="small text-muted">Lowongan: <strong>${job ? job.posisi : 'Pekerjaan'}</strong> &bull; Jumlah Berkas: <strong>${applicants.length}</strong></p>
                </div>
                
                <div class="row g-3">
                    ${listHTML}
                </div>
            </main>
        </div>
    `;
}

function getProfilOwnerHTML(fidelity) {
    const owner = state.session.ownerLog.user;
    return `
        <div class="d-flex flex-column min-vh-100">
            ${getResponsiveHeaderHTML('pemilik-usaha', 'profil')}
            
            <main class="container py-4 flex-grow-1">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="profile-card border-0 shadow text-center p-4 p-sm-5 mb-4">
                            <div class="avatar-wrapper mx-auto mb-3" style="background-color:var(--success-light); border-color:var(--success); color:var(--success);">${owner.logo}</div>
                            <h3 class="fs-5 fw-bold text-slate-800 mb-1">${owner.namaUsaha}</h3>
                            <p class="text-muted small mb-4">Penanggung Jawab: ${owner.namaPemilik}</p>
                            
                            <div class="text-start bg-light p-3 rounded-4 mb-4">
                                <div class="d-flex align-items-start gap-2 mb-3 py-1 border-bottom">
                                    <span class="material-icons text-muted mt-1" style="font-size:16px;">place</span>
                                    <span class="small">${owner.alamat}</span>
                                </div>
                                <div class="d-flex align-items-center gap-2 mb-3 py-1 border-bottom">
                                    <span class="material-icons text-muted" style="font-size:16px;">email</span>
                                    <span class="small">${owner.email}</span>
                                </div>
                                <div class="d-flex align-items-center gap-2 py-1">
                                    <span class="material-icons text-muted" style="font-size:16px;">phone</span>
                                    <span class="small">${owner.nohp}</span>
                                </div>
                            </div>
                            
                            <button class="btn btn-outline-danger w-100 py-3 d-flex align-items-center justify-content-center gap-2" onclick="handleOwnerLogout()">
                                <span class="material-icons" style="font-size:18px;">logout</span> Keluar Mitra Bisnis
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            
            ${getResponsiveBottomNavHTML('pemilik-usaha', 'profil')}
        </div>
    `;
}


/* ==========================================================================
   EVENT HANDLERS & LOGIC ACTIONS (RESPONSIVE REDIRECTS)
   ========================================================================== */

function bindEventListeners() {
    const searchInput = document.getElementById("job-search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchKeyword = e.target.value;
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                renderScreen();
                const freshInput = document.getElementById("job-search-input");
                if (freshInput) {
                    freshInput.focus();
                    freshInput.selectionStart = freshInput.selectionEnd = freshInput.value.length;
                }
            }, 300);
        });
    }
}

// Demo Login Shortcuts
function shortcutLoginStudent() {
    state.session.mahasiswaLog.isLoggedIn = true;
    state.session.mahasiswaLog.user = state.mahasiswa[0];
    logAction("Shortcut Login: Budi Santoso (UGM)", "mahasiswa");
    navigateTo("home");
}

function shortcutLoginOwner() {
    state.session.ownerLog.isLoggedIn = true;
    state.session.ownerLog.user = state.pemilikUsaha[0];
    logAction("Shortcut Login: Joko Widodo (Warmindo Berkah)", "pemilik");
    navigateTo("dashboard");
}

// Auth Actions
function handleStudentLogin() {
    const email = document.getElementById("student-email").value;
    const pass = document.getElementById("student-password").value;
    
    const user = state.mahasiswa.find(m => m.email === email && m.password === pass);
    
    if (user) {
        state.session.mahasiswaLog.isLoggedIn = true;
        state.session.mahasiswaLog.user = user;
        logAction(`Mahasiswa ${user.nama} berhasil login`, "mahasiswa");
        navigateTo("home");
    } else {
        alert("Email atau password mahasiswa salah! (Gunakan email: budi@student.com, password: budi123)");
        logAction("Gagal login mahasiswa: Akun tidak ditemukan", "mahasiswa");
    }
}

function handleStudentRegister() {
    const nama = document.getElementById("reg-stud-nama").value;
    const email = document.getElementById("reg-stud-email").value;
    const nohp = document.getElementById("reg-stud-nohp").value;
    const uni = document.getElementById("reg-stud-uni").value;
    const sem = document.getElementById("reg-stud-sem").value;
    const pass = document.getElementById("reg-stud-pass").value;
    const pass2 = document.getElementById("reg-stud-pass2").value;
    
    if (!nama || !email || !nohp || !uni || !sem || !pass) {
        alert("Semua formulir harus diisi!");
        return;
    }
    
    if (pass !== pass2) {
        alert("Password konfirmasi tidak cocok!");
        return;
    }
    
    const initials = nama.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
    const newStudent = {
        id: "m" + (state.mahasiswa.length + 1),
        nama,
        email,
        password: pass,
        nohp,
        universitas: uni,
        semester: sem,
        foto: initials
    };
    
    state.mahasiswa.push(newStudent);
    state.session.mahasiswaLog.isLoggedIn = true;
    state.session.mahasiswaLog.user = newStudent;
    
    logAction(`Registrasi Mahasiswa Baru Sukses: ${nama}`, "mahasiswa");
    navigateTo("home");
}

function handleStudentLogout() {
    state.session.mahasiswaLog.isLoggedIn = false;
    logAction("Mahasiswa keluar akun (logout)", "mahasiswa");
    navigateTo("login");
}

function handleOwnerLogin() {
    const email = document.getElementById("owner-email").value;
    const pass = document.getElementById("owner-password").value;
    
    const owner = state.pemilikUsaha.find(p => p.email === email && p.password === pass);
    
    if (owner) {
        state.session.ownerLog.isLoggedIn = true;
        state.session.ownerLog.user = owner;
        logAction(`Pemilik Usaha ${owner.namaUsaha} berhasil login`, "pemilik");
        navigateTo("dashboard");
    } else {
        alert("Email atau password salah! (Gunakan email: joko@warung.com, password: joko123)");
        logAction("Gagal login pemilik usaha: Akun tidak ditemukan", "pemilik");
    }
}

function handleOwnerRegister() {
    const usaha = document.getElementById("reg-own-usaha").value;
    const pemilik = document.getElementById("reg-own-pemilik").value;
    const email = document.getElementById("reg-own-email").value;
    const nohp = document.getElementById("reg-own-nohp").value;
    const pass = document.getElementById("reg-own-pass").value;
    
    if (!usaha || !pemilik || !email || !nohp || !pass) {
        alert("Semua input pendaftaran mitra harus diisi!");
        return;
    }
    
    const logoInitials = usaha.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
    const newOwner = {
        id: "p" + (state.pemilikUsaha.length + 1),
        namaUsaha: usaha,
        namaPemilik: pemilik,
        email,
        password: pass,
        nohp,
        alamat: "Alamat belum diisi",
        logo: logoInitials
    };
    
    state.pemilikUsaha.push(newOwner);
    state.session.ownerLog.isLoggedIn = true;
    state.session.ownerLog.user = newOwner;
    
    logAction(`Registrasi Mitra Usaha Baru Sukses: ${usaha}`, "pemilik");
    navigateTo("dashboard");
}

function handleOwnerLogout() {
    state.session.ownerLog.isLoggedIn = false;
    logAction("Pemilik Usaha keluar akun (logout)", "pemilik");
    navigateTo("login");
}

// Student actions
function selectCategory(cat) {
    selectedCategory = cat;
    logAction(`Filter kategori lowongan diubah ke: ${cat}`, "mahasiswa");
    renderScreen();
}

function selectJob(jobId) {
    state.session.selectedJobId = jobId;
    navigateTo("detail");
}

function simulateCVUpload() {
    const user = state.session.mahasiswaLog.user;
    const filename = `CV_${user.nama.replace(/\s+/g, '_')}_PDF.pdf`;
    state.session.uploadedCV = filename;
    logAction(`Mengunggah file CV: ${filename}`, "mahasiswa");
    renderScreen();
}

function removeCV() {
    state.session.uploadedCV = null;
    logAction("File CV dihapus", "mahasiswa");
    renderScreen();
}

function submitApplication() {
    const cv = state.session.uploadedCV;
    if (!cv) {
        alert("Anda wajib mengunggah file CV (PDF) terlebih dahulu!");
        return;
    }
    
    const user = state.session.mahasiswaLog.user;
    const job = state.lowongan.find(j => j.id === state.session.selectedJobId);
    
    const name = document.getElementById("apply-nama").value;
    const nohp = document.getElementById("apply-nohp").value;
    const uni = document.getElementById("apply-uni").value;
    const sem = document.getElementById("apply-semester").value;
    const notes = document.getElementById("apply-catatan").value;
    
    if (!name || !nohp || !uni || !sem) {
        alert("Silakan isi data kontak dan informasi akademis Anda!");
        return;
    }
    
    const newAppl = {
        id: "lamaran" + (state.lamaran.length + 1),
        jobId: job.id,
        mahasiswaId: user.id,
        namaPelamar: name,
        nohp: nohp,
        semester: sem,
        universitas: uni,
        cvName: cv,
        catatan: notes,
        status: "Diproses",
        tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    
    state.lamaran.push(newAppl);
    state.session.uploadedCV = null;
    
    logAction(`Lamaran dikirim oleh mahasiswa ${name} untuk posisi ${job.posisi} di ${job.namaUsaha}!`, "mahasiswa");
    navigateTo("status-lamaran");
}


// Owner Actions: Create Job
function publishLowongan() {
    const owner = state.session.ownerLog.user;
    
    const posisi = document.getElementById("add-job-posisi").value;
    const kategori = document.getElementById("add-job-kategori").value;
    const lokasi = document.getElementById("add-job-lokasi").value;
    const gaji = document.getElementById("add-job-gaji").value;
    const jam = document.getElementById("add-job-jam").value;
    const keb = document.getElementById("add-job-kebutuhan").value;
    const desc = document.getElementById("add-job-deskripsi").value;
    const req = document.getElementById("add-job-persyaratan").value;
    
    if (!posisi || !lokasi || !gaji || !jam || !keb || !desc || !req) {
        alert("Mohon isi semua data lowongan pekerjaan!");
        return;
    }
    
    const newJob = {
        id: "job" + (state.lowongan.length + 1),
        ownerId: owner.id,
        namaUsaha: owner.namaUsaha,
        posisi,
        kategori,
        gaji,
        lokasi,
        jamKerja: jam,
        kebutuhan: parseInt(keb),
        deskripsi: desc,
        persyaratan: req
    };
    
    state.lowongan.push(newJob);
    logAction(`Lowongan baru dipublikasikan: ${posisi} (${kategori})`, "pemilik");
    navigateTo("daftar-lowongan");
}

function deleteLowongan(jobId) {
    const job = state.lowongan.find(j => j.id === jobId);
    if (!job) return;
    
    if (confirm(`Apakah Anda yakin ingin menghapus lowongan ${job.posisi}?`)) {
        state.lowongan = state.lowongan.filter(j => j.id !== jobId);
        state.lamaran = state.lamaran.filter(l => l.jobId !== jobId);
        logAction(`Lowongan pekerjaan ${job.posisi} berhasil dihapus beserta seluruh data pelamarnya`, "pemilik");
        renderScreen();
    }
}

function viewApplicants(jobId) {
    state.session.selectedJobForApplicants = jobId;
    navigateTo("daftar-pelamar");
}

function makeDecision(applId, decision) {
    const app = state.lamaran.find(l => l.id === applId);
    if (!app) return;
    
    app.status = decision;
    const job = state.lowongan.find(j => j.id === app.jobId);
    
    logAction(`Pelamar ${app.namaPelamar} dinyatakan [${decision.toUpperCase()}] untuk posisi ${job.posisi}`, "pemilik");
    renderScreen();
}
