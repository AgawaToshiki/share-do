'use server'
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { registerSchedule } from '@/app/utils/supabase/supabaseFunctions';


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user = await getCurrentUser();
    if(!user || !user.id){
      redirect('/login')
    }
    const data: { title: string, description: string, startTime: Date, endTime: Date } = await req.json();
    await registerSchedule(user.id, data.title, data.description, data.startTime, data.endTime);

    return NextResponse.json({ status: 201 });
  }catch (error) {
    console.error("RegisterSchedule Error:", error)
    return NextResponse.json({ error: 'Internal Server Error' },{ status: 500 })
  }
}