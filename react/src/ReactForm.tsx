import {toReactElement} from "vdtree";
import {DeepPartial} from "boost-web-core";
import {getFormValue, createFormConfig, validateForm, FormValidationResult, FormConfig, getFormValidationResult} from "boost-web-forms";
import * as React from 'react'

export interface ReactFormProps extends DeepPartial<FormConfig> {
    forObject: any,
    validationResult?: FormValidationResult
    onFormChange?: (e: any) => void
}

export function ReactForm(props: ReactFormProps) {
    let {
        forObject,
        validationResult = {hasError: false, message: '', fields: {}}
    } = props
    let formConfig = props.$$isComplete
        ? {...props, forObject: undefined, validationResult: undefined, onFormChange: undefined} as FormConfig
        : createFormConfig(forObject, {...props, forObject: undefined, validationResult: undefined})
    const [formData, setFormData] = React.useState(forObject)

    if (formConfig.autoValidate) {
        const [vr, setVr] = React.useState(getFormValidationResult())
        const originalOnSubmit = formConfig.onSubmit || formConfig.onsubmit
        formConfig.onSubmit = e => {
            let state = getFormValue(formConfig, e.target as HTMLElement)
            let vRes = validateForm(state, formConfig)
            if (vRes.hasError) {
                e.preventDefault();
            }
            else if (originalOnSubmit) {
                originalOnSubmit(e)
            }
            setVr(vRes)
        }
        return toReactElement((formConfig.layout!)({forObject, formConfig, validationResult: vr}), React)
    }
    return toReactElement((formConfig.layout!)({forObject, formConfig, validationResult}), React)
}