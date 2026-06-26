<?php
$page_title = 'Experience';
include 'includes/header.php';
?>

<!-- ============================================
     CINEMATIC 3D EXPERIENCE PAGE
     ============================================ -->
<style>
    /* Fullscreen Experience Styles */
    #experience-wrapper {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: #050200;
        z-index: 10;
        margin-top: 0;
        padding-top: 0;
    }

    #canvas-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    /* Cinematic Overlay Vignette */
    .vignette-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, transparent 30%, rgba(5, 2, 0, 0.85) 100%);
        pointer-events: none;
        z-index: 2;
    }

    /* Interactive UI Overlays */
    #ui-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 20px;
        z-index: 5;
        background: rgba(26, 22, 18, 0.65);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        transition: opacity 1.5s ease-in-out;
    }

    .ui-content {
        max-width: 650px;
        color: var(--white);
        text-shadow: 0 4px 15px rgba(0,0,0,0.8);
    }

    .ui-title {
        font-family: var(--font-heading);
        font-weight: 700;
        letter-spacing: 4px;
        margin-bottom: 1.5rem;
        color: var(--white) !important;
    }

    .ui-subtitle {
        font-family: var(--font-body);
        font-weight: 300;
        font-size: 1.1rem;
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.8) !important;
        margin-bottom: 2.5rem;
    }

    /* Start Button with Pulsing Glow */
    .btn-experience-start {
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        color: var(--white);
        border: none;
        padding: 1.2rem 3rem;
        font-family: var(--font-body);
        font-weight: 600;
        font-size: 1.05rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 0 30px rgba(199, 125, 17, 0.5);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .btn-experience-start:hover {
        transform: translateY(-3px) scale(1.03);
        box-shadow: 0 0 45px rgba(199, 125, 17, 0.8);
        color: var(--white);
    }

    /* End Screen Overlay */
    #end-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 20px;
        z-index: 5;
        background: rgba(10, 8, 6, 0.8);
        opacity: 0;
        pointer-events: none;
        transition: opacity 2s ease-in-out;
    }

    /* Hide Navbar and Footer when Experience is Active */
    body.experience-active #mainNav {
        opacity: 0 !important;
        transform: translateY(-100%);
        pointer-events: none;
    }

    body.experience-active .footer {
        opacity: 0 !important;
        transform: translateY(100%);
        pointer-events: none;
    }

    body.experience-active .back-to-top {
        display: none !important;
    }

    #mainNav, .footer {
        transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out !important;
    }

    /* Custom Ambient audio control button */
    .audio-control-btn {
        position: absolute;
        top: 100px; /* Below navigation bar */
        right: 30px;
        z-index: 12;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 1s, background-color 0.3s;
    }
    
    .audio-control-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        color: var(--primary-light);
    }
</style>

<div id="experience-wrapper">
    <!-- Volume controls -->
    <button id="muteBtn" class="audio-control-btn" aria-label="Toggle sound">
        <i class="bi bi-volume-up-fill fs-4"></i>
    </button>

    <!-- Three.js Canvas Container -->
    <div id="canvas-container"></div>
    
    <!-- Vignette -->
    <div class="vignette-overlay"></div>

    <!-- UI Welcome Overlay -->
    <div id="ui-overlay">
        <div class="ui-content text-center">
            <span class="text-primary text-uppercase tracking-widest mb-2 d-block" style="font-weight: 600; font-size: 0.9rem; font-family: var(--font-body);">Atreal Studios Presents</span>
            <h1 class="ui-title display-4">TEE<span class="text-primary">ऋ</span>THA</h1>
            <p class="ui-subtitle">
                An immersive spatial journey into India's ancient temple heritage. Adjust your audio, step through the lens, and cross the threshold of time.
            </p>
            <button id="startBtn" class="btn-experience-start">
                Enter Temple Sanctum
            </button>
        </div>
    </div>

    <!-- UI Completion Overlay -->
    <div id="end-overlay">
        <div class="ui-content text-center">
            <span class="text-primary text-uppercase tracking-widest mb-2 d-block" style="font-weight: 600; font-family: var(--font-body);">Journey Complete</span>
            <h2 class="mb-4 text-white" style="font-family: var(--font-heading); font-weight: 700;">Sanctum of Devotion</h2>
            <p class="mb-5 text-white-50 mx-auto" style="max-width: 500px; font-family: var(--font-body);">
                You have crossed the threshold of the sacred temple. Discover more of India's spiritual architecture and stories.
            </p>
            <div class="d-flex justify-content-center gap-3 flex-wrap">
                <button id="replayBtn" class="btn btn-outline-light rounded-pill px-4 py-3 text-uppercase font-weight-bold" style="font-size: 0.85rem; letter-spacing: 1.5px; font-family: var(--font-body);">
                    Replay Journey <i class="bi bi-arrow-counterclockwise ms-2"></i>
                </button>
                <a href="technology.php" class="btn btn-primary rounded-pill px-4 py-3 text-uppercase font-weight-bold" style="font-size: 0.85rem; letter-spacing: 1.5px; font-family: var(--font-body); box-shadow: 0 0 20px rgba(199, 125, 17, 0.3);">
                    Our Technology <i class="bi bi-arrow-right ms-2"></i>
                </a>
            </div>
        </div>
    </div>
