import { CodeSchema } from './codes/code.schema';
import { Type } from '@angular/core';
export interface PlaygroundSchema {
  title: string;
  description?: string;
  id: string;
  code: CodeSchema;
  activeSnippet?: 'ts' | 'html' | 'scss' | 'css' | 'preview';
  component: Type<unknown>;
}
