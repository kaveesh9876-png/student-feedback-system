import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  loginType: string | null = null;
  username = '';
  password = '';
  currentYear = new Date().getFullYear();

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.initStars();
    this.initParticles();
  }

  initStars(): void {
    const canvas = document.getElementById('lfs-stars') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.002
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.twinkle += s.speed;
        const o = 0.25 + 0.75 * ((Math.sin(s.twinkle) + 1) / 2);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${o})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    draw();
  }

  initParticles(): void {
    const container = document.getElementById('lfs-ptcls');
    if (!container) return;
    const colors = ['rgba(59,130,246,0.7)', 'rgba(139,92,246,0.7)', 'rgba(6,182,212,0.6)', 'rgba(255,255,255,0.35)'];
    setInterval(() => {
      const p = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const dur = Math.random() * 8 + 6;
      p.style.cssText = `position:absolute;border-radius:50%;width:${size}px;height:${size}px;left:${Math.random() * 100}%;bottom:0;background:${colors[Math.floor(Math.random() * colors.length)]};animation:lfsPFloat ${dur}s linear forwards;`;
      container.appendChild(p);
      setTimeout(() => p.remove(), (dur + 2) * 1000);
    }, 500);
  }

  login() {
    if (this.loginType === 'Student') {
      // Student uses email field (username variable stores email input)
      this.authService.login(this.username, this.password).subscribe({
        next: (res) => {
          localStorage.setItem('student', JSON.stringify(res));
          this.route.navigate(['feedback']);
        },
        error: () => alert('Student login failed'),
      });
    } else if (this.loginType === 'Admin') {
      this.authService.adminLogin(this.username, this.password).subscribe({
        next: (res) => {
          localStorage.setItem('admin', JSON.stringify(res));
          this.route.navigate(['admin']);
        },
        error: () => alert('Admin login failed'),
      });
    }
  }
}