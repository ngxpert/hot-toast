// @ts-expect-error TypeScript cannot provide types based on attributes yet
import tsContents from '../demos/toast-with-sonner-style/toast-with-sonner-style.component.ts' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import htmlContents from '../demos/toast-with-sonner-style/toast-with-sonner-style.component.html' with { loader: 'text' };
import { CodeSchema } from './code.schema';

const toastWithSonnerStyleCode: CodeSchema = {
  ts: `
${tsContents}`,
  html: `
${htmlContents}`,
};

export default toastWithSonnerStyleCode; 