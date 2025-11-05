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
      <p class="text-muted-foreground mt-1">List of Subscribers</p>
    </div>

    <div>
      <Table.Root>
        <Table.Caption>A list of Subscribers</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>Id</Table.Head>
            <Table.Head>Profile</Table.Head>
            <Table.Head>Fullname</Table.Head>
            <Table.Head>PHP</Table.Head>
            <Table.Head>Expired At</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each data.InfoSubscribers ?? [] as user}
            <Table.Row>
              <Table.Cell class="font-medium">{user.id}</Table.Cell>
              <Table.Cell>
                {#if user.profile === '' || !user.profile}
                  <div class="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full font-bold text-gray-700">
                    {user.firstname[0]}{user.lastname[0]}
                  </div>
                {:else}
                  <img src={user.profile} alt="Profile" class="w-10 h-10 rounded-full object-cover" />
                {/if}
              </Table.Cell>
              <Table.Cell>{user.firstname} {user.lastname}</Table.Cell>
              <Table.Cell>₱{user.cash ?? '0.00'}</Table.Cell>
              <Table.Cell>{user.expired_at ? new Date(user.expired_at).toLocaleDateString() : 'N/A'}</Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
  </div>
</div>