# boost-web-forms-svelte

Svelte component for [boost-web-forms](https://github.com/lgirma/boost-web-forms) library.

## Installation

```shell
npm i boost-web-forms-svelte
```

or 

```shell
yarn add boost-web-forms-svelte
```

## Quick Start

To generate the above login form, 

1. Create your model:

```javascript
let forObj = {
    email: '',
    password: '',
    rememberMe: false
}
```

2. Render the form on the DOM:

```jsx
import {SvelteForm as Form} from 'boost-web-forms-svelte'

<Form forObject={forObj} />
```

You will find the complete login form example [here](https://github.com/lgirma/boost-web-forms-svelte/blob/master/src/App.svelte).

## Setting Options

Use the `options` prop to set options:

```jsx
const formConfig = {
    fieldsConfig: {
        email: {
            placeholder: 'email@organization',
            label: 'Your Email',
            required: true
        }
    }
}
<Form forObject={forObj} options={formConfig} />
```

## Two-way Binding

To let the form update the `forObject` use svelte's `bind:`

```jsx
<Form bind:forObject={forObj} />
```

Now, the forObj gets updated up on every user input.

## Form Submission

Use the `on:submit` event handler to handle form submission

```jsx
function onLogin(e) {
    // to get the validation result:
    e.detail.validationResult
    
    // to prevent default submission
    e.detail.preventDefault()
}

...

<Form ... on:submit={onLogin}>
```

**Note**: This event is only triggered if the form is valid. To prevent auto-validation set `autoValidate` to false.

```jsx
<Form ... options={{autoValidate: false}}>
```

## Validation Result

Up on submission, the form will be automatically validated and `on:validate` will be triggered

```jsx
function onValidate(validationResult) {
    if (validationResult.detail.hasError)
}

...

<Form ... on:validate={onValidate} />
```

Consult the [boost-web-forms](https://github.com/lgirma/boost-web-forms) docs for more.

## Html Attributes

To set extra html `<form>` attributes ([see](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)) add them in the `options` prop

```jsx
let formConfig = {
    id: "form-login", 
    action: "login.php", 
    method: "post", 
    novalidate: true
}

...

<Form options={formConfig} />
```

Raw HTML field attributes can also be added in the `fieldsConfig` section.

Refer [boost-web-forms docs](https://github.com/lgirma/boost-web-forms) for more details.

## Licesne

ISC License