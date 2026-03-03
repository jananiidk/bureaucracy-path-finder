import { useEffect, useRef } from 'react';

export default function NetworkBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        let particles = [];
        // Increased maxParticles significantly to make it very undeniably "live"
        const maxParticles = window.innerWidth > 768 ? 200 : 100;

        const mouse = {
            x: null,
            y: null,
            radius: 200 // Increased interaction radius
        };

        const handleMouseMove = (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        // Use a variable to handle resizing correctly
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('resize', handleResize);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 3 + 1.5; // Bigger particles
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = Math.random() * 40 + 5;
                // Faster movement so it's obviously animated
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = (Math.random() - 0.5) * 1.5;

                // Random blue/purple colors for premium look
                const colors = ['#60a5fa', '#3b82f6', '#818cf8', '#c084fc', '#2dd4bf'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.speedX *= -1;
                if (this.y < 0 || this.y > height) this.speedY *= -1;

                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    // Push away from mouse
                    if (distance < mouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle());
            }
        }

        function connect() {
            let opacityValue = 1;
            // Shorter distance requirement, but increased connection logic
            const maxDistance = (canvas.width / 10) * (canvas.height / 10);

            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance =
                        (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
                        (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y);

                    if (distance < maxDistance) {
                        opacityValue = 1 - distance / maxDistance;
                        ctx.strokeStyle = `rgba(129, 140, 248, ${opacityValue * 0.5})`; // Indigo with opacity
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        let animationFrameId;
        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            // Add a slight trailing effect by not clearing completely
            ctx.fillStyle = 'rgba(10, 14, 26, 0.8)';
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connect();
        }

        init();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.3 }} // lowered opacity
        />
    );
}
