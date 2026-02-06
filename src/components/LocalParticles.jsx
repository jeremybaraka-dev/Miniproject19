import React, { useEffect, useRef } from 'react';

const LocalParticles = ({ density = 150 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Google Brand Colors: Blue, Red, Yellow, Green
        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

        const mouse = { x: -1000, y: -1000 };

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            initParticles();
        };

        const handleMouseMove = (e) => {
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
                this.size = Math.random() * 2 + 1;
                this.color = color;
                this.friction = 0.92;
                this.ease = 0.05;
            }

            update() {
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

                this.vx += (this.originX - this.x) * this.ease;
                this.vy += (this.originY - this.y) * this.ease;

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
            const numParticles = density;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;

            for (let i = 0; i < numParticles; i++) {
                const radius = Math.sqrt(Math.random()) * maxRadius;
                const angle = Math.random() * Math.PI * 2;
                const swirl = radius * 0.002;

                const x = centerX + Math.cos(angle + swirl) * radius;
                const y = centerY + Math.sin(angle + swirl) * radius * 0.8;

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
        canvas.addEventListener('mousemove', handleMouseMove);

        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [density]);

    if (density <= 0) return null;

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
                pointerEvents: 'none'
            }}
        />
    );
};

export default LocalParticles;
