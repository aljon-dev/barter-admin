<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import * as Menubar from "$lib/components/ui/menubar/index.js";
  import DeleteUser from "$lib/AlertDialogs/AdminUserList/DeleteUser.svelte";
	import EditingUser from "$lib/AlertDialogs/AdminUserList/EditingUser.svelte";

  let { data } = $props();
  
  let isOpenDelete = $state(false);

  let  isEditing = $state(false);

  let selectedUser = $state({});
   
</script>

<div class="w-full px-6 py-10 bg-background min-h-screen">
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-semibold tracking-tight text-foreground">
          User Overview
        </h2>
        <p class="text-muted-foreground mt-1">
          List of all registered users and their details.
        </p>
      </div>
  
    </div>

    <!-- User Table -->
    <div class="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table.Root class="w-full">
        <Table.Caption class="text-sm text-muted-foreground p-4 bg-muted/30">
          Recent user list with profile and rating details
        </Table.Caption>

        <Table.Header class="bg-muted/20">
          <Table.Row>
            <Table.Head class="px-4 py-3 text-left">ID</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Profile</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Full Name</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Ratings</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Bio</Table.Head>
            <Table.Head class="px-4 py-3 text-center">Action</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {#each data.Users ?? [] as user (user.id)}
            <Table.Row class="hover:bg-muted/10 transition">
              <Table.Cell class="px-4 py-3 font-medium">
                {user.id}
              </Table.Cell>

              <!-- Profile -->
              <Table.Cell class="px-4 py-3">
                {#if user.profile === ''}
                  <div
                    class="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary font-semibold rounded-full uppercase"
                  >
                    {user.firstname[0]}{user.lastname[0]}
                  </div>
                {:else}
                  <img
                    src={user.profile}
                    alt="Profile"
                    class="w-10 h-10 rounded-full object-cover border"
                  />
                {/if}
              </Table.Cell>

              <!-- Fullname -->
              <Table.Cell class="px-4 py-3 font-medium">
                {user.firstname} {user.lastname}
              </Table.Cell>

              <!-- Ratings -->
              <Table.Cell class="px-4 py-3">
                {#if user.usertotalrating && user.usertotalrating !== 0}
                  <span
                    class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium"
                  >
                    ⭐ {(user.rating / user.usertotalrating).toFixed(1)}
                  </span>
                {:else}
                  <span
                    class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium"
                  >
                    No rating
                  </span>
                {/if}
              </Table.Cell>

              <!-- Bio -->
              <Table.Cell class="px-4 py-3 text-muted-foreground truncate max-w-xs">
                {user.bio ?? 'No Bio'}
              </Table.Cell>

              <!-- Action -->
              <Table.Cell class="px-4 py-3 text-center">
                <Menubar.Root class="inline-block">
                  <Menubar.Menu>
                    <Menubar.Trigger class="px-3 py-1 rounded-md hover:bg-muted/20 transition text-primary font-medium">
                      Action
                    </Menubar.Trigger>
                    <Menubar.Content align="end" class="w-36">
                     <!-- Menubar.Item
                        class="cursor-pointer hover:bg-blue-50 text-blue-600"
                        onclick={() => (isEditing = true, selectedUser  = user)}>
                        Edit
                      </Menubar.Item>
                      <Menubar.Separator />  --> 
                      <Menubar.Item
                        class="cursor-pointer hover:bg-red-50 text-red-600"
                        onclick={() => (isOpenDelete = true)} >
                        Delete
                      </Menubar.Item>
                    </Menubar.Content>
                  </Menubar.Menu>
                </Menubar.Root>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
  </div>

  <!-- Modals -->
  {#if isOpenDelete}
    <DeleteUser bind:isOpen={isOpenDelete} />
  {/if}

  {#if isEditing}
    <EditingUser bind:isEditing={isEditing} bind:userData={selectedUser } />
  {/if}
</div>
