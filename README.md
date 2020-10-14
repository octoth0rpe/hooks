# @octoth0rpe/hooks
A library of React components created using `create-react-app`.

## Installation
Run the following command:
`npm install @octoth0rpe/hooks`

## Hooks:

### useConfig (and ConfigProvider)

A hook for sharing a value (which can be an object or array containing values) via context. The value is reset when the browser reloads (see useSessionConfig, useLocalConfig for persisting values). This hook is likely the _least_ useful. 

#### Usage:

Coming soon.

### useSessionConfig (and SessionConfigProvider)

A hook for sharing a value (which can be an object or array containing values) via context. The value is reset when the browser is closed/reopened (see useLocalConfig for persisting values), and stored in session storage.

#### Usage:

Coming soon.

### useLocalConfig (and LocalConfigProvider)

A hook for sharing a value (which can be an object or array containing values) via context. The value is stored in local storage, so it will persist when the browser is restarted, or even when the OS is rebooted.

#### Usage:

Coming soon.

### useFormState

A hook for storing form data. Useful properties:

* onChange callback is intended to receive input onChange events, so you can use it like this: `<input type="text" name="my_field" value={state.my_field} onChange={onChange} />`
* `trim()` (the 3rd value returned from the hook is a callback that trims all string values, and sets the state with the updated values. Pass it a callback, and the callback will be passed the state with the trimmed values. This is useful for validation.

#### Usage:

```
// at the top of your component
const [state, onChange, trim] = useFormState({
  my_field: 'test_value',
});

const submit = () => trim(state => doTheThing(state));

return (
	<input type="text" name="my_field" value={state.my_field} onChange={onChange} />
);

```


### useValidation

Coming soon.

### useTranslation

Coming soon.