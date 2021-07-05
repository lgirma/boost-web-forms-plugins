import type { FormConfig, FormValidationResult } from "boost-web-forms";
import { DeepPartial } from "boost-web-core";
import { SvelteComponentTyped } from "svelte"

export interface SvelteFormProps {
    forObject: any
    options?: DeepPartial<FormConfig>
    validationResult?: FormValidationResult
    htmlAttrs?: DeepPartial<HTMLFormElement>
}

export interface SvelteFormEvents {
    submit: WindowEventMap['submit'] & {validationResult: FormValidationResult}
    validate: {validationResult: FormValidationResult}
    input: WindowEventMap['input']
    change: WindowEventMap['change']
    blur: WindowEventMap['blur']
}

export default class SvelteForm extends SvelteComponentTyped<SvelteFormProps, SvelteFormEvents> {}