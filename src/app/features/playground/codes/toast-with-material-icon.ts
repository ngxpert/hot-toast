// @ts-expect-error TypeScript cannot provide types based on attributes yet
import tsContents from '../demos/toast-with-material-icon/toast-with-material-icon.component.ts' with { loader: 'text' };
import { CodeSchema } from './code.schema';

const toastWithMaterialIconCode: CodeSchema = {
  ts: `
${tsContents}
`,
};


export default toastWithMaterialIconCode;