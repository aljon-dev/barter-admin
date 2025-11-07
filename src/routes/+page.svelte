<script lang="ts">
import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
	import { redirect, type SubmitFunction } from "@sveltejs/kit";

	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import { toast, Toaster } from "svelte-sonner";

  let isLogin = $state(false);


  const handleLogin:SubmitFunction = () =>{
    isLogin = true;


    return async ({update,result}) => {
        
      const {data,status} =  result as {type:string,status:number,data:{status:number}}
      

      switch(data.status){
          case 200 : 
          toast.success('Login Successfully')
          isLogin = false;
          goto('/admin')
      return; 
        
          
          case 401 : 
          toast.error('Invalid Credentials Please Try again')
              isLogin = false;
          break;
          case 500 : 
          toast.error('Invalid Credentials Please Try again')
              isLogin = false;
          break;

          default:break;
      
      }

      update()
    }




  }



</script>

<Toaster/>
<div class="w-full h-screen bg-gray-200 flex items-center justify-center p-4">

<Card.Root class="w-full mx-auto max-w-sm rounded-lg">
 <Card.Header>
    <Card.Description>
            Enter your email below to login to your account
    </Card.Description>
 </Card.Header>
 <Card.Content> 
    <form method="POST" action="?/login" use:enhance={handleLogin}>
        <div class="mt-2 py-6">
    <div class="relative">
      <Label class="font-bold mb-2"> Email </Label>
       <div class="absolute flex w-full">
         <Input  class="border border-2 border-gray"  name="email" type="email" placeholder="johndoe@gmail.com" required /> 
       </div>
        </div>

        </div>
    <div class="mt-2 py-6">

    <div class="relative">
      <Label class="font-bold mb-2"> Password </Label>
       <div class="absolute flex w-full ">
         <Input  class="border border-2 border-gray" name="password" type="password" placeholder="********" required /> 
       </div>
        </div>
    </div>
    <div class="mt-4 relative w-full">
        <Button type="submit" class="w-full">{  isLogin == false  ? 'Sign In ' : 'Loading...'}</Button>
    </div>
     
    </form>
 </Card.Content>

</Card.Root>

</div>