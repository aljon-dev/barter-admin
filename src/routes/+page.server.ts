import { goto } from "$app/navigation";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {


    login: async ({locals:{supabase},request})=>{

        const formData = await request.formData();


        const email = formData.get('email') as string;
        const password = formData.get('password') as string;


    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
        })

        if (error) {
           return{
            status:500,
            msg:error.message
           }
        }

       
        
        return{
            status:200,
            msg:'Successfully Login'
        }

    

    } 




};