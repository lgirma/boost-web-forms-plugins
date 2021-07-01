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