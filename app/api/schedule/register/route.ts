'use server'
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/app/utils/supabase/auth';
import { getUser, registerSchedule } from '@/app/utils/supabase/supabaseFunctions';
import { APIError } from '@/app/utils/exceptions';
import { checkSchedule } from '@/app/utils/validation';


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const authUser = await getCurrentUser();
    if(!authUser || !authUser.id){
      throw new APIError(401, 'Unauthorized User');
    }
    const user = await getUser(authUser.id);
    if(!user){
      throw new APIError(401, 'Unauthorized User');
    }

    const data: { title: string, description: string, startTime: string, endTime: string } = await req.json();
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);

    const isValidData = checkSchedule(data.title, startTime, endTime);
    if(!isValidData) {
      throw new APIError(400, 'Invalid schedule data');
    }
    
    await registerSchedule(user.id, data.title, data.description, startTime, endTime);

    return NextResponse.json({ status: 201 });

  }catch (error) {
    console.error("RegisterSchedule Error:", error);
    if(error instanceof APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}