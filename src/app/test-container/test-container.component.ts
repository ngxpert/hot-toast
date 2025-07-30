import { Component, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-test-container',
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Test Container Token</h1>
      <div id="custom-toast-container" class="border-2 border-blue-500 p-4 mb-4 min-h-[100px]">
        <h2 class="text-lg font-semibold">Custom Toast Container</h2>
        <p class="text-sm text-gray-600">Toast container should appear here when the button is clicked</p>
      </div>

      <button
        id="test-custom-container"
        (click)="showToast()"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Show Toast in Custom Container
      </button>

      <div class="mt-8">
        <h2 class="text-lg font-semibold mb-2">Expected Behavior:</h2>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li>Toast container should be appended to the blue bordered div above</li>
          <li>Toast container should NOT appear in document.body</li>
        </ul>
      </div>
    </div>
  `,
})
export class TestContainerComponent {
  private toast = inject(HotToastService);

  showToast(): void {
    this.toast.show('Toast in custom container!');
  }
}
