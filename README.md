# intl-message-check

Run `npx intl-message-check` (CLI) in your JS/TS project folder to check if messages are unused or missing.

Supported format: https://formatjs.io/docs/react-intl/api#formatmessage

Example JSON file with intl messages:

```json
{
  "language": "Language",
  "menu": "Menu",
  "notfound.back": "Back"
}
```

Example usage of formatMessage() in your code:

```jsx
<div>{intl.formatMessage({ id: 'menu' })}</div>
```

> Note: Currently only static IDs will be supported.

---

MIT License

Copyright (c) 2020 Kevin Porten
