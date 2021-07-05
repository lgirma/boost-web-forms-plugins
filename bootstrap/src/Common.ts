import {FormLayoutProps, createFormConfig, getFormHtmlAttrs} from "boost-web-forms";
import {AbstractDomElement, h} from "vdtree";
import {FieldConfig, ValidationResult} from "boost-web-forms";

export interface BootstrapFieldSetProps {
    field: FieldConfig
    value: any
    fieldValidationResult: ValidationResult
    layoutOptions: BootstrapLayoutOptions
}

export interface BootstrapFormProps extends FormLayoutProps {
    fieldSet: (fs: BootstrapFieldSetProps) => AbstractDomElement
    layoutOptions: BootstrapLayoutOptions
}

export interface BootstrapLayoutOptions {
    columns: number
    isInline: boolean
    horizontalLabels: boolean
    fullWidthSubmit: boolean
}

export function getColumnClass(columns: number, colSpan: number, prefix = 'col-', maxCols = 12) {
    return columns > 1 ? `${prefix}${maxCols * colSpan / columns}` : ''
}

export function BootstrapForm({forObject, formConfig, validationResult, fieldSet, layoutOptions, htmlAttrs = {}}: BootstrapFormProps) {
    let _formConfig = formConfig ?? createFormConfig(forObject)
    let result = h(_formConfig.excludeSubmitButton ? 'div' : 'form',
        {...getFormHtmlAttrs(_formConfig), ...htmlAttrs})
    result.props.class ??= ''
    if (layoutOptions.columns > 1)
        result.props.class += ' row'

    for (const fieldId in _formConfig.fieldsConfig) {
        if (!_formConfig.fieldsConfig.hasOwnProperty(fieldId))
            continue
        let field = _formConfig.fieldsConfig[fieldId]
        let fieldValidationResult = validationResult?.fields[fieldId] ?? {hasError: false}
        let fSet = fieldSet({field, value: forObject[field.id], fieldValidationResult, layoutOptions})
        result.children.push(fSet)
    }

    return result
}