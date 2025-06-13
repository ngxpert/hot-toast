// @ts-expect-error TypeScript cannot provide types based on attributes yet
import tsContents from '../demos/expandable-notification-toast-with-timer/expandable-notification-toast-with-timer.component.ts' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import htmlContents from '../demos/expandable-notification-toast-with-timer/expandable-notification-toast-with-timer.component.html' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import scssContents from '../demos/expandable-notification-toast-with-timer/expandable-notification-toast-with-timer.component.scss' with { loader: 'text' };
import { CodeSchema } from './code.schema';


const expandableNotificationToastWithTimerCode: CodeSchema = {
  ts: `
${tsContents}`,
  html: `
${htmlContents}`,
  scss: `
${scssContents}`,
};


export default expandableNotificationToastWithTimerCode;
