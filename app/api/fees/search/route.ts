import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/supabase";

export async function GET(request:Request){
  try{
    const q=new URL(request.url).searchParams.get("q")?.trim();
    if(!q||q.length<6)return NextResponse.json({error:"Enter a valid mobile number or Admission ID."},{status:400});
    const supabase=adminSupabase();
    let admissionQuery=supabase.from("admissions").select("id,admission_id,student_name,mobile");
    admissionQuery=q.toUpperCase().startsWith("RLZ-")?admissionQuery.eq("admission_id",q.toUpperCase()):admissionQuery.eq("mobile",q);
    const {data:students,error}=await admissionQuery;
    if(error)throw error;if(!students?.length)return NextResponse.json({fees:[]});
    const {data:fees,error:feeError}=await supabase.from("fees").select("id,admission_ref,month,amount,status").in("admission_ref",students.map(s=>s.id)).order("due_date",{ascending:false});
    if(feeError)throw feeError;
    return NextResponse.json({fees:(fees||[]).map(f=>{const s=students.find(x=>x.id===f.admission_ref)!;return{id:f.id,studentName:s.student_name,admissionId:s.admission_id,mobile:s.mobile,month:f.month,amount:Number(f.amount),status:f.status}})});
  }catch(error){console.error(error);return NextResponse.json({error:"Could not retrieve fee details."},{status:500})}
}
