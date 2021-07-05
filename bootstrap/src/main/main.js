import './main_4';
import { renderForm } from "boost-web-forms";
import { Bootstrap4Form } from "../Boostrap4";
const forObject = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    receiveUpdateEmails: false
};
const formConfig = {
    scale: 1,
    layout: Bootstrap4Form({ isInline: true }),
    noValidate: true
};
renderForm(forObject, document.getElementById('app'), formConfig);
//# sourceMappingURL=main.js.map