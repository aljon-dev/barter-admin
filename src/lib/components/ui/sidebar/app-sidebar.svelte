<script lang="ts">
 import CalendarIcon from "@lucide/svelte/icons/calendar";
 import HouseIcon from "@lucide/svelte/icons/house";
 import InboxIcon from "@lucide/svelte/icons/inbox";
 import FileTextIcon from "@lucide/svelte/icons/file-text";
 import LogOutIcon from "@lucide/svelte/icons/log-out";
 import * as Sidebar from "$lib/components/ui/sidebar/index.js";
 import Button from "../button/button.svelte";
 
 let activeUrl = $state('admin');

 const chooseActiveUrl = (url: string) => {
  activeUrl = url;
 }

 // Menu items.
 const items = [
  {
   title: "Home",
   url: "/admin",
   icon: HouseIcon,
  },
  {
   title: "Transactions",
   url: "transactions",
   icon: InboxIcon,
  },
  {
   title: "Users",
   url: "/admin/Users",
   icon: CalendarIcon,
  },
  {
   title: "Reports",
   url: "/admin/Reports",
   icon: FileTextIcon,
  },
 ];
</script>
 
<Sidebar.Root>
 <Sidebar.Content class="flex flex-col h-full">
  <Sidebar.Group class="flex-1">
   <Sidebar.GroupLabel class="text-lg font-semibold mb-2">
    Barter App Admin
   </Sidebar.GroupLabel>
   <Sidebar.GroupContent>
    <Sidebar.Menu class="mt-6 space-y-1">
     {#each items as item (item.title)}
      <Sidebar.MenuItem>
       <Sidebar.MenuButton >
        {#snippet child({ props })}
         <a 
          href={item.url} 
          {...props} 
          onclick={() => chooseActiveUrl(item.url)}  
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 {activeUrl === item.url 
           ? 'bg-primary text-primary-foreground font-medium shadow-sm' 
           : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}"
         >
          <item.icon class="h-5 w-5" />
          <span>{item.title}</span>
         </a>
        {/snippet}
       </Sidebar.MenuButton>
      </Sidebar.MenuItem>
     {/each}
    </Sidebar.Menu>
   </Sidebar.GroupContent>
  </Sidebar.Group>

  <!-- Footer section for logout -->
  <div class="p-4 border-t mt-auto">
   <Button variant="outline" class="w-full justify-start gap-2">
    <LogOutIcon class="h-4 w-4" />
    Log Out
   </Button>
  </div>
 </Sidebar.Content>
</Sidebar.Root>