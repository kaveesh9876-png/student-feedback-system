import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  user = { name: '', email: '' };

  ngOnInit() {
    const storedUser = JSON.parse(localStorage.getItem('student') || '{}');
    this.user.name = storedUser.name || 'Student';
    this.user.email = storedUser.email || '';
    this.initStars();
  }

  initStars(): void {
    const canvas = document.getElementById('pr-stars') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.2, twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.005 + 0.002
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.twinkle += s.speed;
        const o = 0.2 + 0.7 * ((Math.sin(s.twinkle) + 1) / 2);
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${o})`; ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    draw();
  }
}