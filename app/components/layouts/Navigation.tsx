'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from '../../components/elements/icon/Icon';

type Props = {
  isAdmin: boolean;
  id: string;
}

const Navigation = ({ isAdmin, id }: Props) => {

  const pathname = usePathname();

  const lists = [
    {
      href: "/",
      pathname: "/",
      title: "ダッシュボード",
      icon: "dashboard",
      showFlag: true,
    },
    {
      href: `/${id}/schedule#currentTimeBorder`,
      pathname: `/${id}/schedule`,
      title: "スケジュール管理",
      icon: "schedule",
      showFlag: true
    },
    {
      href: "/user",
      pathname: "/user",
      title: "ユーザー管理",
      icon: "user",
      showFlag: isAdmin
    },
    {
      href: "/work",
      pathname: "/work",
      title: "勤怠管理",
      icon: "work",
      showFlag: isAdmin
    },
    {
      href: "/setting",
      pathname: "/setting",
      title: "設定",
      icon: "setting",
      showFlag: true
    },
  ]
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        {lists.map((list) => (
          list.showFlag && (
            <li key={list.href}>
              <Link 
                href={list.href}
                className={`${list.pathname === pathname && "bg-blue-500 font-semibold"} flex items-center gap-2 rounded-sm px-4 py-2 transition duration-200 ease-in-out cursor-pointer hover:bg-blue-500`}
              >
                <Icon icon={list.icon} color="#fff" size={20} />
                {list.title}
              </Link>
            </li>
          )
        ))}
      </ul>
    </nav>
  )
}

export default Navigation