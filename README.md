# @lekoala/web-utils

Small, zero-runtime-dependency browser utilities shared by lightweight web components and demos.

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
- Prefer small native wrappers over mini-frameworks.

## API policy

The public API is **only** the subpaths declared in `package.json` `exports` and the symbols each module exports. Everything else is internal and can change at any time.

New helpers should be generic, useful across projects, keep a small surface, follow the existing conventions, and come with tests. Contextual helpers and third-party adapters stay in their consumer project.

## Browser vs SSR

Importing any module is SSR-safe: no module touches the DOM, globals, or observers at import time. A few helpers are browser-only at call time when their implicit default is used.

| Subpath | Browser-only when calling without |
| --- | --- |
| `dom/*` | an explicit `root` / `doc` / `parent` where supported |
| `custom-elements` | an explicit `registry` |
| `url.isExternalUrl` | an explicit `base` (needs `location`) |
| `form` | works in any runtime with `FormData` |

## Install

```sh
bun add @lekoala/web-utils
```

or:

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
import { ce, html, on, qs, setAttr } from "@lekoala/web-utils/dom";
```

Prefer the narrower subpath when a module only needs one domain.

## Safe HTML templates

`html` is deliberately much smaller than a rendering library. It exists for the common case where a handful of `document.createElement()` calls make simple markup hard to read.

```js
import { html } from "@lekoala/web-utils/dom/html";

const row = html.one`
  <span class="person">
    <span>${initials(item.label)}</span>
    <strong>${item.label}</strong>
    <span>${item.data.role} · ${item.data.team}</span>
  </span>
`;
```

The static template is parsed once and cached. Dynamic `${...}` values never enter `innerHTML`: they are inserted afterwards as text, DOM nodes, or flattened iterables of those values.

```js
const value = '<img src=x onerror="alert(1)">';
const fragment = html`<strong>${value}</strong>`;
// value is text, not markup
```

Supported child values are intentionally boring:

- strings, numbers and other scalar values become text;
- `Node` / `DocumentFragment` values are inserted directly;
- arrays and other iterables are flattened recursively;
- `null`, `undefined` and `false` render nothing.

The normal tag returns a `DocumentFragment`:

```js
container.append(html`
  <ul>
    ${items.map((item) => html`<li>${item.label}</li>`)}
  </ul>
`);
```

`html.one` returns the single root `Element` and rejects multiple roots:

```js
const button = html.one`<button>${label}</button>`;
button.disabled = disabled;
button.addEventListener("click", save);
```

That last split is intentional: templates describe structure and child content; native DOM APIs still handle attributes, properties and events. Interpolations inside tags or attributes are rejected instead of introducing a second template grammar.

```js
// Not supported on purpose:
html`<button class="${variant}">${label}</button>`;

// Keep it native:
const button = html.one`<button>${label}</button>`;
button.className = variant;
```

## Public subpaths

| Subpath | Main helpers |
| --- | --- |
| `array` | `toArray` |
| `string` | `camelize`, `dashToCamel`, `camelToDash`, `interpolate`, `stripDiacritics`, `slugify` |
| `value` | `toBool`, `toInt`, `toFloat`, `stringToValue` |
| `timing` | `debounce` (`cancel`, `flush`), `debounceLeading`, `throttle`, `debounceFrame` |
| `url` | `appendParams`, `isExternalUrl` |
| `form` | `formDataToObject` |
| `dom/query` | `qs`, `qsa`, `byId` |
| `dom/create` | `ce`, `insertAfter`, `parseHTML` |
| `dom/html` | `html`, `html.one` |
| `dom/attrs` | attribute/dataset helpers plus declarative value parsers |
| `dom/classes` | class helpers |
| `dom/events` | `on`, `off`, `once`, `dispatch` |
| `dom/ready` | `domReady` |
| `custom-elements` | `defineCustomElement` |

## Attribute parsing

The DOM attribute module also contains the small parsers duplicated by consumer components:

```js
import {
  parseBooleanAttribute,
  parseEnumAttribute,
  parseIntegerListAttribute,
} from "@lekoala/web-utils/dom/attrs";
```

They remain pure functions: they parse values but do not impose component defaults or read component state.

## String conversion edge cases

The naming helpers are intentionally narrow. Verified behavior:

| Input | `camelize` | `dashToCamel` | `camelToDash` |
| --- | --- | --- | --- |
| `foo-bar` | `fooBar` | `fooBar` | — |
| `foo_bar` | `fooBar` | `foo_bar` | — |
| `foo.bar` | `fooBar` | `foo.bar` | — |
| `URL value` | `urlValue` | — | — |
| `hello-` | `hello-` | — | — |
| `fooBar` | — | — | `foo-bar` |
| `fooBAR` | — | — | `foo-bar` |
| `URLValue` | — | — | `urlvalue` |
| `fooBarURL` | — | — | `foo-bar-url` |

## Development

The repository follows the same lightweight Bun + Biome + checked-JS setup as the sibling component repositories.

```sh
bun install
bun run verify
```

Useful individual commands:

```sh
bun run test
bun run typecheck
bun run types
bun run lint
bun run format
```

`bun run types` generates the published declarations in `types/` from the JSDoc-annotated JavaScript source.
