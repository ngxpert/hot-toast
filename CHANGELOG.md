# [6.1.0](https://github.com/ngxpert/hot-toast/compare/v6.0.0...v6.1.0) (2026-01-01)


### Bug Fixes

* adjust hot-toast popover styles to remove default padding and border ([eec0061](https://github.com/ngxpert/hot-toast/commit/eec0061f6700e3307f6e9032a13d6a8ffc9047aa))
* remove default popover padding ([42fa7b9](https://github.com/ngxpert/hot-toast/commit/42fa7b92548ab326dc7699cff02024661a1503df))
* trigger release ([9c2b80c](https://github.com/ngxpert/hot-toast/commit/9c2b80ce3d12bbc7ba69d01d900a0a69f82aa875))
* update popover handling in HotToast components ([231a534](https://github.com/ngxpert/hot-toast/commit/231a534d649d0b248315cc83060cd4738f1ecf1f))


### Features

* implement Popover API in HotToast components ([988b222](https://github.com/ngxpert/hot-toast/commit/988b22219a65871c46e03f411d3559a1e765b2d7))
* use popover api with hot-toast-container component ([5e74cd6](https://github.com/ngxpert/hot-toast/commit/5e74cd6e55d988e45e555f898e6f4dc7fba1ff7d)), closes [#172](https://github.com/ngxpert/hot-toast/issues/172)

# [6.1.0-beta.3](https://github.com/ngxpert/hot-toast/compare/v6.1.0-beta.2...v6.1.0-beta.3) (2026-01-01)


### Bug Fixes

* adjust hot-toast popover styles to remove default padding and border ([eec0061](https://github.com/ngxpert/hot-toast/commit/eec0061f6700e3307f6e9032a13d6a8ffc9047aa))

# [6.1.0-beta.2](https://github.com/ngxpert/hot-toast/compare/v6.1.0-beta.1...v6.1.0-beta.2) (2026-01-01)


### Bug Fixes

* trigger release ([9c2b80c](https://github.com/ngxpert/hot-toast/commit/9c2b80ce3d12bbc7ba69d01d900a0a69f82aa875))

# [6.1.0-beta.1](https://github.com/ngxpert/hot-toast/compare/v6.0.0...v6.1.0-beta.1) (2026-01-01)


### Bug Fixes

* remove default popover padding ([42fa7b9](https://github.com/ngxpert/hot-toast/commit/42fa7b92548ab326dc7699cff02024661a1503df))
* update popover handling in HotToast components ([231a534](https://github.com/ngxpert/hot-toast/commit/231a534d649d0b248315cc83060cd4738f1ecf1f))


### Features

* implement Popover API in HotToast components ([988b222](https://github.com/ngxpert/hot-toast/commit/988b22219a65871c46e03f411d3559a1e765b2d7))
* use popover api with hot-toast-container component ([5e74cd6](https://github.com/ngxpert/hot-toast/commit/5e74cd6e55d988e45e555f898e6f4dc7fba1ff7d)), closes [#171](https://github.com/ngxpert/hot-toast/issues/171) [#172](https://github.com/ngxpert/hot-toast/issues/172)

# [6.0.0](https://github.com/ngxpert/hot-toast/compare/v5.1.3...v6.0.0) (2025-11-28)


### Code Refactoring

* remove zone.js dependencies and switch to zoneless change detection ([fe977c5](https://github.com/ngxpert/hot-toast/commit/fe977c5d5ce8d26a92886c9f6f80e85227e39930))


* Merge pull request #170 from JeevanMahesha/feat/angular-21-support ([14ff728](https://github.com/ngxpert/hot-toast/commit/14ff7280a463f2374db2c319a9e210af45171675)), closes [#170](https://github.com/ngxpert/hot-toast/issues/170)


### Features

* implement zoneless change detection and update component inputs to use `input()` syntax ([032654c](https://github.com/ngxpert/hot-toast/commit/032654c5a65ddf24f667fd51516e620455345970))
* Upgrade Angular to v21, update TypeScript, and implement `provideZoneChangeDetection`. ([b6ceabb](https://github.com/ngxpert/hot-toast/commit/b6ceabb4bf0e119a3b0eef81c4a579b79886931c))


### BREAKING CHANGES

* - Added support for angular v21
* - Removed `zone.js` dependency from package.json

## [5.1.3](https://github.com/ngxpert/hot-toast/compare/v5.1.2...v5.1.3) (2025-11-13)


### Bug Fixes

* **dependencies:** update @ngneat/overview to version 7.0.0 ([4d68b72](https://github.com/ngxpert/hot-toast/commit/4d68b728810d17fb71f9bd62c01695739acf11d8))

## [5.1.2](https://github.com/ngxpert/hot-toast/compare/v5.1.1...v5.1.2) (2025-10-08)


### Bug Fixes

* **hot-toast-container:** update ref's toast when calling updateToast ([b7f9a31](https://github.com/ngxpert/hot-toast/commit/b7f9a3149f8c70c48e85d49a5065967e6e293709)), closes [#160](https://github.com/ngxpert/hot-toast/issues/160)

## [5.1.1](https://github.com/ngxpert/hot-toast/compare/v5.1.0...v5.1.1) (2025-07-31)


### Bug Fixes

* **hot-toast.service:** show warning only if token is present ([3d100a0](https://github.com/ngxpert/hot-toast/commit/3d100a0100a180d37479c25a6ced1090874545a6)), closes [#133](https://github.com/ngxpert/hot-toast/issues/133)

# [5.1.0](https://github.com/ngxpert/hot-toast/compare/v5.0.2...v5.1.0) (2025-07-30)


### Features

* expose toast container using injection token ([8d5ddb8](https://github.com/ngxpert/hot-toast/commit/8d5ddb808699521309acc16b137a2af18933d68f))

## [5.0.2](https://github.com/ngxpert/hot-toast/compare/v5.0.1...v5.0.2) (2025-07-14)


### Bug Fixes

* remove `NgStyle` directive to reduce bundle size ([83e0b46](https://github.com/ngxpert/hot-toast/commit/83e0b4673cd6b6d456a21b10f11c7bdb34103645))

## [5.0.1](https://github.com/ngxpert/hot-toast/compare/v5.0.0...v5.0.1) (2025-06-03)


### Bug Fixes

* use ngStyle instead of style for CSP ([2ffa505](https://github.com/ngxpert/hot-toast/commit/2ffa50541751edee12815513774b77a9d50e684c)), closes [#95](https://github.com/ngxpert/hot-toast/issues/95)

## [5.0.1-beta.1](https://github.com/ngxpert/hot-toast/compare/v5.0.0...v5.0.1-beta.1) (2025-06-02)


### Bug Fixes

* use ngStyle instead of style for CSP ([2ffa505](https://github.com/ngxpert/hot-toast/commit/2ffa50541751edee12815513774b77a9d50e684c)), closes [#95](https://github.com/ngxpert/hot-toast/issues/95)

# [5.0.0](https://github.com/ngxpert/hot-toast/compare/v4.2.0...v5.0.0) (2025-05-29)


### Features

* update to Angular v20 ([e3eb2a5](https://github.com/ngxpert/hot-toast/commit/e3eb2a5674d184f4fed313ebd396af4fb28d38f2))


### BREAKING CHANGES

* Update to Angular v20

# [4.2.0](https://github.com/ngxpert/hot-toast/compare/v4.1.2...v4.2.0) (2025-05-13)


### Features

* ng update @angular-eslint/schematics @angular/cdk ([1cf631f](https://github.com/ngxpert/hot-toast/commit/1cf631f657e13e91701ad638dc43653bbb5d47cd))
* ng update @angular/core @angular/cli ([6f7395c](https://github.com/ngxpert/hot-toast/commit/6f7395c8260998c74dcce857331c7f4b7c53503e))
* update other dependencies ([c9f1044](https://github.com/ngxpert/hot-toast/commit/c9f10447892351c84e6d351a7a05f7ebd4636731))

## [4.1.2](https://github.com/ngxpert/hot-toast/compare/v4.1.1...v4.1.2) (2025-02-25)


### Bug Fixes

* **info.component.html:** adjust variable names within info component ([2aea049](https://github.com/ngxpert/hot-toast/commit/2aea0499daf72a2bc3580cf2e318006f43b194c5))

## [4.1.2-beta.1](https://github.com/ngxpert/hot-toast/compare/v4.1.1...v4.1.2-beta.1) (2025-02-25)


### Bug Fixes

* **info.component.html:** adjust variable names within info component ([2aea049](https://github.com/ngxpert/hot-toast/commit/2aea0499daf72a2bc3580cf2e318006f43b194c5))

## [4.1.1](https://github.com/ngxpert/hot-toast/compare/v4.1.0...v4.1.1) (2024-12-11)


### Bug Fixes

* allow html in icon ([161b0bc](https://github.com/ngxpert/hot-toast/commit/161b0bc65d0d8f408042907ec026b98200a16d0c))

# [4.1.0](https://github.com/ngxpert/hot-toast/compare/v4.0.1...v4.1.0) (2024-12-10)


### Features

* add schematics ([2b1502f](https://github.com/ngxpert/hot-toast/commit/2b1502fc9dcc71cfd6136dc54d2fe91ffbe61341))

## [4.0.1](https://github.com/ngxpert/hot-toast/compare/v4.0.0...v4.0.1) (2024-12-10)


### Bug Fixes

* toast getting reopened on change ([625daf7](https://github.com/ngxpert/hot-toast/commit/625daf7b5514ad0829dc97159eee55db65424363))

## [4.0.1-beta.1](https://github.com/ngxpert/hot-toast/compare/v4.0.0...v4.0.1-beta.1) (2024-12-10)


### Bug Fixes

* toast getting reopened on change ([625daf7](https://github.com/ngxpert/hot-toast/commit/625daf7b5514ad0829dc97159eee55db65424363))

# [4.0.0](https://github.com/ngxpert/hot-toast/compare/v3.1.1...v4.0.0) (2024-12-10)


### Features

* update to Angular 19 ([bb2bd47](https://github.com/ngxpert/hot-toast/commit/bb2bd476ed7f201c79d8261a506f5e3cc9e032ec))
* update to Angular 19 ([5f8570a](https://github.com/ngxpert/hot-toast/commit/5f8570a8c217d3153f8e13e1053eb191e984f3c8))


### BREAKING CHANGES

* update to angular 19

# [4.0.0-beta.1](https://github.com/ngxpert/hot-toast/compare/v3.2.0-beta.1...v4.0.0-beta.1) (2024-12-10)


### Features

* update to Angular 19 ([bb2bd47](https://github.com/ngxpert/hot-toast/commit/bb2bd476ed7f201c79d8261a506f5e3cc9e032ec))


### BREAKING CHANGES

* update to angular 19

# [3.2.0-beta.1](https://github.com/ngxpert/hot-toast/compare/v3.1.1...v3.2.0-beta.1) (2024-12-10)


### Features

* update to Angular 19 ([5f8570a](https://github.com/ngxpert/hot-toast/commit/5f8570a8c217d3153f8e13e1053eb191e984f3c8))

## [3.1.1](https://github.com/ngxpert/hot-toast/compare/v3.1.0...v3.1.1) (2024-12-10)


### Bug Fixes

* use inject function instead of decorator ([9b63e61](https://github.com/ngxpert/hot-toast/commit/9b63e614729d9d1807d13d1c9ee4e409c371ef34)), closes [#22](https://github.com/ngxpert/hot-toast/issues/22)

## [3.1.1-beta.1](https://github.com/ngxpert/hot-toast/compare/v3.1.0...v3.1.1-beta.1) (2024-12-10)


### Bug Fixes

* use inject function instead of decorator ([9b63e61](https://github.com/ngxpert/hot-toast/commit/9b63e614729d9d1807d13d1c9ee4e409c371ef34)), closes [#22](https://github.com/ngxpert/hot-toast/issues/22)

# [3.1.0-beta.3](https://github.com/ngxpert/hot-toast/compare/v3.1.0-beta.2...v3.1.0-beta.3) (2024-12-10)


### Bug Fixes

* use inject function instead of decorator ([9b63e61](https://github.com/ngxpert/hot-toast/commit/9b63e614729d9d1807d13d1c9ee4e409c371ef34)), closes [#22](https://github.com/ngxpert/hot-toast/issues/22)

# [3.1.0](https://github.com/ngxpert/hot-toast/compare/v3.0.2...v3.1.0) (2024-12-10)


### Bug Fixes

* assign statically increasing ids to toasts ([c3ec7a1](https://github.com/ngxpert/hot-toast/commit/c3ec7a1ade1d7c790848983c882e587af0ca5949)), closes [#15](https://github.com/ngxpert/hot-toast/issues/15)
* filter undefined refs from group, add test cases ([af1ed00](https://github.com/ngxpert/hot-toast/commit/af1ed00f87cc37fb4215c79db696e5cc069f550b)), closes [#9](https://github.com/ngxpert/hot-toast/issues/9)
* revert toastref.groupref assignment ([a99204a](https://github.com/ngxpert/hot-toast/commit/a99204a3e9e8e928a261e806787bc30a95da3d6c))


### Features

* add new builder pattern to handle pre-grouping ([8b59a9a](https://github.com/ngxpert/hot-toast/commit/8b59a9af19db742115e6aae465346d923da7789d)), closes [#9](https://github.com/ngxpert/hot-toast/issues/9)

# [3.1.0-beta.2](https://github.com/ngxpert/hot-toast/compare/v3.1.0-beta.1...v3.1.0-beta.2) (2024-12-10)


### Bug Fixes

* assign statically increasing ids to toasts ([c3ec7a1](https://github.com/ngxpert/hot-toast/commit/c3ec7a1ade1d7c790848983c882e587af0ca5949)), closes [#15](https://github.com/ngxpert/hot-toast/issues/15)
* revert toastref.groupref assignment ([a99204a](https://github.com/ngxpert/hot-toast/commit/a99204a3e9e8e928a261e806787bc30a95da3d6c))

# [3.1.0-beta.1](https://github.com/ngxpert/hot-toast/compare/v3.0.2...v3.1.0-beta.1) (2024-12-07)


### Bug Fixes

* filter undefined refs from group, add test cases ([af1ed00](https://github.com/ngxpert/hot-toast/commit/af1ed00f87cc37fb4215c79db696e5cc069f550b)), closes [#9](https://github.com/ngxpert/hot-toast/issues/9)


### Features

* add new builder pattern to handle pre-grouping ([8b59a9a](https://github.com/ngxpert/hot-toast/commit/8b59a9af19db742115e6aae465346d923da7789d)), closes [#9](https://github.com/ngxpert/hot-toast/issues/9)

## [3.0.2](https://github.com/ngxpert/hot-toast/compare/v3.0.1...v3.0.2) (2024-10-05)


### Bug Fixes

* add exit animation once enter animation is done ([48c7600](https://github.com/ngxpert/hot-toast/commit/48c7600e6c1fe496bc74a16b900e7e35365bbf92)), closes [#21](https://github.com/ngxpert/hot-toast/issues/21)

## [3.0.2-beta.1](https://github.com/ngxpert/hot-toast/compare/v3.0.1...v3.0.2-beta.1) (2024-10-05)


### Bug Fixes

* add exit animation once enter animation is done ([48c7600](https://github.com/ngxpert/hot-toast/commit/48c7600e6c1fe496bc74a16b900e7e35365bbf92)), closes [#21](https://github.com/ngxpert/hot-toast/issues/21)

## [3.0.1](https://github.com/ngxpert/hot-toast/compare/v3.0.0...v3.0.1) (2024-08-25)


### Bug Fixes

* fixed toast message not being removed automatically and minor changeDetection changes ([aceb7ae](https://github.com/ngxpert/hot-toast/commit/aceb7aea12fc02a8bf5e878d03f7be88947c5154)), closes [#16](https://github.com/ngxpert/hot-toast/issues/16)

## [3.0.1-beta.1](https://github.com/ngxpert/hot-toast/compare/v3.0.0...v3.0.1-beta.1) (2024-08-25)


### Bug Fixes

* fixed toast message not being removed automatically and minor changeDetection changes ([aceb7ae](https://github.com/ngxpert/hot-toast/commit/aceb7aea12fc02a8bf5e878d03f7be88947c5154)), closes [#16](https://github.com/ngxpert/hot-toast/issues/16)

# [3.0.0](https://github.com/ngxpert/hot-toast/compare/v2.0.0...v3.0.0) (2024-06-06)


### Bug Fixes

* fixes for angular v18 ([6d351e9](https://github.com/ngxpert/hot-toast/commit/6d351e95cb17c57af30c84b19b85b1901ee9c7c6)), closes [#10](https://github.com/ngxpert/hot-toast/issues/10)


### Features

* trigger breaking change release ([d4a681f](https://github.com/ngxpert/hot-toast/commit/d4a681f6e7f86e8f8019ef8371d81be451e9524f)), closes [#10](https://github.com/ngxpert/hot-toast/issues/10)


### BREAKING CHANGES

* Angular has been updated to version 18

# [3.0.0-beta.1](https://github.com/ngxpert/hot-toast/compare/v2.0.1-beta.1...v3.0.0-beta.1) (2024-06-06)


### Features

* trigger breaking change release ([d4a681f](https://github.com/ngxpert/hot-toast/commit/d4a681f6e7f86e8f8019ef8371d81be451e9524f)), closes [#10](https://github.com/ngxpert/hot-toast/issues/10)


### BREAKING CHANGES

* Angular has been updated to version 18

## [2.0.1-beta.1](https://github.com/ngxpert/hot-toast/compare/v2.0.0...v2.0.1-beta.1) (2024-06-06)


### Bug Fixes

* fixes for angular v18 ([6d351e9](https://github.com/ngxpert/hot-toast/commit/6d351e95cb17c57af30c84b19b85b1901ee9c7c6)), closes [#10](https://github.com/ngxpert/hot-toast/issues/10)

# [2.0.0](https://github.com/ngxpert/hot-toast/compare/v1.0.0...v2.0.0) (2024-04-17)


### Bug Fixes

* handle expanded in doCheck ([58a188a](https://github.com/ngxpert/hot-toast/commit/58a188a2b976fc43295f92858897700b0c9836d5))
* make options optional in show function ([8ecbbc2](https://github.com/ngxpert/hot-toast/commit/8ecbbc2a3c10b6e3006debd5aad7e304c7984d71))


### Features

* add grouping feature ([c342de6](https://github.com/ngxpert/hot-toast/commit/c342de69adcf246a30e51f01c5a411a822756e3e))
* post grouping ([bc32842](https://github.com/ngxpert/hot-toast/commit/bc32842f04b7f997cbefb98d2ad217941652b2bb))
* remove first child div from .hot-toast-message ([8b7b09f](https://github.com/ngxpert/hot-toast/commit/8b7b09f50e9e1f9189a6a562415e849da1df3f13))


### BREAKING CHANGES

* a div around ng-container in .hot-toast-message has been removed. User will need to
take care of this in their ng-template

# [2.0.0-beta.1](https://github.com/ngxpert/hot-toast/compare/v1.0.0...v2.0.0-beta.1) (2024-04-17)


### Bug Fixes

* handle expanded in doCheck ([58a188a](https://github.com/ngxpert/hot-toast/commit/58a188a2b976fc43295f92858897700b0c9836d5))
* make options optional in show function ([8ecbbc2](https://github.com/ngxpert/hot-toast/commit/8ecbbc2a3c10b6e3006debd5aad7e304c7984d71))


### Features

* add grouping feature ([c342de6](https://github.com/ngxpert/hot-toast/commit/c342de69adcf246a30e51f01c5a411a822756e3e))
* post grouping ([bc32842](https://github.com/ngxpert/hot-toast/commit/bc32842f04b7f997cbefb98d2ad217941652b2bb))
* remove first child div from .hot-toast-message ([8b7b09f](https://github.com/ngxpert/hot-toast/commit/8b7b09f50e9e1f9189a6a562415e849da1df3f13))


### BREAKING CHANGES

* a div around ng-container in .hot-toast-message has been removed. User will need to
take care of this in their ng-template

# 1.0.0 (2024-02-19)


### Features

* initial commit ([658b129](https://github.com/ngxpert/hot-toast/commit/658b129058b7825a10266fc5f534aad8d3f7a96c))
