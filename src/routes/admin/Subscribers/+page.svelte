<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import * as Menubar from "$lib/components/ui/menubar/index.js";

    let {data} = $props();
</script>
<div class="w-full px-6 py-10 bg-background min-h-screen">
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-semibold tracking-tight text-foreground">
          User Overview
        </h2>
        <p class="text-muted-foreground mt-1">List of active subscribers</p>
      </div>
     
    </div>

    <!-- Subscriber Table -->
    <div class="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table.Root class="w-full">
        <Table.Caption class="text-sm text-muted-foreground p-4 bg-muted/30">
          Current subscriber details and expiration status
        </Table.Caption>

        <Table.Header class="bg-muted/20">
          <Table.Row>
            <Table.Head class="px-4 py-3 text-left">ID</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Profile</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Full Name</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Amount (₱)</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Expires On</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {#each data.InfoSubscribers ?? [] as user (user.id)}
            <Table.Row class="hover:bg-muted/10 transition">
              <!-- ID -->
              <Table.Cell class="px-4 py-3 font-medium">
                {user.id}
              </Table.Cell>

              <!-- Profile -->
              <Table.Cell class="px-4 py-3">
                {#if !user.profile || user.profile === ''}
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

              <!-- Full Name -->
              <Table.Cell class="px-4 py-3 font-medium">
                {user.firstname} {user.lastname}
              </Table.Cell>

              <!-- PHP Amount -->
              <Table.Cell class="px-4 py-3 font-semibold text-foreground">
                ₱{(user.cash ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Table.Cell>

              <!-- Expired At -->
              <Table.Cell class="px-4 py-3">
                {#if user.expired_at}
                  {#if new Date(user.expired_at) < new Date()}
                    <span class="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                      Expired ({new Date(user.expired_at).toLocaleDateString()})
                    </span>
                  {:else}
                    <span class="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      Active until {new Date(user.expired_at).toLocaleDateString()}
                    </span>
                  {/if}
                {:else}
                  <span class="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                    N/A
                  </span>
                {/if}
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
  </div>
</div>
