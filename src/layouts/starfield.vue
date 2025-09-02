<template>
    <div class="starfield-container">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// A ref to hold the canvas element from the template
const canvasRef = ref<HTMLCanvasElement | null>(null);

// --- Configuration ---
const numStars = 3;
const numTwinkleStars = 4;
const maxStarSize = 34;
const starRotationSpeed = 0.004;
const minStarDistance = 100;

// --- Type Definitions for our star objects ---
// Using interfaces to define the shape of our star objects
interface StarObject {
    x: number;
    y: number;
    life: number;
    maxLife: number;
    reset: () => void;
    update: () => void;
    draw: (ctx: CanvasRenderingContext2D) => void;
}

// --- Main logic runs after the component is mounted to the DOM ---
onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Could not get 2D rendering context!");
        return;
    }

    // --- Set Canvas Size ---
    const pixel7Width = 412;
    const pixel7Height = 915;
    canvas.width = pixel7Width;
    canvas.height = pixel7Height;

    // --- Star Collections ---
    const stars: StarObject[] = [];
    const twinkleStars: StarObject[] = [];
    const allStars: StarObject[] = [...stars, ...twinkleStars];

    // --- Helper function for distance checking ---
    function isPositionValid(x: number, y: number, self: StarObject): boolean {
        for (const other of allStars) {
            if (other === self) { continue; }
            const dx = x - other.x;
            const dy = y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const requiredDistance = (other instanceof Star) ? minStarDistance : 50;
            if (distance < requiredDistance) {
                return false;
            }
        }
        return true;
    }

    // --- Star Class ---
    class Star implements StarObject {
        x = 0;
        y = 0;
        life = 0;
        maxLife = 0;
        rotation = 0;

        constructor() {
            this.reset();
        }

        reset() {
            let newX: number, newY: number;
            if(canvas === null) {return;}
            do {
                newX = Math.random() * canvas.width;
                newY = Math.random() * canvas.height;
            } while (!isPositionValid(newX, newY, this));

            this.x = newX;
            this.y = newY;
            this.life = 0;
            this.maxLife = Math.random() * 500 + 300;
            this.rotation = Math.random() * Math.PI * 2;
        }

        update() {
            this.life++;
            this.rotation += starRotationSpeed;
            if (this.life >= this.maxLife) {
                this.reset();
            }
        }

        draw(ctx: CanvasRenderingContext2D) {
            const progress = this.life / this.maxLife;
            const currentOpacity = Math.sin(progress * Math.PI);
            const currentSize = maxStarSize * progress;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            ctx.moveTo(
                Math.cos(18 / 180 * Math.PI) * currentSize,
                -Math.sin(18 / 180 * Math.PI) * currentSize
            );
            for (let i = 0; i < 5; i++) {
                ctx.lineTo(
                    Math.cos((54 + i * 72) / 180 * Math.PI) * (currentSize / 2.5),
                    -Math.sin((54 + i * 72) / 180 * Math.PI) * (currentSize / 2.5)
                );
                ctx.lineTo(
                    Math.cos((18 + (i + 1) * 72) / 180 * Math.PI) * currentSize,
                    -Math.sin((18 + (i + 1) * 72) / 180 * Math.PI) * currentSize
                );
            }
            ctx.closePath();
            // ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity})`;
            ctx.strokeStyle = `rgba(255, 97, 175, ${currentOpacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }
    }

    // --- TwinkleStar Class ---
    class TwinkleStar implements StarObject {
        x = 0;
        y = 0;
        life = 0;
        maxLife = 0;
        maxRadius = 0;

        constructor() {
            this.reset();
        }

        reset() {
            if(canvas === null) {return;}

            let newX: number, newY: number;
            do {
                newX = Math.random() * canvas.width;
                newY = Math.random() * canvas.height;
            } while (!isPositionValid(newX, newY, this));

            this.x = newX;
            this.y = newY;
            this.life = 0;
            this.maxLife = Math.random() * 120 + 90;
            this.maxRadius = Math.random() * 8 + 6;
        }

        update() {
            this.life++;
            if (this.life >= this.maxLife) {
                this.reset();
            }
        }

        draw(ctx: CanvasRenderingContext2D) {
            const progress = this.life / this.maxLife;
            const baseOpacity = Math.sin(progress * Math.PI);

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = `rgba(255, 255, 255, ${baseOpacity})`;
            const baseWidth = 3;

            for (let i = 0; i < 8; i++) {
                const isDiagonal = i % 2 !== 0;
                const currentRadius = isDiagonal ? this.maxRadius / 2 : this.maxRadius;
                const angle = (i / 8) * (2 * Math.PI);
                const perpAngle = angle + Math.PI / 2;
                const endX = Math.cos(angle) * currentRadius;
                const endY = Math.sin(angle) * currentRadius;
                const base1X = Math.cos(perpAngle) * (baseWidth / 2);
                const base1Y = Math.sin(perpAngle) * (baseWidth / 2);
                const base2X = -base1X;
                const base2Y = -base1Y;

                ctx.beginPath();
                ctx.moveTo(base1X, base1Y);
                ctx.lineTo(endX, endY);
                ctx.lineTo(base2X, base2Y);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // --- Initialization ---
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
    for (let i = 0; i < numTwinkleStars; i++) {
        twinkleStars.push(new TwinkleStar());
    }
    // Make sure allStars array is populated for the distance check
    allStars.push(...stars, ...twinkleStars);


    // --- Animation Loop ---
    function animate() {
            if(canvas === null) {return;}
            if(ctx === null) {return;}

        // Clear the canvas for the next frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw all stars
        allStars.forEach(star => {
            star.update();
            star.draw(ctx);
        });

        // Request the next frame
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
});
</script>

<style scoped>
/* A container to simulate the centered phone look */
.starfield-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

}

/* Styles for the canvas element itself */
canvas {
    display: block;
    border-radius: 20px;
}
</style>
