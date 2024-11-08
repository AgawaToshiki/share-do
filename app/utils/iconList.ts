import { IconType } from 'react-icons';
import { FaUser, FaPlus, FaChevronDown } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { MdSpaceDashboard, MdEditCalendar, MdDelete, MdSettings } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

export const iconList: Record<string, IconType> = {
  'dashboard': MdSpaceDashboard,
  'schedule': MdEditCalendar,
  'user': FaUser,
  'plus': FaPlus,
  'delete': MdDelete,
  'close': IoClose,
  'down': FaChevronDown,
  'setting': MdSettings,
  'check': FaCheck
}