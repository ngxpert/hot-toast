// @ts-expect-error TypeScript cannot provide types based on attributes yet
import tsContents from '../demos/toast-with-custom-style/toast-with-custom-style.component.ts' with { loader: 'text' };
import { CodeSchema } from './code.schema';

const toastWithCustomStyleCode: CodeSchema = {
  ts: `
${tsContents}`,
};


export default toastWithCustomStyleCode;
