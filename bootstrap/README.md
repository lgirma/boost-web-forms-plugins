# boost-web-forms-bootstrap

Plugin for [boost-web-forms](https://github.com/lgirma/boost-web-forms) to enable the popular bootstrap UI kit.
Supports all v3, v4, v5 versions.

## Installation

```shell
npm i boost-web-forms-bootstrap
```

## Usage

Add the bootstrap form layout in your form config's `layout` option

```javascript
import {Bootstrap4Form} from 'boost-web-forms-bootstrap'

const formConfig = {
    layout: Bootstrap4Form()
}
renderForm(forObject, document.body, formConfig)
```

```javascript
const formConfigWithOptions = {
    layout: Bootstrap4Form({columns: 2})
}
```

## Options

The plugin includes the following options:

| Option | Type | Description | Default Value |
| --- | ----------- | --- | ---------|
|`columns`| number | The number of total columns in the form | 1
|`isInline`| boolean | Whether to generate an in-line form | false
|`horizontalLabels`| boolean | Whether to put labels and inputs horizontally | false
|`fullWidthSubmit`| boolean | Whether to create a block button for submit | false

## See

* [Bootstrap](https://getbootstrap.com)
* [boost-web-forms](https://github.com/lgirma/boost-web-forms)