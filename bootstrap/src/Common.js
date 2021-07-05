import { createFormConfig, getFormHtmlAttrs } from "boost-web-forms";
import { h } from "vdtree";
export function getColumnClass(columns, colSpan, prefix = 'col-', maxCols = 12) {
    return columns > 1 ? `${prefix}${maxCols * colSpan / columns}` : '';
}
export function BootstrapForm({ forObject, formConfig, validationResult, fieldSet, layoutOptions, htmlAttrs = {} }) {
    let _formConfig = formConfig ?? createFormConfig(forObject);
    let result = h(_formConfig.excludeSubmitButton ? 'div' : 'form', { ...getFormHtmlAttrs(_formConfig), ...htmlAttrs });
    result.props.class ??= '';
    if (layoutOptions.columns > 1)
        result.props.class += ' row';
    for (const fieldId in _formConfig.fieldsConfig) {
        if (!_formConfig.fieldsConfig.hasOwnProperty(fieldId))
            continue;
        let field = _formConfig.fieldsConfig[fieldId];
        let fieldValidationResult = validationResult?.fields[fieldId] ?? { hasError: false };
        let fSet = fieldSet({ field, value: forObject[field.id], fieldValidationResult, layoutOptions });
        result.children.push(fSet);
    }
    return result;
}
//# sourceMappingURL=Common.js.map