<div id="loading-screen">
    <!-- 3D Animation Background Placeholder -->
    <div class="cinematic-bg">
        <canvas id="shader-canvas-ANIMATION_1" style="display:block;width:100%;height:100%" width="1280" height="1024"></canvas>
        <script>
            (function () {
                const canvas = document.getElementById('shader-canvas-ANIMATION_1');
                const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                let resizeObserver = null;
                let animationFrame = null;
                let running = false;

                function syncSize() {
                    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
                    const w = Math.round((canvas.clientWidth || 1280) * pixelRatio);
                    const h = Math.round((canvas.clientHeight || 720) * pixelRatio);
                    if (canvas.width !== w || canvas.height !== h) {
                        canvas.width = w;
                        canvas.height = h;
                    }
                }
                if (typeof ResizeObserver !== 'undefined') {
                    resizeObserver = new ResizeObserver(syncSize);
                    resizeObserver.observe(canvas);
                }
                syncSize();

                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (!gl) return;
                const vs = `attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }`;
                const fs = `precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;

    void main() {
        vec2 uv = v_texCoord;
        
        vec3 color1 = vec3(1.0, 0.37, 0.0);
        vec3 color2 = vec3(1.0, 0.48, 0.0);
        vec3 color3 = vec3(1.0, 0.58, 0.0);
        vec3 color4 = vec3(1.0, 0.42, 0.0);
        
        float noise1 = sin(uv.x * 3.0 + u_time * 0.5) * cos(uv.y * 2.0 + u_time * 0.3);
        float noise2 = sin(uv.y * 4.0 - u_time * 0.4) * cos(uv.x * 3.0 + u_time * 0.2);
        
        vec3 finalColor = mix(color1, color2, uv.x + noise1 * 0.2);
        finalColor = mix(finalColor, color3, uv.y + noise2 * 0.2);
        finalColor = mix(finalColor, color4, noise1 * noise2);
        
        finalColor = mix(finalColor, vec3(1.0), 0.85);
        
        gl_FragColor = vec4(finalColor, 1.0);
    }`;
                function cs(type, src) {
                    const s = gl.createShader(type);
                    gl.shaderSource(s, src);
                    gl.compileShader(s);
                    return s;
                }
                const prog = gl.createProgram();
                gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
                gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
                gl.linkProgram(prog);
                gl.useProgram(prog);
                const buf = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, buf);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
                const pos = gl.getAttribLocation(prog, 'a_position');
                gl.enableVertexAttribArray(pos);
                gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
                const uTime = gl.getUniformLocation(prog, 'u_time');
                const uRes = gl.getUniformLocation(prog, 'u_resolution');

                function draw(t) {
                    if (typeof ResizeObserver === 'undefined') syncSize();
                    gl.viewport(0, 0, canvas.width, canvas.height);
                    if (uTime) gl.uniform1f(uTime, t * 0.001);
                    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
                    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                }

                function render(t) {
                    if (!running) return;
                    draw(t);
                    animationFrame = requestAnimationFrame(render);
                }

                function start() {
                    if (running || reduceMotion) return;
                    running = true;
                    animationFrame = requestAnimationFrame(render);
                }

                function stop() {
                    running = false;
                    if (animationFrame !== null) {
                        cancelAnimationFrame(animationFrame);
                        animationFrame = null;
                    }
                }

                function destroy() {
                    stop();
                    if (resizeObserver) resizeObserver.disconnect();
                    document.removeEventListener('visibilitychange', handleVisibility);
                }

                function handleVisibility() {
                    if (document.hidden) {
                        stop();
                    } else {
                        start();
                    }
                }

                document.addEventListener('visibilitychange', handleVisibility);
                document.addEventListener('loader:complete', destroy, { once: true });

                if (reduceMotion) {
                    draw(0);
                } else {
                    start();
                }
            })();
        </script>
    </div>

    <!-- Main Loading Content -->
    <div id="loading-content" class="overlay-content">
        <!-- Logo Section -->
        <div class="loader-logo-container">
            <img alt="TEERTHA Logo" class="loader-logo" src="assets/images/teertha-loader-logo.png" />
            <div class="loader-text-container">
                <div class="loader-text-sanskrit">धर्मो रक्षति रक्षितः</div>
                <div class="loader-text-english">Dharma protects those who protect it</div>
            </div>
        </div>

        <div class="loader-dots" aria-hidden="true">
            <span class="loader-dot"></span>
            <span class="loader-dot"></span>
            <span class="loader-dot"></span>
            <span class="loader-dot"></span>
            <span class="loader-dot"></span>
            <span class="loader-dot"></span>
            <span class="loader-dot"></span>
        </div>
    </div>
</div>
<script>
    // Loading Screen logic
    (function () {
        let progress = 0;
        let progressInterval;

        const fillProgress = () => {
            if (progress < 100) {
                progress += Math.random() * 8.0 + 6.0;
                if (progress > 100) progress = 100;

                if (progress < 100) {
                    progressInterval = setTimeout(fillProgress, 20 + Math.random() * 30);
                } else {
                    setTimeout(completeLoading, 500);
                }
            }
        };

        // Complete Loading Transition
        let loadingCompleted = false;
        window.completeLoading = function () {
            if (loadingCompleted) return;
            loadingCompleted = true;

            // Clear any active progress interval
            clearTimeout(progressInterval);

            const loadingContent = document.getElementById('loading-content');
            if (loadingContent) {
                loadingContent.classList.add('is-exiting');
            }

            const loader = document.getElementById('loading-screen');
            setTimeout(() => {
                if (loader) {
                    loader.classList.add('is-exiting');
                }
            }, 160);

            setTimeout(() => {
                const heroContent = document.getElementById('hero-content');
                if (heroContent) {
                    heroContent.classList.add('visible');
                }
            }, 280);

            document.body.classList.remove('loading-active');

            setTimeout(() => {
                if (loader) {
                    loader.style.display = 'none';
                }
                document.dispatchEvent(new Event('loader:complete'));
            }, 1050);
        }

        // Start initialization
        document.body.classList.add('loading-active');
        setTimeout(fillProgress, 300);
    })();
</script>
