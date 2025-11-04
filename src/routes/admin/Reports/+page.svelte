<script lang="ts">
 import * as Table from "$lib/components/ui/table/index.js";
 

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
    <Table.Head >Report number</Table.Head>
    <Table.Head>Reporter </Table.Head>
    <Table.Head>Person to report</Table.Head>
    <Table.Head> Reports Type</Table.Head>
    <Table.Head>Status</Table.Head>
    </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.reportInfo ?? [] as reports}
    <Table.Row>

    <Table.Cell class="font-medium">{reports.reportId}</Table.Cell>
    <Table.Cell>{reports. complainerFirstName}  {reports.complainerLastName}</Table.Cell>
    <Table.Cell>{reports. complaineeFirstName}  {reports.complaineeLastName}</Table.Cell>
    <Table.Cell>{reports.report}</Table.Cell>
    <Table.Cell >{reports.status}</Table.Cell>
    
    </Table.Row>
    {/each}
    </Table.Body>
    </Table.Root>

        </div>    



    </div>
</div>