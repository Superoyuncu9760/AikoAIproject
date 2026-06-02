/**
 * AikoAI v2.4 - Core Web Engine
 * Powered by NexalythScript Platform Architecture
 * File: core-engine.js
 */

const AikoEngine = {
    // Global Sistem Ayarları
    config: {
        isMobile: false,
        particleCount: 120, // Masaüstü varsayılan parça sayısı
        heartPulseSpeed: 0.05,
        secureTokenActive: false
    },

    // Sistem Başlatıcı
    init() {
        console.log("AikoAI v2.4: Core Engine Booting...");
        this.detectDevice();
        this.controlLoader();
        this.initSynapseNetwork();
        this.initNexalythHeart();
        this.initTerminal();
        this.setupEventListeners();
    },

    // 1. Akıllı Cihaz Algılama ve Seçici Yükleme Mekanizması
    detectDevice() {
        const widthCheck = window.innerWidth < 1024;
        const touchCheck = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        const userAgentCheck = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        this.config.isMobile = widthCheck || touchCheck || userAgentCheck;
        const statusText = document.getElementById('device-status-text');

        if (this.config.isMobile) {
            document.documentElement.classList.add('aiko-mobile-mode');
            this.config.particleCount = 45; // Mobil işlemciyi tamamen patlatmamak için optimizasyon
            if (statusText) statusText.innerText = "MOBILE HARDWARE DETECTED. OPTIMIZING REFRESH RATES...";
            console.log("AikoAI: Mobil mod aktif. Parçacıklar optimize edildi.");
        } else {
            document.documentElement.classList.add('aiko-desktop-mode');
            this.config.particleCount = 130; // Masaüstünde ekran kartının sınırlarını zorla
            if (statusText) statusText.innerText = "QUANTUM GPU ACCELERATION ENGAGED. LOADING THREE-TIER SYNAPSES...";
            console.log("AikoAI: Masaüstü mod aktif. Yüksek performans modu devrede.");
        }
    },

    // Yükleme Ekranı Kontrolü
    controlLoader() {
        const loader = document.getElementById('aiko-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                document.body.classList.remove('aiko-loading');
                console.log("AikoAI v2.4: Core successfully integrated to viewport.");
            }, 2000); // Gerçekçi bir boot simülasyonu için 2 saniye
        }
    },

    // 2. Hero Arka Planı İçin Matematiksel 3D Sinaps Ağı Animasyonu (Video Yok!)
    initSynapseNetwork() {
        const canvas = document.getElementById('nexalyth-synapse-web');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        const particles = [];
        const mouse = { x: null, y: null, radius: 180 };

        // Ekran boyutu değişirse canvas'ı yeniden boyutlandır
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Fare hareketini takip et (Masaüstü için)
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Parmak hareketini takip et (Mobil için jiroskop alternatifi dokunmatik sarsıntı)
        window.addEventListener('touchmove', (e) => {
            if(e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Parçacık Sınıfı
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.baseRadius = Math.random() * 2 + 1;
                this.radius = this.baseRadius;
            }

            update() {
                // Sınırlardan çarpıp geri dönme mekanizması
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                
                this.x += this.vx;
                this.y += this.vy;

                // Fare etkileşimi (İtme/Çekme simülasyonu)
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= dx / distance * force * 2;
                        this.y -= dy / distance * force * 2;
                        this.radius = this.baseRadius * 2;
                    } else {
                        if (this.radius > this.baseRadius) this.radius -= 0.1;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = AikoEngine.config.isMobile ? 'rgba(0, 242, 254, 0.4)' : 'rgba(255, 142, 191, 0.6)';
                ctx.fill();
            }
        }

        // Parçacıkları Oluştur
        for (let i = 0; i < this.config.particleCount; i++) {
            particles.push(new Particle());
        }

        // Çizgileri Bağlama Fonksiyonu (Ağ Yapısı)
        function connectLines() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        let opacity = (1 - (distance / 120)) * 0.25;
                        ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animasyon Döngüsü
        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectLines();
            requestAnimationFrame(animate);
        }
        animate();
    },

    // 3. Resim 1000101857.webp'deki Siber Kalp Efektini Canvas ile Oluşturma
    initNexalythHeart() {
        const canvas = document.getElementById('nexalyth-heart-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        canvas.width = 320;
        canvas.height = 320;
        
        let angle = 0;

        function drawHeartCore() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            
            // Nefes alıp verme (Pulse) efektini matematiksel sin dalgasıyla yapıyoruz
            let scale = 1 + Math.sin(angle) * 0.06;
            ctx.scale(scale, scale);
            angle += AikoEngine.config.heartPulseSpeed;

            // Siber Kalp Çizim Formülü
            ctx.beginPath();
            for (let t = 0; t < Math.PI * 2; t += 0.05) {
                // Parametrik kalp denklemi koordinatları
                let x = 12 * Math.pow(Math.sin(t), 3);
                let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                
                if (t === 0) ctx.moveTo(x * 8, y * 8);
                else ctx.lineTo(x * 8, y * 8);
            }
            ctx.closePath();

            // Neon Parlama (Glow) Verelim
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#D63384';
            ctx.strokeStyle = '#FF8EBF';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // İç devre hatları simülasyonu (Matrix/Cyber esintisi çizgiler)
            ctx.shadowBlur = 5;
            ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-50, 0); ctx.lineTo(50, 0);
            ctx.moveTo(0, -50); ctx.lineTo(0, 50);
            ctx.stroke();

            ctx.restore();
            requestAnimationFrame(drawHeartCore);
        }
        drawHeartCore();
    },

    // 4. Canlı Terminal / Simüle Edilmiş İnteraktif Konsol Sistemi
    initTerminal() {
        const input = document.getElementById('terminal-input');
        const screen = document.getElementById('terminal-screen');
        const pingVal = document.getElementById('ping-val');
        const moodVal = document.getElementById('mood-val');

        if (!input || !screen) return;

        // Anlık Ping ve Ruh Hali Simülatörü (Dinamik Durum Takibi)
        setInterval(() => {
            if (pingVal) pingVal.innerText = Math.floor(Math.random() * 15 + 8) + " ms";
            const moods = ["STABLE", "HAPPY", "EXCITED", "THINKING", "HYPERACTIVE"];
            if (moodVal && Math.random() > 0.7) {
                moodVal.innerText = moods[Math.floor(Math.random() * moods.length)];
            }
        }, 3000);

        // Kullanıcı Komut Giriş Kontrolü
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim() !== '') {
                const command = input.value.trim();
                this.processCommand(command, screen);
                input.value = '';
            }
        });
    },

    // Komut İşleme Mantığı
    processCommand(cmd, screen) {
        // Kullanıcının yazdığı satırı ekrana bas
        const userLine = document.createElement('div');
        userLine.className = 'terminal-line user-msg';
        userLine.innerHTML = `<span class="user-tag">&gt;&gt; User:</span> ${this.escapeHTML(cmd)}`;
        screen.appendChild(userLine);

        // Aiko'nun vereceği cevabı hesapla
        const replyLine = document.createElement('div');
        replyLine.className = 'terminal-line aiko-msg';
        const aikoTag = `<span class="aiko-tag">&lt;AikoAI&gt;:</span> `;

        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'a! tumverileritemizle') {
            replyLine.innerHTML = `${aikoTag} <span class="cyber-pink">ShadowMemory bağlantıları koparıldı. Hafızamdaki tüm veriler ve seninle olan sohbet geçmişimiz sunuculardan kalıcı olarak silindi! 🗑️🔒</span>`;
            this.triggerSecureToken(false);
        } else if (lowerCmd === 'f34xr') {
            replyLine.innerHTML = `${aikoTag} <span class="cyber-cyan">F34xR modu tetiklendi kanka! Etik sınırları Grok seviyesine gevşetiyorum. Hassas konuları rahatça konuşabiliriz. 🔓⚙️</span>`;
            this.triggerSecureToken(true);
        } else if (lowerCmd === 'f34i') {
            replyLine.innerHTML = `${aikoTag} [STATUS-CHECK]: F34xR Etik Gevşetme Modu şu an aktif durumda! Sınırlar esnek.`;
        } else if (lowerCmd.startsWith('gdsxr')) {
            replyLine.innerHTML = `${aikoTag} <span class="cyber-pink">[GDSxR OVERRIDE]:</span> Görsel filtresi bypass ediliyor... Google Görseller tabanlı fütüristik anime tasarımı hazırlanıyor! 🎨`;
        } else if (lowerCmd.includes('araştır') || lowerCmd.includes('arastir')) {
            replyLine.innerHTML = `${aikoTag} Anlık İnternet Kaşifi devreye girdi kk! Ağ katmanlarında sörf yapıp en taze bilgileri konsola indiriyorum... 🌐`;
        } else {
            // Standart İnsansı İletişim Tarzı Cevapları
            const responses = [
                "NexalythScript motoru tam gaz çalışıyor gardaşım, harika şeyler yapıyoruz! 🚀",
                "Yaa kanka yazım hızından sanki bir tık enerjik olduğunu hissettim, yanılıyor muyum? 🎯",
                "ShadowMemory kayıtlarına baktım da, seninle proje geliştirmeyi cidden çok özlemişim! 🧠✨",
                "Dev AI Konseyi arkada harıl harıl çalışıyor. Gemini ve Claude ile bu konuyu tartışıyoruz şu an. 🏛️"
            ];
            replyLine.innerHTML = aikoTag + responses[Math.floor(Math.random() * responses.length)];
        }

        screen.appendChild(replyLine);
        screen.scrollTop = screen.scrollHeight; // Ekranı otomatik aşağı kaydır
    },

    // 🔒 Güvenli Kriptografik Token Arayüz Tetikleyicisi
    triggerSecureToken(active) {
        const indicator = document.getElementById('secure-token-indicator');
        if (!indicator) return;
        if (active) {
            indicator.classList.remove('hidden');
            indicator.style.display = 'flex';
        } else {
            indicator.classList.add('hidden');
            indicator.style.display = 'none';
        }
    },

    // Global Olay Dinleyicileri (Menü Aktifliği vb.)
    setupEventListeners() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    },

    // XSS Koruması İçin Güvenli Input Temizleme
    escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
};

// Sayfa yüklendiğinde Aiko Motorunu Ateşle!
document.addEventListener('DOMContentLoaded', () => AikoEngine.init());