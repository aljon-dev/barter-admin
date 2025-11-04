<script lang="ts">
import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";



</script>
<div class="w-full h-screen bg-gray-200 flex items-center justify-center p-4">

<Card.Root class="w-full mx-auto max-w-sm rounded-lg">
 <Card.Header>
    <Card.Description>
            Enter your email below to login to your account
    </Card.Description>
 </Card.Header>
 <Card.Content> 
    <form>
        <div class="mt-2 py-6">
    <div class="relative">
      <Label class="font-bold mb-2"> Email </Label>
       <div class="absolute flex w-full">
         <Input  class="border border-2 border-gray" type="email" placeholder="johndoe@gmail.com" required /> 
       </div>
        </div>

        </div>
    <div class="mt-2 py-6">

    <div class="relative">
      <Label class="font-bold mb-2"> Password </Label>
       <div class="absolute flex w-full ">
         <Input  class="border border-2 border-gray" type="password" placeholder="********" required /> 
       </div>
        </div>
    </div>
    <div class="mt-4 relative w-full">
        <Button class="w-full"> Sign In</Button>
    </div>
     
    </form>
 </Card.Content>

</Card.Root>

</div>