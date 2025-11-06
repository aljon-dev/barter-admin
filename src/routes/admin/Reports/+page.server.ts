import type { Actions, PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({locals:{supabase}}) => {

    const {data:Users, error:UserError} =  await supabase.from('users').select('*');

    if(UserError) return console.log(UserError.message);


    const {data:exchange,error:exchangeError} = await supabase.from('exchange').select('*');

    if(exchangeError) return console.log(exchangeError.message);
    
    const {data:reports,error:ReportError} = await supabase.from('reports').select('*');

  const reportInfo = reports?.map((report) => {
  const complainee = Users?.find((user) => user.userid === report.usercomplaineeid);
  const complainer = Users?.find((user) => user.userid === report.usercomplainantid);

  return {
    reportId: report.id,

    // Complainee (person being reported)
    complaineeId: complainee?.userid ?? null,
    complaineeFirstName: complainee?.firstname ?? '',
    complaineeLastName: complainee?.lastname ?? '',
    complaineeProfile: complainee?.profile ?? '',

    // Complainer (person who reported)
    complainerId: complainer?.userid ?? null,
    complainerFirstName: complainer?.firstname ?? 'No Data',
    complainerLastName: complainer?.lastname ?? 'No Data',


    report: report.reports,
    status: report.status,
    createdAt: report.created_at,
  };
});

  

    return{
        Users,
        exchange,
        reportInfo,

    }


};


export const actions: Actions = {


    resolved: async ({ locals: { supabase }, request }) => {

      const formData = await request.formData();
      const reportId = formData.get('reportId') as string;
      

      const {error:updateError} = await supabase.from('reports').update({
        status:'Resolved'
      }).eq('id',reportId);
      

      if(updateError) return {
        status:500,
        msg:updateError.message
      }

      return{
         status:200,
         msg:'Successfully Resolved',
      }
    
    },

    decline: async ({locals:{supabase},request}) =>{


      
      const formData = await request.formData();
      const reportId = formData.get('reportId') as string;
      

      const {error:updateError} = await supabase.from('reports').update({
        status:'Declined'
      }).eq('id',reportId);
      

      if(updateError) return {
        status:500,
        msg:updateError.message
      }

      return{
         status:200,
         msg:'Successfully Declined',
      }



    } 

  
};