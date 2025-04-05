'use client';
import { useEffect, useRef } from 'react';

function LeafCursor() {
  const canvasRef = useRef(null);
  const leavesRef = useRef([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const repellingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    class Leaf {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10 + Math.random() * 15;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.baseSpeed = 0.2 + Math.random() * 0.3;
        this.opacity = 0.6 + Math.random() * 0.4;
        this.color = `hsl(${90 + Math.random() * 40}, ${50 + Math.random() * 30}%, ${50 + Math.random() * 30}%)`;
        this.driftX = (Math.random() - 0.5) * 0.5;
        this.driftY = (Math.random() - 0.5) * 0.5;
        this.repulsionForce = 0;
        this.repulsionAngle = 0;
      }

      update(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const repulsionStrength = Math.min(1, (100 - distance) / 50);
          this.repulsionForce = repulsionStrength * 2;
          this.repulsionAngle = Math.atan2(dy, dx) + Math.PI;
          repellingRef.current = true;
        } else {
          this.repulsionForce *= 0.9;
          repellingRef.current = false;
        }

        const moveX = this.driftX + Math.cos(this.repulsionAngle) * this.repulsionForce;
        const moveY = this.driftY + Math.sin(this.repulsionAngle) * this.repulsionForce;
        
        this.x += moveX;
        this.y += moveY;
        this.angle += this.rotationSpeed;

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          this.size * 0.5, -this.size * 0.3,
          this.size * 0.3, this.size * 0.5,
          0, this.size
        );
        ctx.bezierCurveTo(
          -this.size * 0.3, this.size * 0.5,
          -this.size * 0.5, -this.size * 0.3,
          0, 0
        );
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.size);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }
    }

    function initLeaves() {
      leavesRef.current = [];
      const count = 150;
      const gridSize = Math.ceil(Math.sqrt(count));
      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;
      
      for (let i = 0; i < count; i++) {
        const gridX = i % gridSize;
        const gridY = Math.floor(i / gridSize);
        
        const x = (gridX + 0.5 + (Math.random() - 0.5) * 0.8) * cellWidth;
        const y = (gridY + 0.5 + (Math.random() - 0.5) * 0.8) * cellHeight;
        
        leavesRef.current.push(new Leaf(x, y));
      }
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLeaves();
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      leavesRef.current.forEach(leaf => {
        leaf.update(mousePosRef.current.x, mousePosRef.current.y);
        leaf.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    }

    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[-1] pointer-events-none w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="w-screen h-screen block"
      />
    </div>
  );
}

export default LeafCursor;