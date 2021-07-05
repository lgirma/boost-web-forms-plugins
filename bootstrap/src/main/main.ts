import '../../node_modules/bootstrap5/dist/css/bootstrap.css'
import '../../node_modules/bootstrap5/dist/js/bootstrap'

import {renderForm} from "boost-web-forms";
import {Bootstrap5Form} from "../Bootstrap5";
import {forObject, formConfig} from '../../../common/sample-form'

const config = {
    ...formConfig,
    ...Bootstrap5Form({columns: 2, fullWidthSubmit: true})
}


renderForm(forObject, document.getElementById('app')!, config)
