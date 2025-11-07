import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({locals:{supabase}}) => {

    const {data:Users, error:UserError} =  await supabase.from('users').select('*');

    if(UserError) return console.log(UserError.message);

    const {data:transact, error:ErrorTransact} = await supabase.from('exchange').select('*').eq('status','Negotiation');


    const transactInfo = transact?.map((transactions)=>{
        const request_users = Users?.find((user)=> user.userid === transactions.request_user_id);
        const receiver_user = Users?.find((user)=> user.userid === transactions.receiver_user_id);

        return{
            transactionId:transactions.id,
            requester:request_users.firstname + '' + request_users.lastname,
            requester_profile:request_users.profile,
            receiver:receiver_user.firstname + '' + receiver_user.lastname,
            receiver_profile:receiver_user.profile,
            status:transactions.status,
            israted:transactions.israted,
         }
    })

    console.log(transactInfo);
    


    return{
        Users,
        transactInfo ,   
    }




    
};