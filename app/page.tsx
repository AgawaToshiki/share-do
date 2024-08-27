import { getAllUser, getUser, isAdminUser } from './utils/supabaseFunctions';
import { getCurrentUser } from './utils/auth';
import { redirect } from 'next/navigation'
import { Database } from '../database.types';
import Main from './components/layouts/Main';
import UserList from "./components/UserList";
import MyStatus from './components/MyStatus';
import RegisterSchedule from './components/RegisterSchedule';
import SectionField from './components/layouts/SectionField';


type User = Database['public']['Tables']['users']['Row'];

export default async function DashBoard() {
  const authUser = await getCurrentUser();
  if(!authUser || !authUser.id){
		redirect('/login')
	}
  const user = await getUser(authUser.id);
  if(!user){
    redirect('/login')
  }
  const isAdmin = isAdminUser(user);

  const data: User[] | null = await getAllUser();

  return (
    <>
      <Main isAdmin={isAdmin}>
        <div className="flex flex-col mb-10">
          <SectionField sectionTitle="マイステータス">
            <MyStatus user={user}/>
          </SectionField>
        </div>
        <div className="mb-6">
          <h2>DashBoard</h2>
        </div>
        <div className="flex">
          <UserList data={data}/>
        </div>
      </Main>
    </>
  );
}
