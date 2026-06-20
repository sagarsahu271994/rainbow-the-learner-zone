import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/supabase";

export const runtime="nodejs";
export async function POST(request:Request){
  try{
    const form=await request.formData();const feeId=String(form.get("feeId")||"");const file=form.get("screenshot");
    if(!feeId||!(file instanceof File)||!file.type.startsWith("image/"))return NextResponse.json({error:"A valid payment screenshot is required."},{status:400});
    if(file.size>5_000_000)return NextResponse.json({error:"Screenshot must be under 5 MB."},{status:400});
    const supabase=adminSupabase();const path=`${feeId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g,"-")}`;
    const {error:uploadError}=await supabase.storage.from("payment-screenshots").upload(path,file,{contentType:file.type});if(uploadError)throw uploadError;
    const {error}=await supabase.from("payment_submissions").insert({fee_id:feeId,screenshot_path:path});if(error)throw error;
    return NextResponse.json({ok:true},{status:201});
  }catch(error){console.error(error);return NextResponse.json({error:"Could not upload payment screenshot."},{status:500})}
}
