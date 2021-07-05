import {AbstractDomElement, h} from 'vdtree'
import {AbstractInput, AbstractLabel, FormLayoutProps} from "boost-web-forms";
import {Dict, toArray, isEmpty} from "boost-web-core";
import {
    BootstrapFieldSetProps,
    BootstrapForm,
    BootstrapLayoutOptions,
    getColumnClass
} from "./Common";

const classTable = {
    checkbox: 'form-check-input', radio: 'form-check-input',
    file: 'form-control-file', files: 'form-control-file',
    range: 'form-control-range', submit: 'btn btn-primary',
    select: 'custom-select'
} as any

export function Bootstrap4Form(layoutOptions?: Partial<BootstrapLayoutOptions>) {
    let _layoutOptions = {
        columns: 1,
        horizontalLabels: false,
        isInline: false,
        ...layoutOptions
    }
    let layout = function (props: FormLayoutProps) {
        let htmlAttrs: any = {}
        if (_layoutOptions.isInline)
            htmlAttrs.class = 'form-inline'
        return BootstrapForm({
            ...props,
            fieldSet: Bootstrap4FieldSet,
            layoutOptions: _layoutOptions,
            htmlAttrs
        })
    }

    return {layout}
}

function Bootstrap4FieldSet({field, value, fieldValidationResult, layoutOptions}: BootstrapFieldSetProps): AbstractDomElement {
    let fieldSet = h('div', {class: `${field.type === 'checkbox' ? `form-check ${layoutOptions.isInline ? 'form-check-inline' : ''}` : ''}`})
    const isCheckOrRadio = field.type === 'checkbox' || field.type === 'radio'
    let inputClass = classTable[field.type] || 'form-control'
    if (fieldValidationResult.hasError)
        inputClass += ' is-invalid'
    if (field.scale != 1 && !isCheckOrRadio) {
        if (field.type == 'submit')
            inputClass += ` btn-${field.scale > 1 ? 'lg' : 'sm'}`
        else
            inputClass += ` form-control-${field.scale > 1 ? 'lg' : 'sm'}`
    }

    if (layoutOptions.isInline && isEmpty(field.placeholder))
        field.placeholder = field.label

    let label = AbstractLabel({
        field, validationResult: fieldValidationResult,
        htmlAttrs: {class: `${isCheckOrRadio ? 'form-check-label' : ''} ${layoutOptions.isInline ? 'sr-only' : ''}`}})
    let input = AbstractInput({
        field, value, validationResult: fieldValidationResult,
        htmlAttrs: {class: inputClass}})

    if (field.type === 'radio') {
        input = Object.keys(field.choices as {})
            .map((k, i) => h('div', {class: `form-check ${layoutOptions.isInline ? 'form-check-inline' : ''}`}, h('label', {},
                toArray(input)[i],
                ' ',
                (field.choices as Dict<string>)[k]
            )))
    }

    let colClass = getColumnClass(layoutOptions.columns,
        field.type == 'submit' ? layoutOptions.columns : field.colSpan)

    if (field.type != 'checkbox' || field.readonly)
        fieldSet.children.push(...toArray(label), ' ', ...toArray(input))
    else
        fieldSet.children.push(...toArray(input), ' ', ...toArray(label))

    if (fieldValidationResult && fieldValidationResult.hasError)
        fieldSet.children.push(h('div', {class: 'invalid-feedback'}, fieldValidationResult.message))

    if (!isEmpty(colClass))
        fieldSet = h('div', {class: `mb-2 ${colClass}`}, fieldSet)
    else fieldSet.props.class += ' mb-2'
    if (!isEmpty(field.helpText))
        fieldSet.children.push(h('small', {class: 'form-text text-muted'}, field.helpText))
    if (layoutOptions.isInline)
        fieldSet.props.class += ' mb-2 mr-sm-2'

    return fieldSet
}