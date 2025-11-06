import type { PageServerLoad,Actions } from "./$types";
import { createClient } from '@supabase/supabase-js';


  const PUBLIC_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY  = import.meta.env.VITE_SUPABASE_ROLEKEY


const supabaseAdmin = createClient(
  PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY // Must be service role key (not anon)
);


export const load: PageServerLoad = async ({locals:{supabase}}) => {

    const {data:Users, error:UserError} =  await supabase.from('users').select('*');

    if(UserError) return console.log(UserError.message);


    return{
         Users,
        
    }
    
};

export const actions: Actions = {
  

    DeleteUser: async ({ request }) => {
    const formData = await request.formData();
    const userId = formData.get('userId') as string;

    if (!userId) {
      return { success: false, message: 'Missing userId' };
    }

  
    const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (deleteAuthError) {
      console.error(deleteAuthError.message);
      return { success: false, message: 'Failed to delete from Auth' };
    }

 
    const { error: deleteDbError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('userid', userId);

    if (deleteDbError) {
      console.error(deleteDbError.message);
      return { success: false, message: 'Failed to delete from users table' };
    }

    return { 
      status:200,
      msg:'Successfully Deleted'
     };
  }



};  