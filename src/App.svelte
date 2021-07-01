<script>
    import Form from './SvelteForm.svelte'
  
    let formData = {
        email: '',
        password: '',
        rememberMe: false
    }

    let formConfig = {
        fieldsConfig: {
            password: {
                required: true,
                validate: p => p.length < 5 ? 'Password should at least have 5 chars.' : ''
            },
            email: {
                placeholder: 'Your email address',
                required: true
            }
        },
        novalidate: true
    }

    function onLogin(e) {
        e.detail.preventDefault()
        // Call auth API here
    }

    function onValidate(vr) {
        if (vr.detail.hasError)
            console.warn('Login validation error: ', vr.detail)
    }

    $: console.log('Form changed', formData)
</script>


<Form bind:forObject={formData} on:submit={onLogin} on:validate={onValidate} options={formConfig} />