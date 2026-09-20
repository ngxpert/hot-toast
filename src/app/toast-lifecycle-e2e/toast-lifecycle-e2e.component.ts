import { Component, inject, signal } from '@angular/core';
import { CreateHotToastRef, HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-toast-lifecycle-e2e',
  template: `
    <div class="p-8 space-y-4">
      <h1>Toast lifecycle E2E</h1>
      <button data-testid="batch" (click)="createBatch()">Create ten toasts</button>
      <button data-testid="unlimited" (click)="createBatch({ visibleToasts: 0 })">Create unlimited toasts</button>
      <button data-testid="sticky" (click)="createBatch({ autoClose: false })">Create sticky toasts</button>
      <button data-testid="close-refs" (click)="closeRefs()">Close references</button>
      <button data-testid="early-ref" (click)="closeBeforeRender('ref')">Close reference before render</button>
      <button data-testid="early-id" (click)="closeBeforeRender('id')">Close ID before render</button>
      <button data-testid="early-all" (click)="closeBeforeRender('all')">Close all before render</button>
      <button data-testid="unknown-id" (click)="closeUnknownId()">Close unknown ID</button>
      <p data-testid="created">{{ refs.length }}</p>
      <p data-testid="closed">{{ closedIds().length }}</p>
    </div>
  `,
})
export class ToastLifecycleE2eComponent {
  refs: CreateHotToastRef<unknown>[] = [];
  readonly closedIds = signal<string[]>([]);

  private readonly toast = inject(HotToastService);

  createBatch({ visibleToasts = 5, autoClose = true }: { visibleToasts?: number; autoClose?: boolean } = {}): void {
    this.toast.defaultConfig = { ...this.toast.defaultConfig, visibleToasts };
    for (let index = 0; index < 10; index++) {
      this.addToast({ autoClose });
    }
  }

  closeRefs(): void {
    this.refs.forEach((ref) => ref.close());
  }

  closeBeforeRender(mode: 'ref' | 'id' | 'all'): void {
    const ref = this.addToast({ autoClose: false });
    if (mode === 'ref') {
      ref.close();
    } else {
      this.toast.close(mode === 'id' ? ref.getToast().id : undefined);
    }
    // A later toast must survive a close-all request made before the render.
    this.addToast({ autoClose: false });
  }

  closeUnknownId(): void {
    this.addToast({ autoClose: false });
    this.toast.close('future-toast');
    this.addToast({ autoClose: false, id: 'future-toast' });
  }

  private addToast({ autoClose, id }: { autoClose: boolean; id?: string }): CreateHotToastRef<unknown> {
    const ref = this.toast.loading(`Batch toast ${this.refs.length + 1}`, {
      ...(id === undefined ? {} : { id }),
      autoClose,
      duration: 60000,
    });
    this.refs.push(ref);
    ref.afterClosed.subscribe(({ id: closedId }) => {
      this.closedIds.update((ids) => [...ids, closedId]);
    });
    return ref;
  }
}