</div>

<!-- Three.js Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('canvas-container');
    const startBtn = document.getElementById('startBtn');
    const replayBtn = document.getElementById('replayBtn');
    const muteBtn = document.getElementById('muteBtn');
    const uiOverlay = document.getElementById('ui-overlay');
    const endOverlay = document.getElementById('end-overlay');
    const body = document.body;

    let scene, camera, renderer, clock;
    let vrHeadset, lensLeft, lensRight;
    let gate, doors = [], doorPivots = [];
    let idol, halo, particles, lightRays = [];
    let bell, bellChain, bellClapper;
    let tunnelRings = [];
    let diyas = [];
    
    let isRunning = false;
    let progress = 0;
    let animationStarted = false;
    let bellTriggered = false;
    let audioCtx = null;
    let soundMuted = false;
    
    const duration = 18; // seconds for the full cinematic walk (slightly speed up for snappiness)
    let timelineTime = 0;

    // Initialize Web Audio API context
    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // Synthesize a highly authentic, deep temple bell sound
    function playBell() {
        if (!audioCtx || soundMuted) return;
        
        // Resume context if suspended (browser security)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        
        // Bell partials (fundamental and non-harmonic overtones for metallic rich resonance)
        const frequencies = [164.81, 329.63, 493.88, 659.25, 880, 1100, 1320]; // Root E3 and overtones
        const decays = [8.0, 5.5, 3.8, 2.5, 1.8, 1.2, 0.8]; // Low freq hum decays much slower
        const gains = [0.8, 0.5, 0.35, 0.25, 0.15, 0.08, 0.04]; // Blend parameters

        frequencies.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            // First partial is clean hum (sine), others have triangle bite
            osc.type = (idx === 0) ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            
            // Add subtle pitch bending on the strike
            osc.frequency.exponentialRampToValueAtTime(freq * 0.99, now + decays[idx]);

            // Add LFO pitch wobble (vibrato) to the deep hum (fundamental) for spiritual atmosphere
            if (idx === 0) {
                const lfo = audioCtx.createOscillator();
                const lfoGain = audioCtx.createGain();
                lfo.frequency.setValueAtTime(4.5, now); // 4.5Hz
                lfoGain.gain.setValueAtTime(1.5, now); // Wobble depth
                lfo.connect(lfoGain);
                lfoGain.connect(osc.frequency);
                lfo.start(now);
                lfo.stop(now + decays[idx]);
            }
            
            // Envelope: Extremely sharp attack, exponential decay
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(gains[idx], now + 0.015);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + decays[idx]);
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start(now);
            osc.stop(now + decays[idx] + 0.5);
        });
    }

    // Canvas drawing for VR Lens concentric glowing circles (Pulses and reflects)
    const lensCanvas = document.createElement('canvas');
    lensCanvas.width = 512;
    lensCanvas.height = 512;
    const lensCtx = lensCanvas.getContext('2d');

    function updateLensCanvas(time) {
        lensCtx.fillStyle = '#060301';
        lensCtx.fillRect(0, 0, 512, 512);

        // Subtle gold ambient glow
        const grad = lensCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
        grad.addColorStop(0, 'rgba(199, 125, 17, 0.15)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        lensCtx.fillStyle = grad;
        lensCtx.fillRect(0, 0, 512, 512);

        lensCtx.strokeStyle = '#c77d11';
        lensCtx.lineCap = 'round';

        // Draw multiple glowing concentric rings
        for (let i = 1; i <= 6; i++) {
            lensCtx.beginPath();
            lensCtx.lineWidth = 3 + (i * 0.5);
            // Pulse rings with sine wave
            const pulse = Math.sin(time * 3 + i * 0.8) * 6;
            const radius = (i * 38) + pulse + 40;
            
            // Golden circular strokes (simulating lens fresnel)
            lensCtx.arc(256, 256, radius, 0, Math.PI * 2);
            
            // Vary ring brightness
            const alpha = 0.35 + (Math.sin(time * 2 + i) * 0.15);
            lensCtx.strokeStyle = `rgba(199, 125, 17, ${alpha})`;
            lensCtx.stroke();
        }

        // Add soft light flash reflection in upper-right
        const reflGrad = lensCtx.createRadialGradient(380, 132, 0, 380, 132, 100);
        reflGrad.addColorStop(0, 'rgba(255, 230, 180, 0.45)');
        reflGrad.addColorStop(0.5, 'rgba(199, 125, 17, 0.1)');
        reflGrad.addColorStop(1, 'rgba(0,0,0,0)');
        lensCtx.fillStyle = reflGrad;
        lensCtx.beginPath();
        lensCtx.arc(380, 132, 100, 0, Math.PI * 2);
        lensCtx.fill();
    }

    // Canvas drawing for the "TEERTHA" golden engraving on top of the stone gate
    function createTeerthaEngraving() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Transparent base
        ctx.fillRect(0, 0, 1024, 256);
        
        // Draw elegant engraved gold lettering
        ctx.font = "bold 96px 'Cinzel', 'Times New Roman', serif";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Text Shadow for depth
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
        
        // Gold fill
        ctx.fillStyle = '#E8D5A3';
        ctx.fillText('TEEऋTHA', 512, 128);
        
        // Gold outline
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 2;
        ctx.strokeText('TEEऋTHA', 512, 128);
        
        return new THREE.CanvasTexture(canvas);
    }

    // Canvas drawing for the custom Namaste VR Logo on the temple wooden doors
    function createNamasteVRLogo() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, 512, 512);
        
        // Golden color for logo outline
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 14;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        // Glow effect
        ctx.shadowColor = 'rgba(199, 125, 17, 0.6)';
        ctx.shadowBlur = 15;
        
        // VR headset outline
        ctx.beginPath();
        // Headset visor rounded rect
        if (ctx.roundRect) {
            ctx.roundRect(110, 160, 292, 110, 24);
        } else {
            ctx.rect(110, 160, 292, 110);
        }
        ctx.stroke();
        
        // Visor side straps
        ctx.beginPath();
        ctx.moveTo(110, 215);
        ctx.lineTo(70, 215);
        ctx.moveTo(402, 215);
        ctx.lineTo(442, 215);
        ctx.stroke();
        
        // Visor center details (Namaste praying hands)
        ctx.fillStyle = '#D4AF37';
        ctx.shadowBlur = 10;
        
        // Left praying hand (Namaste)
        ctx.beginPath();
        ctx.moveTo(235, 390);
        ctx.quadraticCurveTo(210, 310, 248, 230); // Hand curve
        ctx.lineTo(256, 230);
        ctx.lineTo(256, 390);
        ctx.closePath();
        ctx.fill();
        
        // Right praying hand (Namaste)
        ctx.beginPath();
        ctx.moveTo(277, 390);
        ctx.quadraticCurveTo(302, 310, 264, 230);
        ctx.lineTo(256, 230);
        ctx.lineTo(256, 390);
        ctx.closePath();
        ctx.fill();
        
        return new THREE.CanvasTexture(canvas);
    }

    // Set up the Three.js 3D environment
    function init3D() {
        // Scene & Fog
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0c0704);
        scene.fog = new THREE.FogExp2(0x0c0704, 0.045);

        // Camera
        camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        // Start looking right at the VR lens close-up
        camera.position.set(0, 0, 5);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        clock = new THREE.Clock();

        // 1. LIGHTS
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
        scene.add(ambientLight);

        // Portal Light (in front of VR headset lens)
        const portalLight = new THREE.PointLight(0xffb044, 2, 8);
        portalLight.position.set(0, 0, 4.3);
        scene.add(portalLight);

        // Sanctum Divine Sun Light (inside the temple)
        const divineSun = new THREE.SpotLight(0xffddaa, 10, 80, Math.PI / 4, 0.5, 1);
        divineSun.position.set(0, 12, -45); // Centered, shining down towards temple gate
        divineSun.target.position.set(0, 0, -28);
        divineSun.castShadow = true;
        divineSun.shadow.mapSize.width = 1024;
        divineSun.shadow.mapSize.height = 1024;
        scene.add(divineSun);
        scene.add(divineSun.target);

        // Gate Front Light (Sunset / Golden glow on stone facade)
        const gateLight = new THREE.DirectionalLight(0xffaa44, 2.8);
        gateLight.position.set(4, 10, -8); // In front of the gate, slightly right and up
        gateLight.target.position.set(0, 1.8, -22); // Pointing at the gate center
        scene.add(gateLight);
        scene.add(gateLight.target);

        // 2. VR HEADSET & LENS MODEL
        vrHeadset = new THREE.Group();
        
        // Headset fallback shell (curved visor geometry - visible while GLB loads)
        const shellGeo = new THREE.BoxGeometry(4.5, 2.4, 1.2);
        const shellMat = new THREE.MeshStandardMaterial({
            color: 0x151515,
            roughness: 0.6,
            metalness: 0.2
        });
        const shell = new THREE.Mesh(shellGeo, shellMat);
        shell.position.z = 3.9;
        vrHeadset.add(shell);

        // Load Meta Quest 3 3D GLB Model
        const gltfLoader = new THREE.GLTFLoader();
        gltfLoader.load('meta-quest-3/source/Quest3.glb', function (gltf) {
            const model = gltf.scene;
            
            // Normalize scale and rotation of the loaded model
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            
            // Center the model geometry
            model.position.set(-center.x, -center.y, -center.z);
            
            const modelWrapper = new THREE.Group();
            modelWrapper.add(model);
            
            // Scale the wrapper to fit expected width (~4.5 units)
            const scaleFactor = 4.5 / size.x;
            modelWrapper.scale.setScalar(scaleFactor);
            
            // Position at back of headset
            modelWrapper.position.set(0, 0, 3.9);
            
            // Rotate 180 degrees (Math.PI) to face inside eyepieces to the camera
            modelWrapper.rotation.y = Math.PI;
            
            // Swap placeholder shell with the premium GLB model
            vrHeadset.remove(shell);
            vrHeadset.add(modelWrapper);
            console.log("Meta Quest 3 3D model loaded successfully!");
        }, undefined, function (error) {
            console.error("Error loading Meta Quest 3 GLB:", error);
        });

        // Left & Right Eyepiece Lens Rims (aligned to Quest 3 IPD)
        const rimGeo = new THREE.TorusGeometry(0.85, 0.05, 16, 64);
        const rimMat = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.3, metalness: 0.8 });
        
        const rimL = new THREE.Mesh(rimGeo, rimMat);
        rimL.position.set(-0.75, 0, 4.1);
        const rimR = new THREE.Mesh(rimGeo, rimMat);
        rimR.position.set(0.75, 0, 4.1);
        vrHeadset.add(rimL, rimR);

        // Glowing concentric lens mesh (left eye is primary transition point)
        updateLensCanvas(0);
        const lensTex = new THREE.CanvasTexture(lensCanvas);
        const lensMat = new THREE.MeshBasicMaterial({
            map: lensTex,
            transparent: true,
            opacity: 0.95
        });

        const lensGeo = new THREE.PlaneGeometry(1.6, 1.6);
        
        lensLeft = new THREE.Mesh(lensGeo, lensMat);
        lensLeft.position.set(-0.75, 0, 4.12);
        
        // Simple glossy flat black for right lens to focus on the left
        const darkLensGeo = new THREE.PlaneGeometry(1.6, 1.6);
        const darkLensMat = new THREE.MeshStandardMaterial({ color: 0x050403, roughness: 0.1 });
        lensRight = new THREE.Mesh(darkLensGeo, darkLensMat);
        lensRight.position.set(0.75, 0, 4.12);
        
        vrHeadset.add(lensLeft, lensRight);
        scene.add(vrHeadset);

        // 3. CONCENTRIC TRANSITION RINGS (THE PORTAL TUNNEL)
        // Set up 15 concentric rings of golden light to fly through
        const tunnelGroup = new THREE.Group();
        const ringLightGeo = new THREE.TorusGeometry(0.85, 0.02, 8, 48);
        const ringLightMat = new THREE.MeshBasicMaterial({ color: 0xc77d11, transparent: true, opacity: 0.7 });
        
        for (let i = 0; i < 15; i++) {
            const ring = new THREE.Mesh(ringLightGeo, ringLightMat);
            // Position them going deep along the Z axis, aligned to the left eye
            ring.position.set(-0.75, 0, 3.8 - (i * 0.9));
            // Slight scale increase as you go deeper
            ring.scale.setScalar(1 + (i * 0.08));
            tunnelGroup.add(ring);
            tunnelRings.push(ring);
        }
        scene.add(tunnelGroup);

        // 4. ANCIENT TEMPLE STONE GATEWAY
        gate = new THREE.Group();
        gate.position.set(0, -1, -22); // Placed at z = -22

        // Pillars/Frames (Monolithic sandstone look)
        const stoneMat = new THREE.MeshStandardMaterial({
            color: 0x483e33,
            roughness: 0.95,
            metalness: 0.05
        });

        // Bases
        const baseGeo = new THREE.BoxGeometry(2, 0.8, 2);
        const baseL = new THREE.Mesh(baseGeo, stoneMat);
        baseL.position.set(-4, -2.1, 0);
        baseL.receiveShadow = true;
        const baseR = new THREE.Mesh(baseGeo, stoneMat);
        baseR.position.set(4, -2.1, 0);
        baseR.receiveShadow = true;
        gate.add(baseL, baseR);

        // Left Pillar
        const pillarGeo = new THREE.BoxGeometry(1.4, 7, 1.4);
        const pillarL = new THREE.Mesh(pillarGeo, stoneMat);
        pillarL.position.set(-4, 1.8, 0);
        pillarL.castShadow = true;
        pillarL.receiveShadow = true;
        
        // Right Pillar
        const pillarR = new THREE.Mesh(pillarGeo, stoneMat);
        pillarR.position.set(4, 1.8, 0);
        pillarR.castShadow = true;
        pillarR.receiveShadow = true;
        gate.add(pillarL, pillarR);

        // Header beam (lintel)
        const lintelGeo = new THREE.BoxGeometry(9.4, 1.8, 1.8);
        const lintel = new THREE.Mesh(lintelGeo, stoneMat);
        lintel.position.set(0, 5.8, 0);
        lintel.castShadow = true;
        lintel.receiveShadow = true;
        gate.add(lintel);

        // Lintel Engraving Plaque ("TEERTHA")
        const plaqueGeo = new THREE.PlaneGeometry(8, 1.4);
        const plaqueMat = new THREE.MeshStandardMaterial({
            map: createTeerthaEngraving(),
            transparent: true,
            roughness: 0.4,
            metalness: 0.6
        });
        const plaque = new THREE.Mesh(plaqueGeo, plaqueMat);
        plaque.position.set(0, 5.8, 0.91); // Sticking slightly out of front of beam
        gate.add(plaque);

        // Wooden Door Pivots (for rotation from left/right sides)
        const doorWoodMat = new THREE.MeshStandardMaterial({
            color: 0x2b1e15,
            roughness: 0.85,
            metalness: 0.1
        });
        const doorOverlayMat = new THREE.MeshBasicMaterial({
            map: createNamasteVRLogo(),
            transparent: true
        });

        // Left Door Group (Pivot at x = -3.3)
        const pivotL = new THREE.Group();
        pivotL.position.set(-3.3, 1.8, 0);
        
        const doorLMesh = new THREE.Mesh(new THREE.BoxGeometry(3.3, 7, 0.4), doorWoodMat);
        doorLMesh.position.set(1.65, 0, 0); // Offset mesh relative to pivot
        doorLMesh.castShadow = true;
        doorLMesh.receiveShadow = true;
        pivotL.add(doorLMesh);
        
        // Door Left Logo Overlay
        const logoLPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), doorOverlayMat);
        logoLPlane.position.set(1.65, 0.5, 0.22);
        pivotL.add(logoLPlane);

        // Right Door Group (Pivot at x = 3.3)
        const pivotR = new THREE.Group();
        pivotR.position.set(3.3, 1.8, 0);

        const doorRMesh = new THREE.Mesh(new THREE.BoxGeometry(3.3, 7, 0.4), doorWoodMat);
        doorRMesh.position.set(-1.65, 0, 0);
        doorRMesh.castShadow = true;
        doorRMesh.receiveShadow = true;
        pivotR.add(doorRMesh);

        // Door Right Logo Overlay
        const logoRPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), doorOverlayMat);
        logoRPlane.position.set(-1.65, 0.5, 0.22);
        pivotR.add(logoRPlane);

        doorPivots.push(pivotL, pivotR);
        doors.push(doorLMesh, doorRMesh);
        gate.add(pivotL, pivotR);

        // Stone steps
        const stepMat = new THREE.MeshStandardMaterial({ color: 0x362d25, roughness: 0.95 });
        const step1 = new THREE.Mesh(new THREE.BoxGeometry(9, 0.4, 4), stepMat);
        step1.position.set(0, -2.7, 1);
        step1.receiveShadow = true;
        
        const step2 = new THREE.Mesh(new THREE.BoxGeometry(9, 0.4, 2.5), stepMat);
        step2.position.set(0, -2.3, 0.25);
        step2.receiveShadow = true;
        gate.add(step1, step2);

        scene.add(gate);

        // 5. INNER TEMPLE SANCTUM (Revealed inside door)
        // Sanctum stone flooring and back wall
        const floorGeo = new THREE.PlaneGeometry(16, 20);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0x1f1a14, roughness: 0.8 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(0, -3.5, -30);
        floor.receiveShadow = true;
        scene.add(floor);

        // Back Wall of Sanctum
        const wallGeo = new THREE.BoxGeometry(16, 12, 1);
        const wall = new THREE.Mesh(wallGeo, stoneMat);
        wall.position.set(0, 2.5, -38);
        wall.receiveShadow = true;
        scene.add(wall);

        // Side Pillars inside Sanctum
        const innerPillarGeo = new THREE.CylinderGeometry(0.5, 0.6, 10, 8);
        const pillarInnerL = new THREE.Mesh(innerPillarGeo, stoneMat);
        pillarInnerL.position.set(-3.5, 1.5, -29);
        pillarInnerL.castShadow = true;
        pillarInnerL.receiveShadow = true;
        
        const pillarInnerR = new THREE.Mesh(innerPillarGeo, stoneMat);
        pillarInnerR.position.set(3.5, 1.5, -29);
        pillarInnerR.castShadow = true;
        pillarInnerR.receiveShadow = true;
        scene.add(pillarInnerL, pillarInnerR);

        // 6. SACRED DECORATED IDOL (Centered at wall)
        idol = new THREE.Group();
        idol.position.set(0, -1, -34);

        // Stepped base
        const idolBaseGeo = new THREE.CylinderGeometry(1.6, 2, 0.8, 24);
        const idolBaseMat = new THREE.MeshStandardMaterial({ color: 0x15120e, roughness: 0.9 });
        const idolBase = new THREE.Mesh(idolBaseGeo, idolBaseMat);
        idolBase.position.y = -1.6;
        idolBase.receiveShadow = true;
        idol.add(idolBase);

        // Lotus seat pedestal
        const lotusPedGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.4, 24);
        const lotusPedMat = new THREE.MeshStandardMaterial({ color: 0xd47d37, roughness: 0.5, metalness: 0.2 });
        const lotusPed = new THREE.Mesh(lotusPedGeo, lotusPedMat);
        lotusPed.position.y = -1.0;
        idol.add(lotusPed);

        // Idol body (stylized Krishna statue in brass/bronze)
        const metalStatueMat = new THREE.MeshStandardMaterial({
            color: 0xc89830, // Brass
            roughness: 0.35,
            metalness: 0.85
        });

        // Feet/Lower body
        const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 2, 16), metalStatueMat);
        legs.position.y = 0.2;
        legs.castShadow = true;
        
        // Torso
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.4, 1.8, 16), metalStatueMat);
        torso.position.y = 2.1;
        torso.castShadow = true;
        
        // Head
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32), metalStatueMat);
        head.position.y = 3.3;
        head.castShadow = true;

        // Crown (Mukut)
        const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.4, 0.9, 16), metalStatueMat);
        crown.position.y = 4.0;
        crown.castShadow = true;

        // Flute
        const fluteGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 12);
        const flute = new THREE.Mesh(fluteGeo, metalStatueMat);
        flute.rotation.z = Math.PI / 5;
        flute.rotation.x = Math.PI / 8;
        flute.position.set(0.2, 2.6, 0.6);
        flute.castShadow = true;

        idol.add(legs, torso, head, crown, flute);

        // Garlands (strings of flowers)
        const garlandGroup = new THREE.Group();
        const flowerGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const orangeFlowerMat = new THREE.MeshStandardMaterial({ color: 0xffaa00, roughness: 0.8 });
        const whiteFlowerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
        
        for (let i = 0; i < 28; i++) {
            const flower = new THREE.Mesh(flowerGeo, (i % 2 === 0) ? orangeFlowerMat : whiteFlowerMat);
            // Circle drape around chest
            const angle = (i / 28) * Math.PI * 2;
            const x = Math.sin(angle) * 0.7;
            const y = 2.4 + Math.cos(angle) * 0.7;
            const z = 0.5 - Math.sin(angle) * 0.2;
            flower.position.set(x, y, z);
            garlandGroup.add(flower);
        }
        idol.add(garlandGroup);

        // Glowing Divine Halo behind head
        const haloGeo = new THREE.RingGeometry(0.6, 1.4, 32);
        const haloMat = new THREE.MeshBasicMaterial({
            color: 0xffddaa,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.95
        });
        halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.set(0, 3.3, -0.4);
        idol.add(halo);

        // Point Light embedded inside the Idol Halo
        const haloLight = new THREE.PointLight(0xffaa44, 4, 15);
        haloLight.position.set(0, 3.3, 0.5);
        idol.add(haloLight);

        scene.add(idol);

        // 7. VOLUME METRIC LIGHT SHAFTS (God Rays spilling out)
        const rayGeo = new THREE.CylinderGeometry(0.1, 4, 40, 16, 1, true);
        const rayMat = new THREE.MeshBasicMaterial({
            color: 0xffd59a,
            transparent: true,
            opacity: 0.06,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        for (let i = 0; i < 5; i++) {
            const ray = new THREE.Mesh(rayGeo, rayMat);
            // Pointing out from the sanctum through the door
            ray.position.set(-1.5 + (i * 0.75), 4, -30);
            ray.rotation.x = Math.PI / 2.2 + (Math.random() - 0.5) * 0.1;
            ray.rotation.z = (Math.random() - 0.5) * 0.2;
            scene.add(ray);
            lightRays.push(ray);
        }

        // 8. BRONZE TEMPLE BELL (Hanging on the right in sanctum)
        bell = new THREE.Group();
        bell.position.set(2.0, 2.5, -28.0); // Right side, slightly in front of idol

        const bellMat = new THREE.MeshStandardMaterial({
            color: 0xcd853f, // Bronze
            roughness: 0.25,
            metalness: 0.9
        });

        // Bell Dome Structure
        const bellDome = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.6, 1.2, 16), bellMat);
        bellDome.castShadow = true;
        bellDome.receiveShadow = true;
        bell.add(bellDome);

        // Flared bottom lip
        const bellLip = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 0.25, 16), bellMat);
        bellLip.position.y = -0.6;
        bellLip.castShadow = true;
        bell.add(bellLip);

        // Hanger top loop
        const bellLoop = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.05, 8, 16), bellMat);
        bellLoop.position.y = 0.65;
        bell.add(bellLoop);

        // Bell Clapper (striker inside)
        bellClapper = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), bellMat);
        bellClapper.position.y = -0.85;
        bell.add(bellClapper);

        // Chain (rod representing it)
        const chainGeo = new THREE.CylinderGeometry(0.04, 0.04, 6, 8);
        const chainMat = new THREE.MeshStandardMaterial({ color: 0x483e33, metalness: 0.9, roughness: 0.5 });
        bellChain = new THREE.Mesh(chainGeo, chainMat);
        bellChain.position.set(2.0, 5.8, -28.0); // Reaches top of frame
        scene.add(bellChain);

        // Parent the bell to a pivot group at the hanging point so it swings correctly
        const bellPivot = new THREE.Group();
        bellPivot.position.set(2.0, 5.5, -28.0); // Top of the chain rod
        bell.position.set(0, -3.0, 0); // Bell is offset 3 units down from pivot
        bellPivot.add(bell);
        scene.add(bellPivot);
        
        // Re-assign bell reference to the pivot for swing animations
        bell = bellPivot; 

        // 9. DIYA LAMPS (Hanging Oil Lamps in Sanctum)
        const diyaBaseGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
        const diyaBaseMat = new THREE.MeshStandardMaterial({ color: 0xa0522d, roughness: 0.4, metalness: 0.7 });
        const flameGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });

        for (let i = 0; i < 4; i++) {
            const diyaGroup = new THREE.Group();
            
            const diya = new THREE.Mesh(diyaBaseGeo, diyaBaseMat);
            diyaGroup.add(diya);
            
            const flame = new THREE.Mesh(flameGeo, flameMat);
            flame.position.y = 0.15;
            diyaGroup.add(flame);

            const flameLight = new THREE.PointLight(0xff7700, 1.2, 5);
            flameLight.position.y = 0.3;
            diyaGroup.add(flameLight);

            // Hanging chains for diyas
            const diyaChain = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 6, 8), chainMat);
            diyaChain.position.y = 3;
            diyaGroup.add(diyaChain);

            // Positions: two on left wall, two on right
            const x = (i % 2 === 0) ? -3.0 : 3.0;
            const z = (i < 2) ? -28 : -34;
            diyaGroup.position.set(x, -1.5, z);
            scene.add(diyaGroup);
            diyas.push({ group: diyaGroup, flame: flame, light: flameLight, seed: Math.random() * 100 });
        }

        // 10. FLOATING SACRED PARTICLES (Gold dust/embers)
        const particleGeo = new THREE.BufferGeometry();
        const particlePos = [];
        for (let i = 0; i < 2500; i++) {
            // Distribute along the tunnel and sanctum
            particlePos.push(
                (Math.random() - 0.5) * 24, // width
                (Math.random() - 0.5) * 12 + 1, // height
                (Math.random() * 45) - 38 // z range: -38 to +7
            );
        }
        particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePos, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xffb74d,
            size: 0.06,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });
        particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Pulsing VR Lens
        updateLensCanvas(time);
        lensLeft.material.map.needsUpdate = true;

        if (isRunning && progress < 1.0) {
            timelineTime += delta;
            progress = timelineTime / duration;
            if (progress > 1.0) progress = 1.0;

            // CINEMATIC STORYBOARD TIMELINE
            
            // Phase 1: Close-up VR Lens (progress 0.0 to 0.15)
            // Camera starts at (0, 0, 5) looking at left lens eyepiece at (-0.75, 0, 4.12)
            if (progress < 0.15) {
                const p = progress / 0.15;
                // Move camera closer to the left lens
                camera.position.x = THREE.MathUtils.lerp(0, -0.75, p);
                camera.position.y = 0;
                camera.position.z = THREE.MathUtils.lerp(5, 4.25, p);
                
                // Keep looking down the lens
                camera.lookAt(-0.75, 0, -20);
            } 
            // Phase 2: Enter Lens & Warp through Concentric Rings (progress 0.15 to 0.35)
            else if (progress < 0.35) {
                const p = (progress - 0.15) / 0.20;
                
                // Fly through the lens glass and down the rings tunnel
                camera.position.x = -0.75;
                camera.position.y = 0;
                camera.position.z = THREE.MathUtils.lerp(4.25, -5.0, p);
                
                camera.lookAt(-0.75, 0, -20);
                
                // Fade out lens visibility as we cross it
                vrHeadset.position.z = 0; // head behind
                lensLeft.material.opacity = Math.max(0, 1 - p * 2);
            } 
            // Phase 3: Transition & Emerge towards Temple Gate (progress 0.35 to 0.55)
            else if (progress < 0.55) {
                const p = (progress - 0.35) / 0.20;
                
                // Transition camera from left lens axis (-0.75) to central gate axis (0)
                camera.position.x = THREE.MathUtils.lerp(-0.75, 0, p);
                // Slowly rise to human eye level (around 0)
                camera.position.y = THREE.MathUtils.lerp(0, -0.2, p);
                camera.position.z = THREE.MathUtils.lerp(-5.0, -14.5, p);
                
                camera.lookAt(0, 1.8, -22); // Look at gate center/doors
            } 
            // Phase 4: Doors Swing Open & Divine Light Revelations (progress 0.55 to 0.75)
            else if (progress < 0.75) {
                const p = (progress - 0.55) / 0.20;
                
                // Slow down approach slightly while gates open
                camera.position.x = 0;
                camera.position.y = -0.2;
                camera.position.z = THREE.MathUtils.lerp(-14.5, -18.0, p);
                camera.lookAt(0, 1.6, -34); // Looking into sanctum

                // Rotate doors outward (open)
                doorPivots[0].rotation.y = -p * Math.PI / 1.7; // Left door open CCW
                doorPivots[1].rotation.y = p * Math.PI / 1.7;  // Right door open CW
            } 
            // Phase 5: Move into Sanctum towards Idol (progress 0.75 to 1.0)
            else {
                const p = (progress - 0.75) / 0.25;
                
                // Fly through the open gates and head straight towards the idol
                camera.position.x = 0;
                camera.position.y = THREE.MathUtils.lerp(-0.2, 0.4, p); // Move slightly upward
                camera.position.z = THREE.MathUtils.lerp(-18.0, -29.0, p);
                
                camera.lookAt(0, 1.8, -34); // Face idol chest/face
                
                // Swing the bell as camera gets close (starts around progress 0.80)
                if (progress > 0.80 && progress < 0.98) {
                    const swingP = (progress - 0.80) / 0.18;
                    // Pendulum swing angle
                    bell.rotation.z = Math.sin(swingP * Math.PI * 3.5) * 0.25 * (1 - swingP);
                    bell.rotation.x = Math.cos(swingP * Math.PI * 3.5) * 0.1 * (1 - swingP);
                }

                // Trigger Bell sound once!
                if (progress > 0.88 && !bellTriggered) {
                    playBell();
                    bellTriggered = true;
                }
            }
        }

        // --- AMBIENT CONTINUOUS ANIMATION (Even when idle or complete) ---
        
        // Gentle rotation of the Divine Halo
        if (halo) {
            halo.rotation.z += 0.006;
        }

        // Float particle motion (gently upwards and drifting)
        if (particles) {
            const positions = particles.geometry.attributes.position.array;
            const len = positions.length;
            for (let i = 0; i < len; i += 3) {
                positions[i + 1] += 0.012; // Move up (Y)
                positions[i] += Math.sin(time * 0.8 + i) * 0.003; // Drift drift (X)
                
                // Reset particles that drift too high
                if (positions[i + 1] > 10) {
                    positions[i + 1] = -5;
                }
            }
            positions.needsUpdate = true; // For newer Three.js versions
            particles.geometry.attributes.position.needsUpdate = true;
        }

        // Flickering diya lamps (sine wobble)
        diyas.forEach(diya => {
            const flicker = Math.sin(time * 15 + diya.seed) * 0.08 + Math.cos(time * 7) * 0.04;
            diya.flame.scale.set(1 + flicker, 1.2 + flicker, 1 + flicker);
            diya.light.intensity = 1.2 + flicker * 0.5;
        });

        // Pulsing light rays
        lightRays.forEach((ray, idx) => {
            ray.material.opacity = 0.04 + Math.sin(time * 1.5 + idx) * 0.02;
        });

        // Render scene
        renderer.render(scene, camera);
        
        // Check if finished
        if (isRunning && progress === 1.0 && animationStarted) {
            animationStarted = false;
            showEndScreen();
        }
    }

    // Window resize handler
    window.addEventListener('resize', () => {
        if (!camera || !renderer) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // Start Cinematic Walkthrough
    function startExperience() {
        initAudio();
        
        body.classList.add('experience-active');
        muteBtn.style.opacity = '1';
        muteBtn.style.pointerEvents = 'auto';

        // Fade out overlay UI
        uiOverlay.style.opacity = '0';
        setTimeout(() => {
            uiOverlay.style.display = 'none';
        }, 1500);

        // Start Three.js animation
        isRunning = true;
        animationStarted = true;
        progress = 0;
        timelineTime = 0;
        bellTriggered = false;
    }

    // Show completion screen
    function showEndScreen() {
        endOverlay.style.pointerEvents = 'auto';
        endOverlay.style.opacity = '1';
    }

    // Reset and replay the animation
    function replayExperience() {
        endOverlay.style.pointerEvents = 'none';
        endOverlay.style.opacity = '0';
        
        // Reset 3D positions
        camera.position.set(0, 0, 5);
        camera.lookAt(-0.75, 0, -20);
        
        lensLeft.material.opacity = 0.95;
        doorPivots[0].rotation.y = 0;
        doorPivots[1].rotation.y = 0;
        bell.rotation.set(0, 0, 0);

        progress = 0;
        timelineTime = 0;
        bellTriggered = false;
        isRunning = true;
        animationStarted = true;
    }

    // Initialize 3D Engine
    init3D();
    animate();
    
    // Wire up events
    startBtn.addEventListener('click', startExperience);
    replayBtn.addEventListener('click', replayExperience);
    
    // Mute/Unmute
    muteBtn.addEventListener('click', () => {
        soundMuted = !soundMuted;
        if (soundMuted) {
            muteBtn.innerHTML = '<i class="bi bi-volume-mute-fill fs-4"></i>';
            muteBtn.style.backgroundColor = 'rgba(232, 74, 74, 0.2)';
        } else {
            muteBtn.innerHTML = '<i class="bi bi-volume-up-fill fs-4"></i>';
            muteBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
});
</script>

<?php include 'includes/footer.php'; ?>
