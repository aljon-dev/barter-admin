<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
      import { Textarea } from "$lib/components/ui/textarea/index.js";
    


  let { isEditing = $bindable(), userData = $bindable({}) } = $props();
</script>


<AlertDialog.Root bind:open={isEditing}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Edit User</AlertDialog.Title>
      <AlertDialog.Description>
        <form  class="space-y-4">
          <div class="flex justify-center">
             {#if userData.profile === ''}
                  <div
                    class="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary font-semibold rounded-full uppercase"
                  >
                    {userData.firstname[0]}{userData.lastname[0]}
                  </div>
                {:else}
                  <img
                    src={userData.profile}
                    alt="Profile"
                    class="w-10 h-10 rounded-full object-cover border"
                  />
                {/if}
          </div>

          <div class="flex gap-2">
            <div class="w-full">
              <Label for="firstname" class="mb-1">Firstname</Label>
              <Input id="firstname" type="text" bind:value={userData.firstname} required />
            </div>
            <div class="w-full">
              <Label for="lastname" class="mb-1">Lastname</Label>
              <Input id="lastname" type="text" bind:value={userData.lastname}   required />
            </div>
          </div>

          <div>
            <Label for="bio">Bio</Label>
            <Textarea id="bio"  bind:value={userData.bio} maxlength={200} placeholder="Tell us about yourself..." />
          </div>
        </form>
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel >Cancel</AlertDialog.Cancel>
      <AlertDialog.Action >Save Changes</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>