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
        <p class="text-muted-foreground mt-1">
          A complete list of reports submitted by users.
        </p>
      </div>
    </div>

    <!-- Table Section -->
    <div class="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table.Root class="w-full">
        <Table.Caption class="text-sm text-muted-foreground p-4 bg-muted/30">
          Recent Reports Overview
        </Table.Caption>

        <Table.Header class="bg-muted/20">
          <Table.Row>
            <Table.Head class="px-4 py-3 text-left">Report #</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Reporter</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Reported Person</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Type</Table.Head>
            <Table.Head class="px-4 py-3 text-left">Status</Table.Head>
            <Table.Head class="px-4 py-3 text-center">Action</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {#each data.reportInfo ?? [] as reports (reports.reportId)}
            <Table.Row class="hover:bg-muted/10 transition">
              <Table.Cell class="px-4 py-3 font-medium">
                {reports.reportId}
              </Table.Cell>
              <Table.Cell class="px-4 py-3">
                {reports.complainerFirstName} {reports.complainerLastName}
              </Table.Cell>
              <Table.Cell class="px-4 py-3">
                {reports.complaineeFirstName} {reports.complaineeLastName}
              </Table.Cell>
              <Table.Cell class="px-4 py-3">{reports.report}</Table.Cell>
              <Table.Cell class="px-4 py-3">
                <span
                  class={`px-2 py-1 rounded-full text-xs font-medium ${
                    reports.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : reports.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {reports.status}
                </span>
              </Table.Cell>
              <Table.Cell class="px-4 py-3 text-center">
                <Menubar.Root>
                  <Menubar.Menu>
                    <Menubar.Trigger class="text-primary font-medium hover:underline cursor-pointer">
                      Update
                    </Menubar.Trigger>
                    <Menubar.Content align="end" class="w-36">
                      <Menubar.Item
                        class="cursor-pointer hover:bg-green-50 text-green-600"
                      >
                        Resolved
                      </Menubar.Item>
                      <Menubar.Separator />
                      <Menubar.Item
                        class="cursor-pointer hover:bg-red-50 text-red-600"
                      >
                        Decline
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
</div>