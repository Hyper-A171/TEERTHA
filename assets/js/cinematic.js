(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var root = document.getElementById('cinematic-container');
        if (!root) return;

        document.body.classList.add('cinematic-mode');

        var scenes = Array.prototype.slice.call(root.querySelectorAll('.cinematic-scene'));
        var markers = Array.prototype.slice.call(root.querySelectorAll('.journey-marker'));
        var progressFill = root.querySelector('.journey-progress-fill');
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var canAnimate = window.gsap && window.ScrollTrigger && scenes.length > 1 && !prefersReducedMotion;
        var lenis = null;
        var atmosphere = createAtmosphere(root, prefersReducedMotion);
        var videoScrubber = createVideoScrubber(root.querySelector('.cinematic-video'));
        var activeScene = -1;

        if (!canAnimate) {
            document.body.classList.add('cinematic-reduced');
            scenes.forEach(function (scene) {
                scene.classList.add('is-active');
                scene.removeAttribute('aria-hidden');
            });
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        if (window.Lenis) {
            lenis = new Lenis({
                duration: 1.28,
                easing: function (t) {
                    return Math.min(1, 1.001 - Math.pow(2, -10 * t));
                },
                smoothWheel: true,
                smoothTouch: true,
                wheelMultiplier: 0.78,
                touchMultiplier: 1.12,
                gestureOrientation: 'vertical'
            });

            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add(function (time) {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }

        setupInitialStates(scenes);

        var timeline = buildCinematicTimeline(root, scenes);
        var scrollTrigger = ScrollTrigger.create({
            animation: timeline,
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.08,
            invalidateOnRefresh: true,
            snap: {
                snapTo: 1 / (scenes.length - 1),
                duration: { min: 0.55, max: 1.18 },
                delay: 0.1,
                ease: 'power3.inOut'
            },
            onUpdate: function (self) {
                var progress = self.progress;
                setProgress(progress);
                setActiveScene(progress);
                atmosphere.update(progress);
                videoScrubber.update(progress);
            }
        });

        bindSceneJumps(root, scenes, lenis);
        setActiveScene(0);

        window.addEventListener('resize', debounce(function () {
            atmosphere.resize();
            ScrollTrigger.refresh();
        }, 160));

        window.addEventListener('beforeunload', function () {
            scrollTrigger.kill();
            atmosphere.destroy();
            if (lenis && lenis.destroy) lenis.destroy();
        });

        function setProgress(progress) {
            if (progressFill) {
                progressFill.style.transform = 'scaleY(' + progress.toFixed(4) + ')';
            }
        }

        function setActiveScene(progress) {
            var index = Math.round(progress * (scenes.length - 1));
            index = Math.max(0, Math.min(scenes.length - 1, index));
            if (index === activeScene) return;

            activeScene = index;
            scenes.forEach(function (scene, sceneIndex) {
                var isActive = sceneIndex === index;
                scene.classList.toggle('is-active', isActive);
                scene.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            });

            markers.forEach(function (marker, markerIndex) {
                marker.classList.toggle('is-active', markerIndex === index);
                marker.setAttribute('aria-current', markerIndex === index ? 'step' : 'false');
            });

            setAmbientTone(root, index);
        }
    });

    function setupInitialStates(scenes) {
        gsap.set(scenes, {
            autoAlpha: 0,
            z: -780,
            scale: 0.76,
            rotateX: 5,
            rotateY: 0,
            filter: 'blur(28px)',
            transformOrigin: '50% 50%',
            transformPerspective: 1200,
            force3D: true
        });

        gsap.set(scenes[0], {
            autoAlpha: 1,
            z: 0,
            scale: 1,
            rotateX: 0,
            filter: 'blur(0px)'
        });

        scenes.forEach(function (scene) {
            gsap.set(scene.querySelectorAll('.scene-copy, .scene-visual, .keeper-seal'), {
                force3D: true,
                transformPerspective: 1000
            });
        });
    }

    function buildCinematicTimeline(root, scenes) {
        var lastIndex = scenes.length - 1;
        var timeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
        var godRays = root.querySelector('.god-rays');
        var lightWash = root.querySelector('.light-wash');
        var lensFlare = root.querySelector('.lens-flare');
        var video = root.querySelector('.cinematic-video');

        scenes.forEach(function (scene, index) {
            var copy = scene.querySelector('.scene-copy');
            var visual = scene.querySelector('.scene-visual') || scene.querySelector('.keeper-seal');
            var fragments = scene.querySelectorAll('.ritual-fragment, .keeper-list span, .experience-tags span');
            var direction = index % 2 === 0 ? 1 : -1;
            var enterStart = Math.max(0, index - 0.54);

            if (index > 0) {
                timeline.fromTo(scene, {
                    autoAlpha: 0,
                    z: -820,
                    scale: 0.74,
                    rotateX: 6,
                    rotateY: direction * 8,
                    filter: 'blur(30px)'
                }, {
                    autoAlpha: 1,
                    z: 0,
                    scale: 1,
                    rotateX: 0,
                    rotateY: 0,
                    filter: 'blur(0px)',
                    duration: 0.54
                }, enterStart);

                if (copy) {
                    timeline.fromTo(copy, {
                        y: 42,
                        z: -140,
                        autoAlpha: 0,
                        filter: 'blur(12px)'
                    }, {
                        y: 0,
                        z: 0,
                        autoAlpha: 1,
                        filter: 'blur(0px)',
                        duration: 0.46
                    }, enterStart + 0.08);
                }

                if (visual) {
                    timeline.fromTo(visual, {
                        y: 32,
                        z: -260,
                        rotateY: -direction * 10,
                        autoAlpha: 0.18,
                        filter: 'blur(18px)'
                    }, {
                        y: 0,
                        z: 0,
                        rotateY: 0,
                        autoAlpha: 1,
                        filter: 'blur(0px)',
                        duration: 0.58
                    }, enterStart + 0.02);
                }

                if (fragments.length) {
                    timeline.fromTo(fragments, {
                        y: 34,
                        z: -160,
                        autoAlpha: 0,
                        filter: 'blur(8px)'
                    }, {
                        y: 0,
                        z: 0,
                        autoAlpha: 1,
                        filter: 'blur(0px)',
                        duration: 0.38,
                        stagger: 0.045
                    }, enterStart + 0.12);
                }
            }

            if (index < lastIndex) {
                var exitStart = index + 0.2;
                timeline.to(scene, {
                    autoAlpha: 0,
                    z: 630,
                    scale: 1.18,
                    rotateX: -4,
                    rotateY: -direction * 5,
                    filter: 'blur(24px)',
                    duration: 0.44
                }, exitStart);

                if (copy) {
                    timeline.to(copy, {
                        y: -36,
                        z: 180,
                        filter: 'blur(10px)',
                        duration: 0.44
                    }, exitStart);
                }

                if (visual) {
                    timeline.to(visual, {
                        z: 320,
                        rotateY: direction * 8,
                        filter: 'blur(16px)',
                        duration: 0.44
                    }, exitStart);
                }
            }
        });

        timeline.to(root.querySelector('.panel-left'), {
            rotateY: -58,
            xPercent: -4,
            duration: 1.2,
            ease: 'power2.inOut'
        }, 0.08);

        timeline.to(root.querySelector('.panel-right'), {
            rotateY: 58,
            xPercent: 4,
            duration: 1.2,
            ease: 'power2.inOut'
        }, 0.08);

        timeline.to(root.querySelector('.door-light'), {
            opacity: 1,
            scaleX: 1.85,
            duration: 1.05,
            ease: 'power2.inOut'
        }, 0.1);

        if (video) {
            timeline.to(video, {
                opacity: 0.42,
                scale: 1.14,
                filter: 'brightness(0.88) contrast(1.18) saturate(0.94)',
                duration: 1.2,
                ease: 'power2.inOut'
            }, 0.0);

            timeline.to(video, {
                opacity: 0.18,
                scale: 1.24,
                filter: 'brightness(0.62) contrast(1.1) saturate(0.78)',
                duration: 2.2,
                ease: 'none'
            }, 1.25);
        }

        if (godRays) {
            timeline.to(godRays, {
                rotate: 18,
                xPercent: -18,
                yPercent: 8,
                opacity: 0.42,
                duration: lastIndex,
                ease: 'none'
            }, 0);
        }

        if (lightWash) {
            timeline.to(lightWash, {
                scale: 1.18,
                xPercent: -8,
                yPercent: 5,
                opacity: 0.72,
                duration: lastIndex,
                ease: 'none'
            }, 0);
        }

        if (lensFlare) {
            timeline.to(lensFlare, {
                xPercent: -28,
                opacity: 0.32,
                duration: lastIndex,
                ease: 'none'
            }, 0);
        }

        timeline.to({}, { duration: 0.001 }, lastIndex);
        return timeline;
    }

    function bindSceneJumps(root, scenes, lenis) {
        var controls = Array.prototype.slice.call(root.querySelectorAll('[data-cinematic-scene]'));
        controls.forEach(function (control) {
            control.addEventListener('click', function (event) {
                var index = parseInt(control.getAttribute('data-cinematic-scene'), 10);
                if (Number.isNaN(index)) return;

                event.preventDefault();
                event.stopImmediatePropagation();

                index = Math.max(0, Math.min(scenes.length - 1, index));
                var scrollRange = Math.max(1, root.offsetHeight - window.innerHeight);
                var target = root.offsetTop + scrollRange * (index / (scenes.length - 1));

                if (lenis && lenis.scrollTo) {
                    lenis.scrollTo(target, {
                        duration: 1.35,
                        easing: function (t) {
                            return 1 - Math.pow(1 - t, 3);
                        }
                    });
                } else {
                    window.scrollTo({ top: target, behavior: 'smooth' });
                }
            });
        });
    }

    function setAmbientTone(root, index) {
        var tones = [
            { wash: 'rgba(216, 170, 74, 0.25)', glow: 'rgba(216, 170, 74, 0.34)' },
            { wash: 'rgba(240, 207, 131, 0.28)', glow: 'rgba(240, 207, 131, 0.38)' },
            { wash: 'rgba(94, 184, 165, 0.18)', glow: 'rgba(94, 184, 165, 0.28)' },
            { wash: 'rgba(185, 173, 152, 0.2)', glow: 'rgba(240, 207, 131, 0.24)' },
            { wash: 'rgba(142, 61, 70, 0.18)', glow: 'rgba(216, 170, 74, 0.3)' },
            { wash: 'rgba(216, 170, 74, 0.22)', glow: 'rgba(94, 184, 165, 0.22)' }
        ];
        var tone = tones[index] || tones[0];

        gsap.to(root, {
            '--scene-wash': tone.wash,
            '--cinema-glow': tone.glow,
            duration: 0.85,
            ease: 'power2.out'
        });
    }

    function createVideoScrubber(video) {
        var duration = 0;
        var ready = false;
        var lastTime = -1;

        if (!video) {
            return { update: noop };
        }

        video.muted = true;
        video.playsInline = true;

        video.addEventListener('loadedmetadata', function () {
            duration = Number.isFinite(video.duration) ? video.duration : 0;
            ready = duration > 0;
            video.pause();
            setVideoTime(0);
        });

        video.addEventListener('canplay', function () {
            duration = Number.isFinite(video.duration) ? video.duration : duration;
            ready = duration > 0;
        });

        var playAttempt = video.play();
        if (playAttempt && playAttempt.then) {
            playAttempt.then(function () {
                video.pause();
            }).catch(noop);
        }

        return {
            update: function (progress) {
                if (!ready) return;
                var revealProgress = Math.min(1, progress / 0.34);
                var eased = revealProgress * revealProgress * (3 - 2 * revealProgress);
                setVideoTime(eased * duration);
            }
        };

        function setVideoTime(time) {
            if (Math.abs(time - lastTime) < 0.035) return;
            lastTime = time;
            try {
                video.currentTime = Math.max(0, Math.min(duration || 0, time));
            } catch (error) {
                ready = false;
            }
        }
    }

    function createAtmosphere(root, reducedMotion) {
        var canvas = root.querySelector('#webgl-canvas');
        if (!canvas || !window.THREE || reducedMotion) {
            return { update: noop, resize: noop, destroy: noop };
        }

        var THREE = window.THREE;
        var renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 180);
        var clock = new THREE.Clock();
        var state = { progress: 0 };
        var animationFrame = 0;
        var particleCount = window.innerWidth < 768 ? 900 : 1700;

        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2));
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

        scene.fog = new THREE.FogExp2(0x050504, 0.025);
        camera.position.set(0, 0, 24);

        var dustGeometry = new THREE.BufferGeometry();
        var positions = new Float32Array(particleCount * 3);
        var colors = new Float32Array(particleCount * 3);
        var colorA = new THREE.Color(0xf0cf83);
        var colorB = new THREE.Color(0x5eb8a5);
        var colorC = new THREE.Color(0x8e3d46);

        for (var i = 0; i < particleCount; i++) {
            var i3 = i * 3;
            var depth = Math.random();
            positions[i3] = (Math.random() - 0.5) * 70;
            positions[i3 + 1] = (Math.random() - 0.5) * 42;
            positions[i3 + 2] = -Math.random() * 86 + 18;

            var color = depth < 0.72 ? colorA : (depth < 0.9 ? colorB : colorC);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        dustGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        dustGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        var dustMaterial = new THREE.PointsMaterial({
            size: window.innerWidth < 768 ? 0.08 : 0.105,
            vertexColors: true,
            transparent: true,
            opacity: 0.62,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        var dust = new THREE.Points(dustGeometry, dustMaterial);
        scene.add(dust);

        var ringGroup = new THREE.Group();
        var ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xf0cf83,
            transparent: true,
            opacity: 0.12,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        for (var ringIndex = 0; ringIndex < 5; ringIndex++) {
            var torus = new THREE.Mesh(
                new THREE.TorusGeometry(4.8 + ringIndex * 1.9, 0.01, 8, 112),
                ringMaterial
            );
            torus.position.z = -12 - ringIndex * 3.2;
            torus.rotation.x = Math.PI / 2 + ringIndex * 0.08;
            torus.rotation.z = ringIndex * 0.45;
            ringGroup.add(torus);
        }
        scene.add(ringGroup);

        var rayGroup = new THREE.Group();
        var rayMaterial = new THREE.MeshBasicMaterial({
            color: 0xf0cf83,
            transparent: true,
            opacity: 0.065,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        for (var rayIndex = 0; rayIndex < 7; rayIndex++) {
            var ray = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 42), rayMaterial);
            ray.position.set(-9 + rayIndex * 3, 3.5, -14 - rayIndex * 1.1);
            ray.rotation.z = -0.42 + rayIndex * 0.08;
            ray.rotation.x = 0.28;
            rayGroup.add(ray);
        }
        scene.add(rayGroup);

        var ambientLight = new THREE.AmbientLight(0xf7e7c3, 0.45);
        var pointLight = new THREE.PointLight(0xf0cf83, 1.2, 90);
        pointLight.position.set(0, 2.8, 10);
        scene.add(ambientLight);
        scene.add(pointLight);

        render();

        return {
            update: function (progress) {
                state.progress = progress;
                dustMaterial.opacity = 0.46 + Math.sin(progress * Math.PI * 5) * 0.08 + 0.08;
                ringMaterial.opacity = 0.08 + progress * 0.07;
                rayMaterial.opacity = 0.045 + Math.sin(progress * Math.PI * 3) * 0.02 + 0.025;
                pointLight.intensity = 0.95 + Math.sin(progress * Math.PI * 6) * 0.22;
            },
            resize: resize,
            destroy: destroy
        };

        function render() {
            animationFrame = requestAnimationFrame(render);
            var elapsed = clock.getElapsedTime();
            var progress = state.progress;

            dust.rotation.y = progress * Math.PI * 1.6 + elapsed * 0.018;
            dust.rotation.x = Math.sin(elapsed * 0.12) * 0.045 + progress * 0.14;
            dust.position.z = progress * 12;
            dust.position.y = Math.sin(elapsed * 0.18) * 0.28;

            ringGroup.rotation.z = progress * Math.PI * 1.35 + elapsed * 0.018;
            ringGroup.rotation.x = Math.PI / 12 + progress * 0.22;
            rayGroup.rotation.z = Math.sin(elapsed * 0.1) * 0.035 + progress * 0.16;
            rayGroup.position.x = Math.sin(progress * Math.PI * 2) * 1.4;

            camera.position.x = Math.sin(progress * Math.PI * 2.1) * 1.45;
            camera.position.y = Math.sin(progress * Math.PI * 1.35) * 0.72;
            camera.position.z = 24 - progress * 10.5;
            camera.rotation.z = Math.sin(progress * Math.PI * 4) * 0.018;
            camera.lookAt(0, 0, -8);

            renderer.render(scene, camera);
        }

        function resize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2));
            renderer.setSize(window.innerWidth, window.innerHeight, false);
        }

        function destroy() {
            cancelAnimationFrame(animationFrame);
            dustGeometry.dispose();
            dustMaterial.dispose();
            ringMaterial.dispose();
            rayMaterial.dispose();
            renderer.dispose();
        }
    }

    function debounce(callback, wait) {
        var timeoutId;
        return function () {
            var args = arguments;
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(function () {
                callback.apply(null, args);
            }, wait);
        };
    }

    function noop() {}
})();
