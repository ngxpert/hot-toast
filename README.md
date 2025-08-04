<!-- GitAds-Verify: SJ8M49JZ5AGV63OTC555HT5993UEWQ89 -->
<p align="center">
  <img width="20%" height="20%" src="./assets/logo.svg?raw=true">
</p>

<br />

[![npm](https://img.shields.io/npm/v/@ngxpert/hot-toast?style=flat-square)](https://www.npmjs.com/package/@ngxpert/hot-toast)
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)](https://github.com/ngxpert/hot-toast/blob/main/LICENSE)
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/ngxpert/hot-toast/compare)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-eslint-4b32c3.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
[![ngxpert](https://img.shields.io/badge/@-ngxpert-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngxpert/)
[![cypress](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/detailed/5qxvbj/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/5qxvbj/runs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Smoking hot Notifications for Angular. Lightweight, customizable and beautiful by default. Inspired from [react-hot-toast](https://github.com/timolins/react-hot-toast)

https://github.com/ngxpert/hot-toast/assets/6831283/ae718568-d5ea-47bf-a41d-6aabc7d4a044

## Sponsoring ngxpert

[Sponsorships](https://github.com/sponsors/shhdharmen) aid in the continued development and maintenance of ngxpert libraries. Consider asking your company to sponsor ngxpert as its core to their business and application development.

<hr />

## Compatibility with Angular Versions

<table>
  <thead>
    <tr>
      <th>@ngxpert/hot-toast</th>
      <th>Angular</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        1.x, 2.x
      </td>
      <td>
        >= 17 < 18
      </td>
    </tr>
    <tr>
      <td>
        3.x
      </td>
      <td>
        >= 18 < 19
      </td>
    </tr>
    <tr>
      <td>
        4.x
      </td>
      <td>
        >= 19 < 20
      </td>
    </tr>
    <tr>
      <td>
        5.x
      </td>
      <td>
        >= 20
      </td>
    </tr>
  </tbody>
</table>

### For older Angular versions, keep using [@ngneat/hot-toast from npm](https://www.npmjs.com/package/@ngneat/hot-toast).

## Features

- 🔥 **Hot by default**
- ☕ **Easy to use**
- 🐍 **Snackbar variation**
- ♿ **Accessible**
- 🖐️ **Reduce motion support**
- 😊 **Emoji Support**
- 🛠 **Customizable**
- ⏳ **Observable API**
- ✋ **Pause on hover**
- 🔁 **Events**
- 🔒 **Persistent**
- 🎭 **Grouping**
- 🔒 **CSP Compatible**
- 📦 **Customizable Toast Container**

## Installation

### Angular 19+

Using **Angular CLI**:

```bash
ng add @ngxpert/hot-toast
```

### Other Angular Versions

With **npm**:

```bash
npm install @ngneat/overview@6.1.1 @ngxpert/hot-toast
```

or **yarn**

```bash
yarn add @ngneat/overview@6.1.1 @ngxpert/hot-toast
```

<details>
<summary>For older versions</summary>

```bash
# For Angular version >= 9.1.13 < 13
npm install @ngneat/overview@2.0.2 @ngneat/hot-toast@3

# For Angular version >= 13 < 15
npm install @ngneat/overview@3.0.0 @ngneat/hot-toast@4

# For Angular version >= 15 <16
npm install @ngneat/overview@3.0.0 @ngneat/hot-toast@5

# For Angular version >= 16 <17
npm install @ngneat/overview@5.1.1 @ngneat/hot-toast@6

# For Angular version >= 17 <18
npm install @ngneat/overview@6.0.0 @ngxpert/hot-toast@2

# For Angular version >= 18 <19
npm install @ngneat/overview@6.1.1 @ngxpert/hot-toast@3
```

</details>

## Setup

### Step 1a/2: Standalone Setup

```typescript
import { AppComponent } from './src/app.component';

import { provideHotToastConfig } from '@ngxpert/hot-toast';

bootstrapApplication(AppComponent, {
  providers: [
    provideHotToastConfig(), // @ngxpert/hot-toast providers
  ]
});
```

### Step 1b/2: Module Setup

Add `provideHotToastConfig()` to your app.module.ts `providers` section. Toast options ([`Partial<ToastConfig>`](#toastconfig)) here.:

```typescript
import { provideHotToastConfig } from '@ngxpert/hot-toast';

@NgModule({
  providers: [provideHotToastConfig()],
})
class AppModule {}
```

### Step 2/2: Stylings

if you use **SCSS** add this line to your main **styles.scss**:

```scss
@use '@ngxpert/hot-toast/src/styles/styles.scss';
```

or if you use **CSS** add this to your styles inside your **angular.json**:

```json
"styles": [
     "node_modules/@ngxpert/hot-toast/src/styles/styles.css",
],
```

## Basic Usage

```typescript
import { HotToastService } from '@ngxpert/hot-toast';

@Component({})
export class AppComponent {
  constructor(private toast: HotToastService) {}

  showToast() {
    this.toast.show('Hello World!');
    this.toast.loading('Lazyyy...');
    this.toast.success('Yeah!!');
    this.toast.warning('Boo!');
    this.toast.error('Oh no!');
    this.toast.info('Something...');
  }

  update() {
    saveSettings
      .pipe(
        this.toast.observe({
          loading: 'Saving...',
          success: 'Settings saved!',
          error: 'Could not save.',
        })
      )
      .subscribe();
  }
}
```

You can pass [`ToastOptions`](#toastoptions) while creating the toast to customize the look and behavior:

```typescript
import { HotToastService } from '@ngxpert/hot-toast';

@Component({})
export class AppComponent {
  constructor(private toast: HotToastService) {}

  customToast() {
    this.toast.success('Look at my styles, and I also need more time!', {
      duration: 5000,
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
  }
}
```

You can also set global [`ToastConfig`](#toastconfig) options while importing:

```typescript
import { provideHotToastConfig } from '@ngxpert/hot-toast';

@NgModule({
  providers: [
    provideHotToastConfig({
      reverseOrder: true,
      dismissible: true,
      autoClose: false,
    }),
  ],
})
class AppModule {}
```

Additionally, you have the option of using a standalone function to provide a global toast configuration within your app's configuration file:

```typescript
// app.config.ts
import { provideHotToastConfig } from '@ngxpert/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [provideHotToastConfig({ ... })],
};
```

## Examples

You can checkout examples at: <https://ngxpert.github.io/hot-toast#examples>.

## ToastConfig

All options, which are set _Available in global config?_ from `ToastOptions` are supported. Below are extra configurable options:

| Name          | Type                  | Description                                                             |
| ------------- | --------------------- | ----------------------------------------------------------------------- |
| reverseOrder  | `boolean`             | Sets the reverse order for hot-toast stacking<br>_Default: false_       |
| visibleToasts | `number`              | Sets the number of toasts visible. 0 will set no limit.<br>_Default: 5_ |
| stacking      | `"vertical"\|"depth"` | Sets Sets the type of stacking<br>_Default: "vertical"_                 |

## ToastOptions

Configuration used when opening an hot-toast.

| Name        | Type                                                                                                                                                                                                          | Description                                                                                                                                                                                                                                                                 | Available in global config? |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| id          | `string`                                                                                                                                                                                                      | Unique id to associate with hot-toast. There can't be multiple hot-toasts opened with same id. <br>_[Example](https://ngxpert.github.io/hot-toast/#only-one-at-a-time)_                                                                                                     | No                          |
| duration    | `number`                                                                                                                                                                                                      | Duration in milliseconds after which hot-toast will be auto closed. Can be disabled via `autoClose: false`<br>_Default: `3000, error = 4000, loading = 30000`_                                                                                                              | Yes                         |
| autoClose   | `boolean`                                                                                                                                                                                                     | Auto close hot-toast after duration<br>_Default: `true`_                                                                                                                                                                                                                    | Yes                         |
| position    | [`ToastPosition`](https://github-link.vercel.app/api?ghUrl=https://github.com/ngxpert/hot-toast/blob/main/projects/ngxpert/hot-toast/src/lib/hot-toast.model.ts&q=export%20type%20ToastPosition)              | The position to place the hot-toast.<br>_Default: `top-center`_<br>_[Example](https://ngxpert.github.io/hot-toast/#positions)_                                                                                                                                              | Yes                         |
| dismissible | `boolean`                                                                                                                                                                                                     | Show close button in hot-toast<br>_Default: `false`_<br>_[Example](https://ngxpert.github.io/hot-toast/#dismissible)_                                                                                                                                                       | Yes                         |
| role        | [`ToastRole`](https://github-link.vercel.app/api?ghUrl=https://github.com/ngxpert/hot-toast/blob/main/projects/ngxpert/hot-toast/src/lib/hot-toast.model.ts&q=export%20type%20ToastRole)                      | Role of the live region.<br>_Default: `status`_                                                                                                                                                                                                                             | Yes                         |
| ariaLive    | [`ToastAriaLive`](https://github-link.vercel.app/api?ghUrl=https://github.com/ngxpert/hot-toast/blob/main/projects/ngxpert/hot-toast/src/lib/hot-toast.model.ts&q=export%20type%20ToastAriaLive)              | aria-live value for the live region.<br>_Default: `polite`_                                                                                                                                                                                                                 | Yes                         |
| theme       | [`ToastTheme`](https://github-link.vercel.app/api?ghUrl=https://github.com/ngxpert/hot-toast/blob/main/projects/ngxpert/hot-toast/src/lib/hot-toast.model.ts&q=export%20type%20ToastTheme)                    | Visual appearance of hot-toast<br>_Default: `toast`_<br>_[Example](https://ngxpert.github.io/hot-toast/#snackbar)_                                                                                                                                                          | Yes                         |
| persist     | [`{ToastPersistConfig}`](https://github-link.vercel.app/api?ghUrl=https://github.com/ngxpert/hot-toast/blob/main/projects/ngxpert/hot-toast/src/lib/hot-toast.model.ts&q=export%20class%20ToastPersistConfig) | Useful when you want to keep a persistance for toast based on ids, across sessions.<br>_[Example](https://ngxpert.github.io/hot-toast/#persistent)_                                                                                                                         | No                          |
| icon        | [`Content`](https://github-link.vercel.app/api?ghUrl=https://github.com/ngxpert/overview/blob/main/projects/ngxpert/overview/src/lib/views/types.ts&q=export%20type%20Content)                                | Icon to show in the hot-toast<br>_[Example](https://ngxpert.github.io/hot-toast/#emoji)_                                                                                                                                                                                    | Yes                         |
| iconTheme   | [`IconTheme`](https://github-link.vercel.app/api?ghUrl=https://github.com/ngxpert/hot-toast/blob/main/projects/ngxpert/hot-toast/src/lib/hot-toast.model.ts&q=export%20type%20IconTheme)                      | Use this to change icon color<br>_[Example](https://ngxpert.github.io/hot-toast/#themed)_                                                                                                                                                                                   | Yes                         |
| className   | `string`                                                                                                                                                                                                      | Extra CSS classes to be added to the hot toast container.                                                                                                                                                                                                                   | Yes                         |
| attributes  | [`Record<string, string>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype)                                                                                                    | Extra attributes to be added to the hot toast container. Can be used for e2e tests.                                                                                                                                                                                         | Yes                         |
| style       | `style object`                                                                                                                                                                                                | Extra styles to apply for hot-toast.<br>_[Example](https://ngxpert.github.io/hot-toast/#themed)_                                                                                                                                                                            | Yes                         |
| closeStyle  | `style object`                                                                                                                                                                                                | Extra styles to apply for close button                                                                                                                                                                                                                                      | Yes                         |
| data        | [`DataType`](https://github-link.vercel.app/api?ghUrl=https://github.com/ngxpert/hot-toast/blob/main/projects/ngxpert/hot-toast/src/lib/hot-toast.model.ts&q=export%20interface%20Toast%3CDataType%3E)        | Allows you to pass data for your template and component. You can access the data using `toastRef.data`.<br>_Examples: [Template with Data](https://ngxpert.github.io/hot-toast/#template-data), [Component with Data](https://ngxpert.github.io/hot-toast/#component-data)_ | No                          |
| injector    | `Injector`                                                                                                                                                                                                    | Allows you to pass injector for your component.<br>_[Example](https://ngxpert.github.io/hot-toast/#injector)_                                                                                                                                                               | No                          |
| group       | [`group`](https://github-link.vercel.app/api?ghUrl=https://github.com/ngxpert/hot-toast/blob/main/projects/ngxpert/hot-toast/src/lib/hot-toast.model.ts&q=group%3F)                                           | Allows you to set group options. <br>Examples: [Pre-Grouping](https://ngxpert.github.io/hot-toast/#pre-grouping), [Post-Grouping](https://ngxpert.github.io/hot-toast/#post-grouping)                                                                                       | No                          |

## Injection Tokens

### HOT_TOAST_CONTAINER_TOKEN

Injection token to provide a custom container selector for the toast container. The value will be used as a selector to find the container element using `document.querySelector`.

```typescript
import { HOT_TOAST_CONTAINER_TOKEN, provideHotToastConfig } from '@ngxpert/hot-toast';

bootstrapApplication(AppComponent, {
  providers: [
    provideHotToastConfig(),
    {
      provide: HOT_TOAST_CONTAINER_TOKEN,
      useValue: '#toast-container',
    },
  ],
}).catch((err) => console.error(err));
```

---

## Supported Browsers

Latest versions of Chrome, Edge, Firefox and Safari are supported, with some known [issues](https://github.com/ngxpert/hot-toast/labels/browser).

## Accessibility

Hot-toast messages are announced via an `aria-live` region. By default, the `polite` setting is used. While `polite` is recommended, this can be customized by setting the `ariaLive` property of the `ToastConfig` or `ToastOptions`.

Focus is not, and should not be, moved to the hot-toast element. Moving the focus would be disruptive to a user in the middle of a workflow. It is recommended that, for any action offered in the hot-toast, the application offers the user an alternative way to perform the action. Alternative interactions are typically keyboard shortcuts or menu options. When the action is performed in this way, the hot-toast should be dismissed.

Hot-toasts that have an [action available](https://ngxpert.github.io/hot-toast/#template) should be set `autoClose: false`, as to accommodate screen-reader users that want to navigate to the hot-toast element to activate the action.

## Breaking Changes

### v1 to v2

The `<div>` surrounding `<ng-container>` is removed from `.hot-toast-message` to better and easy structure of layout. User may need to check their templates after updating to v2.

### v2 to v3

None

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shhdharmen"><img src="https://avatars3.githubusercontent.com/u/6831283?v=4?s=100" width="100px;" alt="Dharmen Shah"/><br /><sub><b>Dharmen Shah</b></sub></a><br /><a href="https://github.com/ngxpert/hot-toast/commits?author=shhdharmen" title="Code">💻</a> <a href="#content-shhdharmen" title="Content">🖋</a> <a href="#design-shhdharmen" title="Design">🎨</a> <a href="https://github.com/ngxpert/hot-toast/commits?author=shhdharmen" title="Documentation">📖</a> <a href="#example-shhdharmen" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.netbasal.com/"><img src="https://avatars1.githubusercontent.com/u/6745730?v=4?s=100" width="100px;" alt="Netanel Basal"/><br /><sub><b>Netanel Basal</b></sub></a><br /><a href="https://github.com/ngxpert/hot-toast/issues?q=author%3ANetanelBasal" title="Bug reports">🐛</a> <a href="#business-NetanelBasal" title="Business development">💼</a> <a href="#ideas-NetanelBasal" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-NetanelBasal" title="Maintenance">🚧</a> <a href="#mentoring-NetanelBasal" title="Mentoring">🧑‍🏫</a> <a href="#projectManagement-NetanelBasal" title="Project Management">📆</a> <a href="#research-NetanelBasal" title="Research">🔬</a> <a href="https://github.com/ngxpert/hot-toast/pulls?q=is%3Apr+reviewed-by%3ANetanelBasal" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://timo.sh/"><img src="https://avatars.githubusercontent.com/u/1440854?v=4?s=100" width="100px;" alt="Timo Lins"/><br /><sub><b>Timo Lins</b></sub></a><br /><a href="#design-timolins" title="Design">🎨</a> <a href="#ideas-timolins" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/patdx"><img src="https://avatars.githubusercontent.com/u/353863?v=4?s=100" width="100px;" alt="Patrick Miller"/><br /><sub><b>Patrick Miller</b></sub></a><br /><a href="#maintenance-patdx" title="Maintenance">🚧</a> <a href="#platform-patdx" title="Packaging/porting to new platform">📦</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ritox842"><img src="https://avatars.githubusercontent.com/u/7280441?v=4?s=100" width="100px;" alt="Gili Yaniv"/><br /><sub><b>Gili Yaniv</b></sub></a><br /><a href="https://github.com/ngxpert/hot-toast/commits?author=ritox842" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://medium.com/@overthesanity"><img src="https://avatars.githubusercontent.com/u/7337691?v=4?s=100" width="100px;" alt="Artur Androsovych"/><br /><sub><b>Artur Androsovych</b></sub></a><br /><a href="#maintenance-arturovt" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/luishcastroc"><img src="https://avatars.githubusercontent.com/u/13698269?v=4?s=100" width="100px;" alt="Luis Castro"/><br /><sub><b>Luis Castro</b></sub></a><br /><a href="https://github.com/ngxpert/hot-toast/commits?author=luishcastroc" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

