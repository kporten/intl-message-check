![intl-message-check](./assets/logo.png)

This CLI tool can help you detect missing and unused Format.JS messages (https://formatjs.io/docs/react-intl/api#formatmessage).

Run `npx @kporten/intl-message-check` in your JS/TS project folder to check your message definitions.

## Requirements

- Node.js LTS 14.x

## Example

Your JSON file with intl messages:

```json
{
  "language": "Language",
  "menu": "Menu",
  "notfound.back": "Back"
}
```

Usage of formatMessage() in your code:

```jsx
<div>{intl.formatMessage({ id: 'menu' })}</div>
```

Run this tool to find missing messages:

```sh
[1/3] What kind of messages do you want to find?

Find missing

[2/3] Please enter the path to your JS/TS project directory:

/path/to/your/project
✓ Path is valid

[3/3] Please enter the path to your JSON file with message definitions:

/path/to/your/project/src/i18n/en.json

languages.de
languages.en
```

Now you know that you should add the two messages.

> Note: Currently only static IDs will be supported.

---

MIT License

Copyright (c) 2020 Kevin Porten
