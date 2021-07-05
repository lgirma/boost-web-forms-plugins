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
    submit: 'btn btn-primary', file: ' ', files: ' ', checkbox: ' ', radio: ' ', range: ' '
} as any

export function Bootstrap3Form(layoutOptions?: Partial<BootstrapLayoutOptions>) {
    let _layoutOptions: BootstrapLayoutOptions = {
        columns: 1,
        horizontalLabels: false,
        isInline: false,
        fullWidthSubmit: false,
        ...layoutOptions
    }
    let layout = function (props: FormLayoutProps) {
        let htmlAttrs: any = {}
        if (_layoutOptions.isInline)
            htmlAttrs.class = 'form-inline'
        return BootstrapForm({
            ...props,
            fieldSet: Bootstrap3FieldSet,
            layoutOptions: _layoutOptions,
            htmlAttrs
        })
    }

    return {layout}
}

function Bootstrap3FieldSet({field, value, fieldValidationResult, layoutOptions}: BootstrapFieldSetProps): AbstractDomElement {
    let fieldSet = h('div', 
        {class: field.type === 'checkbox' ? 'checkbox' : `form-group ${fieldValidationResult.hasError ? 'has-error' : ''}`})
    const isCheckOrRadio = field.type === 'checkbox' || field.type === 'radio'
    let inputClass = classTable[field.type] || 'form-control'
    if (fieldValidationResult.hasError)
        inputClass += ' is-invalid'
    if (field.scale != 1 && !isCheckOrRadio) {
        if (field.type == 'submit')
            inputClass += ` btn-${field.scale > 1 ? 'lg' : 'sm'}`
        else
            inputClass += ` input-${field.scale > 1 ? 'lg' : 'sm'}`
    }
    if (field.type == 'submit' && layoutOptions.fullWidthSubmit)
        inputClass += ' btn-block'
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
        .map((k, i) => h('div', {class: (field.multiple ? 'checkbox' : 'radio')}, h('label', {}, 
            input[i],
            ' ',
            (field.choices as Dict<string>)[k]
        )))
    }

    let colClass = getColumnClass(layoutOptions.columns,
        field.type == 'submit' ? layoutOptions.columns : field.colSpan,
        'col-md-')

    if (field.type != 'checkbox' || field.readonly)
        fieldSet.children.push(...toArray(label), ...toArray(input))
    else {
        let labels = toArray(label)
        if (labels.length > 0 && typeof(labels[0]) != 'string') {
            labels[0].children.unshift(...toArray(input))
            fieldSet.children.push(...labels)
        }
        else
            fieldSet.children.push(...toArray(input), ...toArray(label))
    }

    if (fieldValidationResult && fieldValidationResult.hasError)
        fieldSet.children.push(h('div', {class: `${isCheckOrRadio ? 'text-danger' : 'help-block'} has-error`}, fieldValidationResult.message))

    if (!isEmpty(field.helpText))
        fieldSet.children.push(h('p', {class: 'help-block'}, field.helpText))
    if (!isEmpty(colClass))
        fieldSet = h('div', {class: colClass}, fieldSet)

    return fieldSet
}