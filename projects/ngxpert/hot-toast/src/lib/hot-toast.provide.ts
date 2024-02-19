import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { ToastConfig } from './hot-toast.model';

export function provideHotToastConfig(config?: Partial<ToastConfig>): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: ToastConfig, useValue: config }]);
}
