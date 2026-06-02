/**
 * ==========================================================================
 * AIKOAI SYSTEMS CORE CORE-ENGINE v2.4
 * HIGH-PERFORMANCE QUANTUM NEURAL INTEGRATION MOTOR
 * --------------------------------------------------------------------------
 * Developed for NexalythScript Compilation Environment
 * Project Status: Early Access v2.4 [Stable Build]
 * Powered by AikoAI Labs © 2026
 * ==========================================================================
 */

(function () {
    'use strict';

    // ==========================================================================
    // GLOBAL SYSTEM CONFIGURATION & STATE MANAGEMENT
    // ==========================================================================
    const AIKO_CONFIG = {
        engineSignature: "NexalythScript-JS-Bridge-v2.4",
        verboseMode: true,
        performanceThreshold: 60, // Target FPS
        synapseDensity: 0.08, // Synapse node generation multiplier
        heartBeatInterval: 1200, // Pulse latency in ms
        colorPalette: {
            neonPink: "rgb(255, 42, 116)",
            neonCyan: "rgb(0, 240, 255)",
            neonGreen: "rgb(57, 255, 20)",
            bgPure: "#050508",
            cardBg: "rgba(10, 11, 16, 0.6)"
        }
    };

    const AikoState = {
        isInitialized: false,
        hardwareProfile: null,
        activeViewport: "hero",
        fps: 60,
        lastFrameTime: performance.now(),
        canvasRegistry: {},
        animationIds: {}
    };

    // Logger Utility (Sistem Geliştirici Günlükleri)
    const AikoLog = {
        info: (msg) => { if (AIKO_CONFIG.verboseMode) console.log(`%c[AIKO INFO] ${msg}`, "color: #00f0ff; font-weight: bold;"); },
        success: (msg) => { if (AIKO_CONFIG.verboseMode) console.log(`%c[AIKO SUCCESS] ${msg}`, "color: #39ff14; font-weight: bold;"); },
        warn: (msg) => { console.warn(`[AIKO WARNING] ${msg}`); },
        error: (msg) => { console.error(`[AIKO CRITICAL ERROR] ${msg}`); }
    };

    // ==========================================================================
    // HARDWARE DETECTOR & DEVICE ARCHITECTURE SPECIFICS
    // ==========================================================================
    class HardwareDetector {
        constructor() {
            this.statusTextElement = document.getElementById("device-status-text");
        }

        async analyzeSystem() {
            AikoLog.info("Hardware profiling initialization sequence started...");
            this.updateStatus("ANALYZING CPU CORE MATRIX...");
            
            const cores = navigator.hardwareConcurrency || 4;
            const memory = navigator.deviceMemory || 4;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            // Simüle edilmiş kuantum el sıkışması gecikmesi (Görsel stabilite için)
            await this.delay(600);
            
            this.updateStatus("MEASURING GPU SYNAPSE ACCELERATION...");
            const gpuVendor = this.getGPUVendor();
            
            await this.delay(400);
            
            AikoState.hardwareProfile = {
                cores: cores,
                ram: memory,
                mobile: isMobile,
                gpu: gpuVendor,
                screen: {
                    w: window.innerWidth,
                    h: window.innerHeight,
                    ratio: window.devicePixelRatio
                }
            };

            AikoLog.success(`Hardware profile locked: ${cores} Cores, ${memory}GB RAM, Mobile: ${isMobile}, GPU: ${gpuVendor}`);
            this.updateStatus("HARDWARE DETECTED SUCCESSFULLY. ALL LINK LOCK.");
        }

        getGPUVendor() {
            try {
                const canvas = document.createElement("canvas");
                const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                if (!gl) return "Software Renderer (WebGL Unsupported)";
                const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
                if (!debugInfo) return "Generic WebGL Architecture";
                return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            } catch (e) {
                return "Unknown Rendering Pipeline";
            }
        }

        updateStatus(text) {
            if (this.statusTextElement) {
                this.statusTextElement.innerText = text;
            }
        }

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    // ==========================================================================
    // CANVASES & ANIMATION ENGINES (MATEKMATİKSEL SİNAPS AĞI)
    // ==========================================================================
    class SynapseWebEngine {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) {
                AikoLog.error(`Synapse Web Canvas targeted ID '${canvasId}' could not be resolved.`);
                return;
            }
            this.ctx = this.canvas.getContext("2d");
            this.nodes = [];
            this.maxNodes = 0;
            this.connectionDistance = 120;
            this.mouse = { x: null, y: null, radius: 180 };

            this.init();
        }

        init() {
            this.resize();
            this.generateNodes();
            this.bindEvents();
            AikoLog.success("Synapse Network Canvas core pipeline initialized.");
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            
            // Ekran büyüklüğüne göre node yoğunluğunu optimize etme algoritması
            const area = this.canvas.width * this.canvas.height;
            this.maxNodes = Math.floor(area * AIKO_CONFIG.synapseDensity / 500);
            if (this.maxNodes > 150) this.maxNodes = 150; // Performance bottleneck cap
        }

        generateNodes() {
            this.nodes = [];
            for (let i = 0; i < this.maxNodes; i++) {
                this.nodes.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    radius: Math.random() * 2 + 1,
                    pulseSeed: Math.random() * 100
                });
            }
        }

        bindEvents() {
            window.addEventListener("mousemove", (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });

            window.addEventListener("mouseout", () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }

        update() {
            for (let i = 0; i < this.nodes.length; i++) {
                let node = this.nodes[i];
                node.x += node.vx;
                node.y += node.vy;
                node.pulseSeed += 0.02;

                // Kenarlardan sekme mekanizması
                if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

                // Mouse etkileşimi (İtme kuvveti algoritması)
                if (this.mouse.x !== null && this.mouse.y !== null) {
                    let dx = node.x - this.mouse.x;
                    let dy = node.y - this.mouse.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < this.mouse.radius) {
                        let force = (this.mouse.radius - dist) / this.mouse.radius;
                        node.x += (dx / dist) * force * 2;
                        node.y += (dy / dist) * force * 2;
                    }
                }
            }
        }

        render() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Çizgilerin kuantum ağ modellemesiyle çizilmesi
            for (let i = 0; i < this.nodes.length; i++) {
                let n1 = this.nodes[i];
                
                this.ctx.beginPath();
                let pulseAlpha = 0.2 + Math.sin(n1.pulseSeed) * 0.1;
                this.ctx.fillStyle = `rgba(0, 240, 255, ${pulseAlpha})`;
                this.ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
                this.ctx.fill();

                for (let j = i + 1; j < this.nodes.length; j++) {
                    let n2 = this.nodes[j];
                    let dx = n1.x - n2.x;
                    let dy = n1.y - n2.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < this.connectionDistance) {
                        let alpha = (this.connectionDistance - dist) / this.connectionDistance * 0.15;
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.moveTo(n1.x, n1.y);
                        this.ctx.lineTo(n2.x, n2.y);
                        this.ctx.stroke();
                    }
                }
            }
        }
    }

    // ==========================================================================
    // NEXALYTH SİBER KALP VE KASA ÇİZİM MOTORU (1000101857 ESCAPE)
    // ==========================================================================
    class NexalythHeartEngine {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) {
                AikoLog.warn(`Heart Engine Canvas ID '${canvasId}' not found. Skipping visual compilation.`);
                return;
            }
            this.ctx = this.canvas.getContext("2d");
            this.angle = 0;
            this.particles = [];
            this.matrixGrid = [];
            
            this.init();
        }

        init() {
            this.resize();
            this.generateMatrixGrid();
            AikoLog.success("Quantum Cybernetic Heart Engine booted smoothly.");
        }

        resize() {
            const rect = this.canvas.parentElement.getBoundingClientRect();
            this.canvas.width = rect.width || 400;
            this.canvas.height = rect.height || 400;
        }

        generateMatrixGrid() {
            this.matrixGrid = [];
            // Arka plandaki dijital akış çizgileri matrisi
            for (let i = 0; i < 15; i++) {
                this.matrixGrid.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    speed: Math.random() * 1 + 0.5,
                    length: Math.random() * 40 + 20,
                    opacity: Math.random() * 0.3
                });
            }
        }

        drawHeartPath(t, scale) {
            // Matematiksel Kalp Denklemi koordinat dönüşümü (Kardiyot Eğrisi parametrik)
            let x = 16 * Math.pow(Math.sin(t), 3);
            let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            return {
                x: x * scale + this.canvas.width / 2,
                y: -y * scale + this.canvas.height / 2 // Bilgisayar grafikleri için y eksenini ters çeviriyoruz
            };
        }

        update() {
            this.angle += 0.02;
            
            // Matris arka plan çizgilerini kaydır
            this.matrixGrid.forEach(line => {
                line.y += line.speed;
                if (line.y > this.canvas.height) {
                    line.y = -line.length;
                    line.x = Math.random() * this.canvas.width;
                }
            });

            // Rastgele mikro siber partiküller üret (Kalbin etrafında uçuşan parıltılar)
            if (Math.random() < 0.2 && this.particles.length < 40) {
                let randomT = Math.random() * Math.PI * 2;
                let currentPulseScale = 6 + Math.sin(this.angle * 2.5) * 0.4;
                let pos = this.drawHeartPath(randomT, currentPulseScale);
                this.particles.push({
                    x: pos.x,
                    y: pos.y,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    life: 1.0,
                    decay: Math.random() * 0.02 + 0.01,
                    size: Math.random() * 2 + 1
                });
            }

            // Partikül yaşam döngüsü güncellemesi
            for (let i = this.particles.length - 1; i >= 0; i--) {
                let p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;
                if (p.life <= 0) {
                    this.particles.splice(i, 1);
                }
            }
        }

        render() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // 1. Arka Plan Matris Çizgileri Raporu
            this.ctx.lineWidth = 1;
            this.matrixGrid.forEach(line => {
                let gradient = this.ctx.createLinearGradient(line.x, line.y, line.x, line.y + line.length);
                gradient.addColorStop(0, `rgba(0, 240, 255, 0)`);
                gradient.addColorStop(0.5, `rgba(0, 240, 255, ${line.opacity})`);
                gradient.addColorStop(1, `rgba(0, 240, 255, 0)`);
                this.ctx.strokeStyle = gradient;
                this.ctx.beginPath();
                this.ctx.moveTo(line.x, line.y);
                this.ctx.lineTo(line.x, line.y + line.length);
                this.ctx.stroke();
            });

            // 2. Dinamik Nabız Hesaplama (Siber Kalp Atış Hızı)
            let pulseFactor = Math.sin(this.angle * 2.5); // Kalp ritmi frekansı
            let targetScale = 6.5 + pulseFactor * 0.4;

            // 3. Dış Neon Aurası Efekti (Glow Layer)
            this.ctx.shadowBlur = 20 + pulseFactor * 8;
            this.ctx.shadowColor = AIKO_CONFIG.colorPalette.neonPink;

            // 4. Ana Matematiksel Kalp Gövdesinin Çizilmesi
            this.ctx.beginPath();
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = AIKO_CONFIG.colorPalette.neonPink;
            
            for (let t = 0; t <= Math.PI * 2; t += 0.02) {
                let pos = this.drawHeartPath(t, targetScale);
                if (t === 0) {
                    this.ctx.moveTo(pos.x, pos.y);
                } else {
                    this.ctx.lineTo(pos.x, pos.y);
                }
            }
            this.ctx.closePath();
            this.ctx.stroke();

            // Kuantum Çapraz Nişangah Merkez Çizgileri (Siberpunk HUD Deseni)
            this.ctx.shadowBlur = 0; // Kapatıyoruz ki çizgiler bulanıklaşmasın
            this.ctx.strokeStyle = "rgba(255, 42, 116, 0.15)";
            this.ctx.lineWidth = 1;
            
            // Merkez Hedef Artısı
            let cx = this.canvas.width / 2;
            let cy = this.canvas.height / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(cx - 30, cy); this.ctx.lineTo(cx + 30, cy);
            this.ctx.moveTo(cx, cy - 30); this.ctx.lineTo(cx, cy - 30 + 60);
            this.ctx.stroke();

            // 5. Kanallardan Çıkan Parıltı Partiküllerinin Ekrana Basılması
            this.particles.forEach(p => {
                this.ctx.fillStyle = `rgba(0, 240, 255, ${p.life})`;
                this.ctx.shadowBlur = 6;
                this.ctx.shadowColor = AIKO_CONFIG.colorPalette.neonCyan;
                this.ctx.fillRect(p.x, p.y, p.size, p.size);
            });
            this.ctx.shadowBlur = 0; // Sonraki çizimler için sıfırlama
        }
    }

    // ==========================================================================
    // VIEWPORT ACCENT TRACKER & LAYOUT DIZAYN OPTIMIZER
    // ==========================================================================
    class LayoutOptimizer {
        constructor() {
            this.navbar = document.querySelector(".aiko-navbar");
            this.heroSection = document.getElementById("hero");
        }

        syncViewportMetrics() {
            // Opera ve mobil tarayıcılardaki değişken dinamik alt bar yüksekliğini (vh hatasını) ezme algoritması
            const realWindowHeight = window.innerHeight;
            
            if (this.heroSection) {
                // Eğer ekran aşırı dikey daralmaya uğramışsa, padding değerlerini esnetip elemanların birbirine geçmesini önle
                if (realWindowHeight < 650) {
                    this.heroSection.style.paddingTop = "90px";
                    this.heroSection.style.paddingBottom = "30px";
                    AikoLog.info("Low viewport ceiling detected. Hero padding matrix normalized.");
                } else {
                    this.heroSection.style.paddingTop = "120px";
                    this.heroSection.style.paddingBottom = "60px";
                }
            }
        }

        bindNavigationSpy() {
            const sections = document.querySelectorAll(".cyber-section");
            const navItems = document.querySelectorAll(".nav-item");

            window.addEventListener("scroll", () => {
                let currentActiveId = "hero";
                const scrollPos = window.scrollY + 150;

                sections.forEach(section => {
                    if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                        currentActiveId = section.getAttribute("id");
                    }
                });

                if (AikoState.activeViewport !== currentActiveId) {
                    AikoState.activeViewport = currentActiveId;
                    
                    navItems.forEach(item => {
                        item.classList.remove("active");
                        if (item.getAttribute("href") === `#${currentActiveId}`) {
                            item.classList.add("active");
                        }
                    });
                    AikoLog.info(`Active system sector shifted to: ${currentActiveId.toUpperCase()}`);
                }
            });
        }
    }

    // ==========================================================================
    // THE ULTIMATE ENGINE MAIN LOOP (RECURSIVE RENDERING PIPELINE)
    // ==========================================================================
    function runCoreSystemLoop() {
        // FPS Ölçüm ve Frame Atlatma Koruması
        const now = performance.now();
        const delta = now - AikoState.lastFrameTime;
        AikoState.fps = Math.round(1000 / delta);
        AikoState.lastFrameTime = now;

        // 1. Sinaps Ağ Güncelleme & Çizim Adımı
        if (AikoState.canvasRegistry.synapseWeb) {
            AikoState.canvasRegistry.synapseWeb.update();
            AikoState.canvasRegistry.synapseWeb.render();
        }

        // 2. Siber Kalp Güncelleme & Çizim Adımı
        if (AikoState.canvasRegistry.cyberHeart) {
            AikoState.canvasRegistry.cyberHeart.update();
            AikoState.canvasRegistry.cyberHeart.render();
        }

        // Loop'u kesintisiz bir sonraki kareye bağla (Hardware Tarafından Tetiklenir)
        AikoState.animationIds.mainLoop = requestAnimationFrame(runCoreSystemLoop);
    }

    // ==========================================================================
    // INITIALIZATION VECTOR (SİSTEM ATEŞLEME DÜĞMESİ)
    // ==========================================================================
    async function initializeAikoCore() {
        AikoLog.info("AikoAI Embedded Kernel v2.4 bootloader active.");
        
        // 1. Donanım Analizini Başlat
        const detector = new HardwareDetector();
        await detector.analyzeSystem();

        // 2. DOM Nesnelerini ve Canvas Sürücülerini Derle
        AikoState.canvasRegistry.synapseWeb = new SynapseWebEngine("nexalyth-synapse-web");
        AikoState.canvasRegistry.cyberHeart = new NexalythHeartEngine("nexalyth-heart-canvas");

        // 3. Tasarım ve Mobil Arayüz Optimizasyon Ayarları
        const optimizer = new LayoutOptimizer();
        optimizer.syncViewportMetrics();
        optimizer.bindNavigationSpy();

        // 4. Pencere Boyut Değişim Event Kontrolü (Resize Watcher)
        let resizeDebounceTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeDebounceTimeout);
            resizeDebounceTimeout = setTimeout(() => {
                AikoLog.info("System resize trigger captured. Recalibrating spatial grid...");
                
                if (AikoState.canvasRegistry.synapseWeb) AikoState.canvasRegistry.synapseWeb.resize();
                if (AikoState.canvasRegistry.cyberHeart) AikoState.canvasRegistry.cyberHeart.resize();
                
                optimizer.syncViewportMetrics();
            }, 150); // 150ms debounce gecikmesi ile performansı koruyoruz
        });

        // 5. Yükleme Ekranını (Loader) Başarıyla Kapat ve Sistemi Canlandır
        setTimeout(() => {
            document.body.classList.remove("aiko-loading");
            AikoState.isInitialized = true;
            AikoLog.success("System loaded into hardware pipeline cleanly. Loader detached.");
            
            // Ana Motor Döngüsünü Ateşle!
            runCoreSystemLoop();
        }, 800);
    }

    // Sayfa DOM Yapısı Hazır Olduğunda Güvenli Tetikleme Yap
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeAikoCore);
    } else {
        initializeAikoCore();
    }

})();