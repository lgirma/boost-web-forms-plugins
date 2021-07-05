import '../../node_modules/bootstrap3/dist/css/bootstrap.css'
import '../../node_modules/bootstrap3/dist/js/bootstrap'

import {renderForm} from "boost-web-forms";
import {Bootstrap3Form} from "../Bootstrap3";
import {forObject, formConfig} from '../../../common/sample-form'

const config = {
    ...formConfig,
    ...Bootstrap3Form({columns: 2, fullWidthSubmit: true})
}


renderForm(forObject, document.getElementById('app')!, config)
