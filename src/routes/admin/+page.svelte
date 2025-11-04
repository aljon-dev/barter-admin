<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import HouseIcon from "@lucide/svelte/icons/house";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import FileTextIcon from "@lucide/svelte/icons/file-text";
  import UserIcon from "@lucide/svelte/icons/user-round";
  import LogOutIcon from "@lucide/svelte/icons/log-out";


  let {data} = $props();

  let counts = [
    {
      label: 'Total Users',
      count: (data.Users ?? []).length,
      icon: UserIcon,
      color: 'bg-blue-500'
    },
    {
      label: 'Transactions',
      count: (data.exchange ?? []).length,
      icon: InboxIcon,
      color: 'bg-green-500'
    },
    {
      label: 'Reports',
      count: (data.reportInfo ?? []).length,
      icon: FileTextIcon,
      color: 'bg-purple-500'
    }
  ];
</script>

<div class='w-full px-6 py-8'>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
      <p class="text-muted-foreground mt-1">Track your key metrics at a glance</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6  mx-auto">
      {#each counts as item}
        <Card.Root class="hover:shadow-lg transition-shadow duration-200">
          <Card.Content class="p-6">
            <div class="flex items-center gap-4">
              <div class="p-4 {item.color} bg-opacity-10 rounded-xl">
                <svelte:component this={item.icon} class="h-8 w-8 {item.color.replace('bg-', 'text-')}" />
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-muted-foreground uppercase tracking-wide">{item.label}</span>
                <span class="text-3xl font-bold mt-1">{item.count.toLocaleString()}</span>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  </div>
   <div class="flex flex-col">
     <h2 class="text-xl font-semibold "> Reports </h2>
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
      {#each (data.reportInfo ?? []).slice(0,5) as reports}
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