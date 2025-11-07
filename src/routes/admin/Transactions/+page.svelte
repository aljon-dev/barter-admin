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
            <Table.Head class="px-4 py-3 text-left">Requester Name</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Receiver Name</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Status</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Is Transaction Rated</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {#each data.transactInfo ?? [] as transaction}
            <Table.Row class="hover:bg-muted/10 transition">
          
              <Table.Cell class="px-4 py-3 font-medium">
                {transaction.transactionId}
              </Table.Cell>

         

            
              <Table.Cell class="px-4 py-3 font-medium">
                {transaction.requester}
              </Table.Cell>

        
              <Table.Cell class="px-4 py-3 font-semibold text-foreground">
               {transaction.receiver}
              </Table.Cell>

      
              <Table.Cell class="px-4 py-3">
                {transaction.status}
              </Table.Cell>

              <Table.Cell class="px-4 py-3">
                {transaction.israted}
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
  </div>
</div>
