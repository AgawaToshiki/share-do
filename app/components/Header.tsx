import React from 'react';
import Link from 'next/link';
import { isAdminUser } from '../utils/supabaseFunctions';
import { getCurrentUser } from '../utils/auth';
import { redirect } from 'next/navigation';
import SignOutButton from './SignOutButton';

const Header = async() => {
  const userId = await getCurrentUser();
  if(!userId){
		return null
	}
  const isAdmin = await isAdminUser(userId);

  return (
    <header className="bg-green-200">
      <div>
        <nav>
          <ul>
            <li><Link href="/">ダッシュボード</Link></li>
            <li className={`${isAdmin ? "block" : "hidden"}`}><Link href="/user">ユーザー管理</Link></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </div>
      <div>
        <SignOutButton />
      </div>
    </header>
  )
}

export default Header