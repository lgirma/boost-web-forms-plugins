<script>
  import Form from './SvelteForm.svelte'
  
  let formData = {
    email: '',
    password: '',
    rememberMe: false
  }

$: console.log(formData)
</script>


<Form bind:forObject={formData} />