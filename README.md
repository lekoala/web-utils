# @lekoala/web-utils

Small, zero-runtime-dependency browser utilities.

The package is intentionally **not** a general-purpose utility library.

## Principles

- Pure ESM.
- Zero runtime dependencies.
- No prototype patches, globals, observers, or import-time DOM access.
- Source-first: consumers bundle/transpile for their own browser target.
- JSDoc is the source of truth; `.d.ts` files are generated with TypeScript.
- Explicit subpath exports: there is deliberately no root `@lekoala/web-utils` barrel.
- `sideEffects: false` so bundlers can safely tree-shake.
- DOM helpers follow native argument order: `target` first.
- No implicit passive event listeners: behavior that can affect `preventDefault()` is explicit.

## API policy

The public API is **only** the subpaths declared in `package.json` `exports` and the
symbols each module exports. Everything else — module-private helpers, JSDoc typedefs,
the `dom` barrel, implementation details — is internal and can change at any time.

- Versioning follows [SemVer](https://semver.org). Additive changes (new subpath or
  helper) are a minor release; behavior changes are a major release. Until `1.0.0`,
  any evolution is still tracked in [CHANGELOG.md](CHANGELOG.md).
- Deprecations are marked `@deprecated` in the JSDoc, kept for at least one major
  release, and the migration path is documented in the CHANGELOG.
- New helpers must be generic (not project-specific), serve at least two consumer
  projects, keep a small surface, follow the existing conventions (target-first,
  no implicit passive listeners, conservative parsing, no `any` leaking into types),
  and come with tests. Contextual or third-party-adapter helpers are refused.

## Browser vs SSR

Importing any module is **SSR-safe**: no module touches the DOM, globals, or observers
at import time. A few helpers are *browser-only at call time* when their implicit
default is used:

| Subpath             | Browser-only when calling without               |
|---------------------|-------------------------------------------------|
| `dom/*`             | an explicit `root` / `doc` / `parent` argument  |
| `custom-elements`   | an explicit `registry` argument                 |
| `url.isExternalUrl` | an explicit `base` argument (needs `location`)  |
| `form`              | works in any runtime with `FormData` (Node 18+) |

All DOM helpers accept explicit roots/documents, so SSR code can pass its own
abstractions.

## Guarantees

- No prototype patches, no global mutation, no observers.
- No polyfills: the code targets ES2022; consumers transpile for their own target.
- Conservative parsing: values that do not clearly match a type stay as strings
  (`toBool`, `stringToValue`, `toInt`/`toFloat` fallbacks).
- `formDataToObject` stores a `__proto__` field as an own property instead of
  mutating the prototype chain.

## Install

```sh
npm install @lekoala/web-utils
```

## Usage

```js
import { debounce } from "@lekoala/web-utils/timing";
import { camelToDash, interpolate } from "@lekoala/web-utils/string";
import { appendParams } from "@lekoala/web-utils/url";
import { qs, qsa } from "@lekoala/web-utils/dom/query";
import { on, dispatch } from "@lekoala/web-utils/dom/events";
```

For a component that uses several DOM primitives, a DOM-only convenience barrel is available:

```js
import { ce, on, qs, setAttr } from "@lekoala/web-utils/dom";
```

Prefer the narrower subpath when a module only needs one domain.

## Public subpaths

| Subpath           | Main helpers                                                                          |
|-------------------|---------------------------------------------------------------------------------------|
| `array`           | `toArray`                                                                             |
| `string`          | `camelize`, `dashToCamel`, `camelToDash`, `interpolate`, `stripDiacritics`, `slugify` |
| `value`           | `toBool`, `toInt`, `toFloat`, `stringToValue`                                         |
| `timing`          | `debounce`, `debounceLeading`, `throttle`, `debounceFrame`                            |
| `url`             | `appendParams`, `isExternalUrl`                                                       |
| `form`            | `formDataToObject`                                                                    |
| `dom/query`       | `qs`, `qsa`, `byId`                                                                   |
| `dom/create`      | `ce`, `insertAfter`, `parseHTML`                                                      |
| `dom/attrs`       | attribute + dataset helpers                                                           |
| `dom/classes`     | class helpers                                                                         |
| `dom/events`      | `on`, `off`, `once`, `dispatch`                                                       |
| `dom/ready`       | `domReady`                                                                            |
| `custom-elements` | `defineCustomElement`                                                                 |

## String conversion edge cases

The naming helpers are intentionally narrow. Verified behavior:

| Input       | `camelize` | `dashToCamel` | `camelToDash` |
|-------------|------------|---------------|---------------|
| `foo-bar`   | `fooBar`   | `fooBar`      | —             |
| `foo_bar`   | `fooBar`   | `foo_bar`     | —             |
| `foo.bar`   | `fooBar`   | `foo.bar`     | —             |
| `URL value` | `urlValue` | —             | —             |
| `hello-`    | `hello-`   | —             | —             |
| `fooBar`    | —          | —             | `foo-bar`     |
| `fooBAR`    | —          | —             | `foo-bar`     |
| `URLValue`  | —          | —             | `urlvalue`    |
| `fooBarURL` | —          | —             | `foo-bar-url` |

- `camelize` treats any run of non-alphanumeric characters as a separator. A trailing
  separator with no following letter is preserved.
- `dashToCamel` only converts `-` followed by a lowercase letter or digit. Uppercase
  after a dash, `_`, or `.` are left untouched.
- `camelToDash` inserts `-` before each uppercase letter preceded by a lowercase
  letter or digit, then lowercases. Leading acronyms are not split: `URLValue`
  becomes `urlvalue`, not `url-value`.

## Development

```sh
npm install
npm test
npm run typecheck
npm run types
npm run lint
npm run check
```

`npm run types` generates the published declarations in `types/` from the JSDoc-annotated JavaScript source.
