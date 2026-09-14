# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-09-14

### Added

- `dom/html`: minimal cached `html` tagged template with safe child interpolation, iterable composition and `html.one` for single-root markup.
- `dom/attrs`: `parseBooleanAttribute`, `parseIntegerListAttribute` and `parseEnumAttribute`, extracted from recurring component patterns.
- `timing`: `debounce().flush()` to immediately run a pending invocation, matching the control needed by `data-grid`.

### Changed

- Development setup aligned with the current component repositories: Bun package metadata, Biome project config, strict checked-JS `jsconfig.json`, TypeScript declaration build and Bun-based CI.
- Added `.gitattributes` line-ending normalization for cross-platform development.

## [0.1.0] - 2026-08-15

### Added

- `array`: `toArray`.
- `string`: `camelize`, `dashToCamel`, `camelToDash`, `interpolate`, `stripDiacritics`, `slugify`.
- `value`: `toBool`, `toInt`, `toFloat`, `stringToValue`.
- `timing`: `debounce`, `debounceLeading`, `throttle`, `debounceFrame`.
- `url`: `appendParams`, `isExternalUrl`.
- `form`: `formDataToObject`.
- `dom`: `qs`, `qsa`, `byId` (`dom/query`), `ce`, `insertAfter`, `parseHTML` (`dom/create`), attribute and dataset helpers (`dom/attrs`), class helpers (`dom/classes`), `on`, `off`, `once`, `dispatch` (`dom/events`), `domReady` (`dom/ready`).
- `custom-elements`: `defineCustomElement`.
