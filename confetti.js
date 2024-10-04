// confetti.js
function ConfettiGenerator(options) {
    this.canvas = document.getElementById(options.target);
    this.context = this.canvas.getContext('2d');
    this.colors = options.colors || ['#ff0', '#0f0', '#f00', '#00f', '#ff00', '#00ff', '#ff00ff'];
    this.particles = [];
    this.startTime = null;

    // Initialize canvas size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.start = function() {
        this.startTime = Date.now();
        requestAnimationFrame(this.animate.bind(this));
    };

    this.animate = function() {
        const now = Date.now();
        const elapsed = now - this.startTime;

        if (elapsed < options.maxDuration) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.createParticles();
            this.updateParticles();
            this.drawParticles();
            requestAnimationFrame(this.animate.bind(this));
        } else {
            this.clear();
        }
    };

    this.createParticles = function() {
        const particleCount = 100; // Adjust particle count as needed
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width / 2, this.canvas.height, this.colors));
        }
    };

    this.updateParticles = function() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            if (p.y < 0) {
                this.particles.splice(i, 1);
            }
        }
    };

    this.drawParticles = function() {
        this.particles.forEach(p => p.draw(this.context));
    };

    this.clear = function() {
        this.particles = [];
    };

    this.start();
}

function Particle(x, y, colors) {
    this.x = x;
    this.y = y;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.size = Math.random() * 5 + 2;
    this.speedY = Math.random() * -4 - 2; // Start speed
    this.speedX = Math.random() * 4 - 2;

    this.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.1; // Gravity effect
    };

    this.draw = function(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    };
}
