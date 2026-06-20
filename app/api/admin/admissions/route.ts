import { NextResponse } from "next/server";
import { adminSupabase,requireAdmin } from "@/lib/supabase";
export async function GET(request:Request){if(!await requireAdmin(request))return NextResponse.json({error:"Unauthorized"},{status:401});const {data,error}=await adminSupabase().from("admissions").select("id,admission_id,student_name,mobile,class_name,preferred_batch,created_at").order("created_at",{ascending:false});if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({admissions:data})}
