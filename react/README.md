# boost-web-forms-react

React form component for [boost-web-forms](https://github.com/lgirma/boost-web-forms)

## Installation

```shell
npm i boost-web-forms-react
```

## Usage

Import and use the `ReactForm` from this package.

```javascript
import {ReactForm} from 'boost-web-forms-react'

let forObject = {
    userName: '',
    password: '',
    rememberMe: false
}

<ReactForm forObject={forObject} />
```

## Options

Append all form options as props to the `ReactForm` component

```jsx
<ReactForm forObject={forObject} 
           method="POST" 
           action="login.php" />
```

## See

* [React](https://reactjs.org/)
* [boost-web-forms](https://github.com/lgirma/boost-web-forms)