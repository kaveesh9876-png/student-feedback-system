import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../feedback';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-form',
  standalone: false,
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.scss'
})
export class FeedbackForm implements OnInit {
  isSubmitted = false;
  hoverStars: any = {};

  feedback = {
    courseName: '', teacherName: '',
    courseRating: '', courseComment: '',
    teacherRating: '', teacherComment: '',
    classRoomRating: '', classRoomComment: '',
    otherRating: '', otherComment: ''
  };

  courseList = ['Mathematics', 'Java', 'Physics', 'C++', 'English'];
  teacherList = ['Prof. Sharma', 'Dr. Mehta', 'Mr. Kumar', 'Ms. Rani'];

  constructor(private feedbackSystem: FeedbackService, private route: Router) { }

  ngOnInit() {
    this.initStars();
    this.initParticles();
  }

  hoverRating(type: string, val: number) {
    this.hoverStars[type] = val;
  }

  initStars(): void {
    const canvas = document.getElementById('fb-stars') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.005 + 0.002
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.twinkle += s.speed;
        const o = 0.2 + 0.7 * ((Math.sin(s.twinkle) + 1) / 2);
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
    const container = document.getElementById('fb-ptcls');
    if (!container) return;
    const colors = ['rgba(59,130,246,0.6)', 'rgba(139,92,246,0.6)', 'rgba(6,182,212,0.5)'];
    setInterval(() => {
      const p = document.createElement('div');
      const size = Math.random() * 3 + 2;
      const dur = Math.random() * 8 + 6;
      p.style.cssText = `position:absolute;border-radius:50%;width:${size}px;height:${size}px;left:${Math.random() * 100}%;bottom:0;background:${colors[Math.floor(Math.random() * colors.length)]};animation:lfsPFloat ${dur}s linear forwards;`;
      container.appendChild(p);
      setTimeout(() => p.remove(), (dur + 2) * 1000);
    }, 600);
  }

  // ✅ FIXED: studentId dynamic + correct field names
  submitFeedback() {
    const studentId = localStorage.getItem('userId');

    const payload = {
      courseName: this.feedback.courseName,
      courseRating: +this.feedback.courseRating,
      courseComment: this.feedback.courseComment,
      teacherName: this.feedback.teacherName,
      teacherRating: +this.feedback.teacherRating,
      teacherComment: this.feedback.teacherComment,
      classRating: +this.feedback.classRoomRating,
      classComment: this.feedback.classRoomComment,
      otherRating: +this.feedback.otherRating,
      otherFeedback: this.feedback.otherComment,
      studentId: studentId
    };

    this.feedbackSystem.submitFeedback(payload).subscribe({
      next: () => {
        this.isSubmitted = true;
      },
      error: (err) => {
        console.error('Feedback submit error:', err);
        alert('Failed to submit feedback. Please try again.');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}