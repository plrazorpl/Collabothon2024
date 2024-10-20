import {
  BellIcon,
  FileIcon,
  HeartIcon,
  HomeIcon,
  MailIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from '../../assets';

const colors = [
  '#FFB6C1', // Light Pink
  '#ADD8E6', // Light Blue
  '#90EE90', // Light Green
  '#FFD700', // Gold
  '#FF69B4', // Hot Pink
  '#87CEFA', // Light Sky Blue
  '#FFA07A', // Light Salmon
  '#20B2AA', // Light Sea Green
];

export const initialServices = [
  {
    name: 'Notifications Service',
    icon: BellIcon,
    color: colors[0],
  },
  {
    name: 'File Storage',
    icon: FileIcon,
    color: colors[1],
  },
  {
    name: 'Favourites Manager',
    icon: HeartIcon,
    color: colors[2],
  },
  {
    name: 'Home Dashboard',
    icon: HomeIcon,
    color: colors[3],
  },
  {
    name: 'Mailbox Service',
    icon: MailIcon,
    color: colors[4],
  },
  {
    name: 'Search Engine',
    icon: SearchIcon,
    color: colors[5],
  },
  {
    name: 'Settings Control',
    icon: SettingsIcon,
    color: colors[6],
  },
  {
    name: 'User Profile',
    icon: UserIcon,
    color: colors[7],
  },
];
