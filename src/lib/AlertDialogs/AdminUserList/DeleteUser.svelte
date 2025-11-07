<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { toast } from "svelte-sonner";
    import { invalidate } from '$app/navigation';
  let { isOpen = $bindable(), userid = $bindable() } = $props();


  const confirmDeleteUser = async  () =>{

    console.log( userid )

   

    const formData = new FormData();

    formData.append('userid', userid )

    const response = await fetch('/admin/Users?/DeleteUser',{
      method:'POST',
      body:formData,
    })

    if(response.status === 200){
       toast.success('Successfully Deleted')
     
       isOpen = false;
    }else{
      toast.error('Faile to delete');
    }
    



  }

  
</script>

<AlertDialog.Root bind:open={isOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action onclick={()=> confirmDeleteUser()}>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>