<script lang="ts">
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import AppSidebar from '$lib/components/ui/sidebar/app-sidebar.svelte'

    


let {children} = $props();

</script>


<Sidebar.Provider> 



    <AppSidebar/>

    <Sidebar.Inset>
    <main class='flex flex-col'>
           {@render children()}
    </main>
 
</Sidebar.Inset>
    </Sidebar.Provider>

