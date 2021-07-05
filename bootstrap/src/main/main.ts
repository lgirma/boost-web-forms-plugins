import './main_4'
import {renderForm} from "boost-web-forms";
import {Bootstrap4Form} from "../Boostrap4";
import {forObject, formConfig} from '../../../common/sample-form'

const config = {
    ...formConfig,
    ...Bootstrap4Form({columns: 2, fullWidthSubmit: true})
}


renderForm(forObject, document.getElementById('app')!, config)
