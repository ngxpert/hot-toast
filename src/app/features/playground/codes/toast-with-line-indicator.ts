// @ts-expect-error TypeScript cannot provide types based on attributes yet
import tsContents from '../demos/toast-with-line-indicator/toast-with-line-indicator.component.ts' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import htmlContents from '../demos/toast-with-line-indicator/toast-with-line-indicator.component.html' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import scssContents from '../demos/toast-with-line-indicator/toast-with-line-indicator.component.scss' with { loader: 'text' };
import { CodeSchema } from './code.schema';


const toastWithLineIndicatorCode: CodeSchema = {
  ts: `
${tsContents}`,
  html: `
${htmlContents}`,
  scss: `
${scssContents}`,
};


export default toastWithLineIndicatorCode;
