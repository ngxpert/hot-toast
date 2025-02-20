// @ts-expect-error TypeScript cannot provide types based on attributes yet
import tsContents from '../demos/toast-with-confetti/toast-with-confetti.component.ts' with { loader: 'text' };
import { CodeSchema } from './code.schema';


const toastWithConfettiCode: CodeSchema = {
  ts: `
${tsContents}`,
};


export default toastWithConfettiCode;
