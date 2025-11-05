import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({locals:{supabase}}) => {

    const {data:Users, error:UserError} =  await supabase.from('users').select('*');

    if(UserError) return console.log(UserError.message);

    const {data:subscribers,error:SubcriberError} = await supabase.from('subscribers').select('*');


    const InfoSubscribers = subscribers?.map((subscriber)=>{
        const users = Users.find((user)=> user.userid === subscriber.userid);
        
        
        return{
            firstname:users.firstname,
            lastname:users.lastname,
            profile:users.profile,
            expired_at:subscriber.expired_at,
            cash:299,
        }

    }) 

    console.log(InfoSubscribers);

    





    return{
            Users,
            InfoSubscribers
         
    }




    
};