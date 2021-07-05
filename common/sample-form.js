export const forObject = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '0',
    accountType: '',
    dateOfBirth: "2001-02-01",
    agreeToTerms: false,
    packages: ['newsLetter', 'premiumSupport'],
    comment: '',
    requestDiscount: 5.5,
    passportDocument: null,
    arrivalTime: '09:08:00',
    price: 50.99,
    volume: 50,
    age: 17,
    rating: 0,
    invalidTyped: null,
    answer: '',
    jsonInput: ''
}

export const formConfig = {
    fieldsConfig: {
        email: {
            required: true,
            placeholder: 'mail@company.com',
            helpText: 'We will send you verification code through this'
        },
        accountType: {
            type: 'select',
            placeholder: '-- Select Account Type --',
            choices: ['Commercial', 'Personal'],
            onchange: e => {alert(' Changed to ' + e.target.value)}
        },
        gender: {
            type: 'radio', readonly: false,
            choices: {0: 'Male', 1: 'Female'}
        },
        comment: {type: 'textarea', colSpan: 2},
        passportDocument: {
            type: 'files',
            required: true
        },
        volume: {type: "range", max: '1000', min: '0', step: '5'},
        age: {
            validate: val => val < 18 ? 'You should be at least 18' : ''
        },
        agreeToTerms: {
            validate: val => val ? '' : 'You have to agree to our terms & conditions.'
        },
        rating: {
            type: 'rating',
            validate: val => val < 2 ? 'Please, give a rating of at least 2' : ''
        },
        invalidTyped: {type: 'go'},
        answer: {type: 'markdown'},
        jsonInput: {type: 'sourcecode'}
    }
}