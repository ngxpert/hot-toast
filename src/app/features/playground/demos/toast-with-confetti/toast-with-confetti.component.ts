import { HttpClient } from '@angular/common/http';
import { afterNextRender, Component, inject, signal, AfterViewInit, ElementRef } from '@angular/core';
import { HotToastRef, HotToastService } from '@ngxpert/hot-toast';
import confetti, { Options } from 'canvas-confetti';

interface DataType {
  starCount: number;
}

@Component({
  selector: 'app-toast-with-confetti',
  template: `<button
    (click)="showToast()"
    class="rounded-lg font-bold gap-4 flex bg-gradient-to-b from-toast-50 to-toast-200 shadow-button text-center py-4 px-6 active:translate-y-0.5 active:shadow-button-active active:bg-gray-100 transform focus:outline-none focus:ring-4"
  >
    Show Toast
  </button> `,
})
export class ToastWithConfettiComponent {
  private toast = inject(HotToastService);
  private http = inject(HttpClient);
  starCount = signal(0);

  constructor() {
    afterNextRender(() => {
      this.http.get('https://api.github.com/repos/ngxpert/hot-toast').subscribe({
        next: (res) => {
          this.starCount.set((res as unknown as { stargazers_count: number }).stargazers_count);
        },
      });
    });
  }

  showToast() {
    this.toast.show<DataType>(ToastWithConfettiTemplateComponent, {
      data: {
        starCount: this.starCount(),
      },
      icon: '⭐',
    });
  }
}

@Component({
  selector: 'app-toast-with-confetti-template',
  template: '{{ toastRef.data.starCount }} Stars on GitHub!',
})
export class ToastWithConfettiTemplateComponent implements AfterViewInit {
  toastRef = inject(HotToastRef<DataType>);
  private elementRef = inject(ElementRef);

  ngAfterViewInit() {
    setTimeout(() => {
      const element = this.elementRef.nativeElement as HTMLElement;
      const { x, y, width, height } = element.getBoundingClientRect();
      const origin = { x: (x + width / 2) / window.innerWidth, y: (y + height / 2) / window.innerHeight };
      this.realisticConfetti({
        origin,
        angle: 180,
      });
      this.realisticConfetti({
        origin,
        angle: 0,
      });
      this.realisticConfetti({
        origin,
        angle: 270,
      });
      this.realisticConfetti({
        origin,
        angle: 90,
      });
    }, 230);
  }

  realisticConfetti(options: Options) {
    const count = 200;

    function fire(particleRatio: number, opts: Options) {
      confetti({
        ...options,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }
}
