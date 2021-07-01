<script>
    import {
        getFormValidationResult,
        createFormConfig,
        onFieldChangeReducer,
        AbstractForm,
        validateForm
    } from 'boost-web-forms'
    import { createEventDispatcher, onMount } from 'svelte';
    import SvelteWrapper from 'vdtree-svelte'

    const dispatch = createEventDispatcher();

    export let forObject
    export let options = null
    export let validationResult = getFormValidationResult()

    let _safeOptions

    function initConfig(opts) {
        let safeOptions = opts != null && opts.$$isComplete
            ? opts
            : (opts == null ? createFormConfig(forObject) : createFormConfig(forObject, opts))
        safeOptions.onsubmit = e => {
            if (safeOptions.autoValidate) {
                validationResult = validateForm(forObject, _safeOptions)
                dispatch('validate', validationResult)
                e.validationResult = validationResult
                if (!validationResult.hasError)
                    dispatch('submit', e)
                else
                    e.preventDefault()
            }
        }
        safeOptions.onchange = e => {
            forObject = onFieldChangeReducer(safeOptions, e)(forObject)
            dispatch('change', e)
        }
        safeOptions.oninput = e => {
            dispatch('input', e)
        }
        safeOptions.onblur = e => {
            dispatch('blur', e)
        }
        _safeOptions = safeOptions
    }

    $: initConfig(options)

</script>

{#if _safeOptions != null}
    <SvelteWrapper dom={AbstractForm} props={{forObject, formConfig: _safeOptions, validationResult, htmlAttrs: {}}} />
{/if}

