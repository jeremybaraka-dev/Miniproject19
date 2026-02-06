import React, { useEffect, useRef } from 'react';

const FooterParticles = ({ isMobile = false }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement; // Get the footer container
        let animationFrameId;
        let particles = [];

        // Google Brand Colors: Blue, Red, Yellow, Green
        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

        const mouse = { x: -1000, y: -1000 };

        const handleResize = () => {
            // Use container dimensions, fallback to window if needed
            if (container) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            initParticles();
        };

        const handleMouseMove = (e) => {
            // Adjust mouse coordinates relative to canvas
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
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
                this.friction = 0.92;
                this.ease = 0.05;
            }

            update() {
                // Mouse Interaction (Repel)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDistance = 300;
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
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = isMobile ? 25 : 80; // Drastically reduced for mobile
            const spacing = isMobile ? 100 : 60; // Increased spacing on mobile
            const cols = Math.floor(canvas.width / spacing);
            const rows = Math.floor(canvas.height / spacing);

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
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
        window.addEventListener('mousemove', handleMouseMove); // Attach to window for smooth drag out? Or canvas? Container?
        // Canvas is better for local coords, but window mousemove is usually safer for drag.
        // But here I need relative coords. I'll rely on the rect calculation in handleMouseMove.

        // Initial setup
        setTimeout(handleResize, 100); // Delay slightly to ensure container has size
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
                zIndex: 0, // Behind content
                pointerEvents: 'none', // Allow clicks to pass through to links
                background: 'transparent'
            }}
        />
    );
};

export default FooterParticles;
