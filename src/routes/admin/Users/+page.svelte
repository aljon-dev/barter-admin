<script lang="ts">

    import * as Table from "$lib/components/ui/table/index.js";
    import * as Menubar from "$lib/components/ui/menubar/index.js";


    let {data} = $props();


</script>


<div class='w-full px-6 py-8'>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold tracking-tight">User Overview</h2>
      <p class="text-muted-foreground mt-1">List of Users</p>
    </div>


      <div>
    <Table.Root>
    <Table.Caption>A list of your recent Repots</Table.Caption>
    <Table.Header>
    <Table.Row>
    <Table.Head >Id</Table.Head>
    <Table.Head>Profile</Table.Head>
    <Table.Head>Fullname</Table.Head>
    <Table.Head>Ratings</Table.Head>
    <Table.Head>Bio</Table.Head>
    <Table.Head>Action</Table.Head>
    </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.Users ?? [] as user}
    <Table.Row>

    <Table.Cell class="font-medium">{user.id}</Table.Cell>
   <Table.Cell>
    {#if user.profile === ''}
        <div class="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full font-bold">
        {user.firstname[0]}{user.lastname[0]}
        </div>
    {:else}
        <img src={user.profile} alt="Profile" class="w-10 h-10 rounded-full object-cover" />
    {/if}
    </Table.Cell>
    <Table.Cell>{user.firstname}  {user.lastname}</Table.Cell>
    <Table.Cell> {#if user.totalrating && user.totalrating !== 0}
        {(user.rating / user.totalrating).toFixed(1)}
        {:else}
             0
        {/if}</Table.Cell>
    <Table.Cell >{user.bio ?? 'No Bio'}</Table.Cell>
    <Table.Cell> <script lang="ts">
 import * as Menubar from "$lib/components/ui/menubar/index.js";
</script>
 
<Menubar.Root>
 <Menubar.Menu>
  <Menubar.Trigger>File</Menubar.Trigger>
  <Menubar.Content>
   <Menubar.Item>
    New Tab
    <Menubar.Shortcut>⌘T</Menubar.Shortcut>
   </Menubar.Item>
   <Menubar.Item>New Window</Menubar.Item>
   <Menubar.Separator />
   <Menubar.Item>Share</Menubar.Item>
   <Menubar.Separator />
   <Menubar.Item>Print</Menubar.Item>
  </Menubar.Content>
 </Menubar.Menu>
</Menubar.Root> </Table.Cell>
    </Table.Row>
    {/each}
    </Table.Body>
    </Table.Root>

        </div>   


    </div>
</div>