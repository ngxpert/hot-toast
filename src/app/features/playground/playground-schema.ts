import { Content } from '@ngneat/overview';
import { ToastOptions, ToastType } from '@ngxpert/hot-toast';

export interface PlaygroundSchema {
  title: string;
  description?: string;
  message: Content;
  options?: ToastOptions<unknown>;
  type?: ToastType;
  id: string;
  notes?: string;
}
