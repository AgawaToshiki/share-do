import { Database } from '../../../database.types';
import { supabase } from '../../lib/supabase';


type User = Database['public']['Tables']['users']['Row'];
type Schedule = Database['public']['Tables']['schedules']['Row'];

type UserWithSchedule = Pick<User, 'id' | 'displayName' | 'role'> & {
  schedules: Pick<Schedule, 'user_id' | 'id' | 'title' | 'description' | 'start_time' | 'end_time'>[] | null
}

export async function getAllUser(): Promise<User[] | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id,created_at,email,role,displayName,status,updated_at');
  if(error) {
    console.error('Error getUsers:', error);
    throw new Error(`Error getUsers:${error.message}`);
  }
  return data
}

export async function getUser(id: string): Promise<User | null> {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if(error) {
    console.error("Error fetching user:", error);
    throw new Error(`Error fetching user:${error.message}`);
  }

  return user
}

export async function registerUser(userId: string, email: string, displayName: string): Promise<void> {
  const { error } = await supabase
  .from('users')
  .insert({ 'id': userId, 'email': email, 'displayName': displayName, 'role': 'user' });
  if(error) {
    console.error('signUpError:', error);
    throw new Error(`signUpError:${error.message}`);
  }
}

export async function updateUser(userId: string, role: string, displayName: string, email: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ 'role': role, 'displayName': displayName, 'email': email })
    .eq('id', userId);

  if(error) {
    console.error('Error updating user:', error);
    throw new Error(`updateUserError:${error.message}`);
  }
}

export async function updateStatus(userId: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ 'status': status })
    .eq('id', userId);
  if(error) {
    console.error('Error updating status:', error);
    throw new Error(`updateStatusError:${error.message}`);
  }
}

export async function deleteUser(id: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
    if(error) {
      console.error('deleteUserError:', error);
      throw new Error(`deleteUserError:${error.message}`);
    }
}

export async function getUserWithSchedules(id: string): Promise<UserWithSchedule | null> {
  const { data, error } = await supabase
    .from('users')
    .select(`
      id,
      displayName,
      role,
      schedules (
        user_id,
        id,
        title,
        description,
        start_time,
        end_time
      )      
    `)
    .eq("id", id)
    .single();

  if(error) {
    console.error('getDataError:', error);
    throw new Error(`getDataError:${error.message}`);
  }

  return data
}


export async function getScheduleId(id: string): Promise<{ id: string } | null> {
  const { data, error } = await supabase
    .from('schedules')
    .select('id')
    .eq("id", id)
    .single();

  if(!data || error) {
    console.error('getScheduleError:', error);
    throw new Error(`getScheduleError:${error.message}`);
  }
  
  return data
}

export async function registerSchedule(userId: string, title: string, description: string, startTime: Date, endTime: Date): Promise<void> {
  const { error } = await supabase
    .from('schedules')
    .insert({ 'user_id': userId, 'title': title, 'description': description, 'start_time': startTime, 'end_time': endTime })

  if(error) {
    console.error('registerScheduleError:', error);
    throw new Error(`registerScheduleError:${error.message}`);
  }
}

export async function updateSchedule(id: string, title: string, description: string, startTime: Date, endTime: Date): Promise<void> {
  const { error } = await supabase
    .from('schedules')
    .update({ 'title': title, 'description': description, 'start_time': startTime, 'end_time': endTime })
    .eq("id", id)
    .single()

  if(error) {
    console.error('updateScheduleError:', error);
    throw new Error(`updateScheduleError:${error.message}`);
  }
}

export async function deleteSchedule(id: string): Promise<void> {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq("id", id)
    .single()

  if(error) {
    console.error('deleteScheduleError:', error);
    throw new Error(`deleteScheduleError:${error.message}`);
  }
}