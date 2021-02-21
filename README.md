![intl-message-check](./assets/logo.png)

This CLI tool can help you detect missing or unused Format.JS messages (https://formatjs.io/docs/react-intl/api#formatmessage).

Run `npx @kporten/intl-message-check` in your JavaScript or TypeScript project to check your message definitions.

## Requirements

- Node.js LTS 14.x

## Modes

- Find missing -> Messages used in the code but not defined in the definition.
- Find unused -> Messages not used in the code, but defined in the definition.

## Example to find missing messages

### Your JSON file with intl message definitions

```json
{
  "language": "Language",
  "menu": "Menu",
  "notfound.back": "Back"
}
```

### Your JS(X) or TS(X) code with formatMessage()

```jsx
<div>{intl.formatMessage({ id: 'message' })}</div>
```

or

```jsx
<div>
  {condition
    ? intl.formatMessage({ id: 'message1' })
    : intl.formatMessage({ id: 'message2' })}
</div>
```

or

```jsx
<div>
  {intl.formatMessage(
    condition
      ? { id: 'message1' }
      : { id: 'message2' },
  )}
</div>
```

### Run the tool

```sh
npx @kporten/intl-message-check
```

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

Now you know that you should add the two missing messages to your definition file.

> Note: Currently only static message IDs will be supported (id property and message string must be in the same line).

---

MIT License

Copyright (c) 2020 Kevin Porten
