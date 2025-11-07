<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import * as Menubar from "$lib/components/ui/menubar/index.js";
  import DeleteUser from "$lib/AlertDialogs/AdminUserList/DeleteUser.svelte";
  import { invalidate } from "$app/navigation";
  import { createClient } from "@supabase/supabase-js";

  const PUBLIC_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON;

  // Create Supabase client from public environment variables
  const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_ANON);

  let { data } = $props();

  let isOpenDelete = $state(false);
  let selectedUserId = $state<string>();
  let users = $state(data.Users ?? []);
  let subscription = $state<any>(null);

  // Set up Supabase realtime subscription using $effect
  $effect(() => {
    // Subscribe to changes in the users table
    subscription = supabase
      .channel('users-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events: INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'users' // Replace with your actual table name
        },
        (payload) => {
          handleRealtimePayload(payload);
        }
      )
      .subscribe();

    console.log('Subscribed to users realtime changes');

    // Cleanup function - runs when component unmounts or when dependencies change
    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
        console.log('Unsubscribed from users realtime changes');
      }
    };
  });

  // Handle realtime payload from Supabase
  const handleRealtimePayload = (payload: any) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    switch (eventType) {
      case 'INSERT':
        // Add new user to the beginning of the list
        users = [newRecord, ...users];
        break;

      case 'UPDATE':
        // Update existing user
        users = users.map(user => 
          user.id === newRecord.id ? { ...user, ...newRecord } : user
        );
        break;

      case 'DELETE':
        // Remove deleted user
        users = users.filter(user => user.id !== oldRecord.id);
        
        // Close delete modal if the deleted user was selected
        if (selectedUserId === oldRecord.id) {
          isOpenDelete = false;
          selectedUserId = undefined;
        }
        break;

      default:
        console.warn('Unknown event type:', eventType);
    }

    // Invalidate to refresh any derived data
    invalidate('app:users');
  };

  // Handle user deletion from modal
  const handleUserDeleted = (deletedUserId: string) => {
    users = users.filter(user => user.id !== deletedUserId);
    isOpenDelete = false;
    selectedUserId = undefined;
  };
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
          <span class="inline-flex items-center gap-1 ml-2 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
            ● Live
          </span>
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
          {#each users as user (user.id)}
            <Table.Row class="hover:bg-muted/10 transition">
              <Table.Cell class="px-4 py-3 font-medium">
                {user.id}
              </Table.Cell>

              <!-- Profile -->
              <Table.Cell class="px-4 py-3">
                {#if !user.profile || user.profile === ''}
                  <div
                    class="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary font-semibold rounded-full uppercase"
                  >
                    {user.firstname?.[0]}{user.lastname?.[0]}
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
                      <Menubar.Item
                        class="cursor-pointer hover:bg-red-50 text-red-600"
                        onclick={() => {
                          isOpenDelete = true;
                          selectedUserId = user.userid || user.id; // Use appropriate ID field
                        }}
                      >
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

  <!-- Delete Modal -->
  {#if isOpenDelete}
    <DeleteUser
      bind:isOpen={isOpenDelete}
      bind:userid={selectedUserId}
      
    />
  {/if}
</div>