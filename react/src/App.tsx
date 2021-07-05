import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ReactForm} from "./ReactForm";
import {forObject, formConfig} from '../../common/sample-form'

function App() {
  return <ReactForm forObject={forObject} {...formConfig} />
}

export default App
