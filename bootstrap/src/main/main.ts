import './main_4'
import {renderForm} from "boost-web-forms";
import {Bootstrap4Form} from "../Boostrap4";

const forObject = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    rating: 0,
    packages: ['newsLetter', 'premiumSupport'],
}

const formConfig = {
    scale: 1,
    ...Bootstrap4Form({columns: 2})
}


renderForm(forObject, document.getElementById('app')!, formConfig)
