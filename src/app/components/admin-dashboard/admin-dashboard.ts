import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../feedback';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
  standalone: false,
})
export class AdminDashboardComponent implements OnInit {
  feedbackList: any[] = [];
  currentYear = new Date().getFullYear();
  isLoading = true;
  errorMessage = '';

  constructor(private feedbackService: FeedbackService, private route: Router) { }

  ngOnInit(): void {
    this.initStars();
    this.loadFeedback();
  }

  initStars(): void {
    const canvas = document.getElementById('ad-stars') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = Array.from({ length: 180 }, () => ({
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

  getAvg(field: string): string {
    if (!this.feedbackList.length) return '0';
    const sum = this.feedbackList.reduce((a, fb) => a + (fb[field] || 0), 0);
    return (sum / this.feedbackList.length).toFixed(1);
  }

  loadFeedback(): void {
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => { this.feedbackList = data; this.isLoading = false; },
      error: () => { this.errorMessage = 'Failed to load feedback.'; this.isLoading = false; }
    });
  }

  deleteFeedback(id: number): void {
    if (confirm('Delete this feedback?')) {
      this.feedbackService.deleteFeedback(id).subscribe({
        next: () => { this.feedbackList = this.feedbackList.filter(fb => fb.id !== id); },
        error: () => alert('Error deleting feedback.')
      });
    }
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}