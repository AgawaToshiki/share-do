import React from 'react'
import { Database } from '../../database.types';
import SectionField from '../components/layouts/SectionField';


type User = Database['public']['Tables']['users']['Row'];

type Props = {
  user: User;
}

const MyStatus = ({ user }: Props) => {
  return (
    <>
      <div className="mb-6">
        <h2>マイステータス</h2>
      </div>
      <div>ユーザー名：{user.displayName}</div>
        <div className="flex items-center gap-1.5">
          <div>状態：</div>
          {user.status === 'online' 
            ? 
            (<div>オンライン</div>)
            : user.status ==='leave' 
            ? 
            (<div>退席中</div>) 
            : 
            (<div>オフライン</div>)
          }
          <div className={`w-4 h-4 rounded-full ${user.status === 'online' ? 'bg-green-400' : user.status === 'leave' ? 'bg-red-400' : 'bg-gray-400'}`}></div>
        </div>
        <div>スケジュール</div>
        <p>9:00~16:00 </p>
    </>
  )
}

export default MyStatus