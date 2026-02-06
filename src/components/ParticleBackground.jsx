import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Google Brand Colors: Blue, Red, Yellow, Green
        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

        const mouse = { x: -1000, y: -1000 };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight; // Full page height
            initParticles();
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY + window.scrollY; // Account for scroll
        };

        class Particle {
            constructor(x, y, color) {
                this.originX = x;
                this.originY = y;
                this.x = x;
                this.y = y;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 2 + 1; // 1 to 3px
                this.color = color;
                this.friction = 0.92; // Slide a bit more
                this.ease = 0.05; // Return slower
            }

            update() {
                // Mouse Interaction (Repel)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDistance = 300; // Larger interaction radius
                const force = (forceDistance - distance) / forceDistance;

                if (distance < forceDistance) {
                    const angle = Math.atan2(dy, dx);
                    const pushX = Math.cos(angle) * force * 20;
                    const pushY = Math.sin(angle) * force * 20;
                    this.vx -= pushX;
                    this.vy -= pushY;
                }

                // Return to origin (spring)
                this.vx += (this.originX - this.x) * this.ease;
                this.vy += (this.originY - this.y) * this.ease;

                // Friction
                this.vx *= this.friction;
                this.vy *= this.friction;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                // Check if particle is in hero section (first 100vh) or interaction section
                const viewportHeight = window.innerHeight;
                const scrollY = window.scrollY;
                const particleViewportY = this.y - scrollY;

                // Hide particles in hero section (0 to 100vh)
                if (this.y < viewportHeight) {
                    return;
                }

                // Hide particles in interaction section (approximate position)
                // You may need to adjust these values based on actual section positions
                const interactionSectionStart = viewportHeight * 3.5; // Approximate
                const interactionSectionEnd = viewportHeight * 4.5;

                if (this.y >= interactionSectionStart && this.y <= interactionSectionEnd) {
                    return;
                }

                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];

            // Create particles for the entire page height
            const numParticles = 800;
            const centerX = canvas.width / 2;
            const pageHeight = canvas.height;
            const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;

            for (let i = 0; i < numParticles; i++) {
                // Distribute particles across the page height
                const sectionY = Math.random() * pageHeight;
                const radius = Math.sqrt(Math.random()) * maxRadius * 0.5;
                const angle = Math.random() * Math.PI * 2;

                const swirl = radius * 0.002;

                const x = centerX + Math.cos(angle + swirl) * radius;
                const y = sectionY + Math.sin(angle + swirl) * radius * 0.3;

                const color = colors[Math.floor(Math.random() * colors.length)];
                particles.push(new Particle(x, y, color));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = window.requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                background: 'transparent'
            }}
        />
    );
};

export default ParticleBackground;
