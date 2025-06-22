// import {
//   IconCamera,
//   IconChartBar,
//   IconDashboard,
//   IconDatabase,
//   IconFileAi,
//   IconFileDescription,
//   IconFileWord,
//   IconFolder,
//   IconHelp,
//   IconListDetails,
//   IconReport,
//   IconSearch,
//   IconSettings,
//   IconUsers,
// } from '@tabler/icons-react';

// Type pour les icônes (supposant que vous utilisez des composants React)
type IconComponent = React.ComponentType<any>;

// Type pour un élément de navigation simple
type NavItem = {
  title: string;
  url: string;
  icon?: IconComponent;
};

// Type pour un élément de navigation avec sous-éléments
type NavItemWithSub = NavItem & {
  isActive?: boolean;
  items?: Omit<NavItem, 'icon'>[];
};

type TypeNave = { nav?: 'main' | 'secondary'; group?: boolean } & NavItemWithSub;

// Alternative avec un type union si vous préférez
type NavigationItem = TypeNave;

// export const data = {
//   navMain: [
//     {
//       title: 'Tableau',
//       url: '/home',
//       icon: IconDashboard,
//     },
//     {
//       title: 'Lifecycle',
//       url: '#',
//       icon: IconListDetails,
//     },
//     {
//       title: 'Analytics',
//       url: '#',
//       icon: IconChartBar,
//     },
//     {
//       title: 'Projects',
//       url: '#',
//       icon: IconFolder,
//     },
//     {
//       title: 'Team',
//       url: '#',
//       icon: IconUsers,
//     },
//   ],
//   navClouds: [
//     {
//       title: 'Capture',
//       icon: IconCamera,
//       isActive: true,
//       url: '#',
//       items: [
//         {
//           title: 'Active Proposals',
//           url: '#',
//         },
//         {
//           title: 'Archived',
//           url: '#',
//         },
//       ],
//     },
//     {
//       title: 'Proposal',
//       icon: IconFileDescription,
//       url: '#',
//       items: [
//         {
//           title: 'Active Proposals',
//           url: '#',
//         },
//         {
//           title: 'Archived',
//           url: '#',
//         },
//       ],
//     },
//     {
//       title: 'Prompts',
//       icon: IconFileAi,
//       url: '#',
//       items: [
//         {
//           title: 'Active Proposals',
//           url: '#',
//         },
//         {
//           title: 'Archived',
//           url: '#',
//         },
//       ],
//     },
//   ],
//   navSecondary: [
//     {
//       title: 'Settings',
//       url: '#',
//       icon: IconSettings,
//     },
//     {
//       title: 'Get Help',
//       url: '#',
//       icon: IconHelp,
//     },
//     {
//       title: 'Search',
//       url: '#',
//       icon: IconSearch,
//     },
//   ],
//   documents: [
//     {
//       name: 'Data Library',
//       url: '#',
//       icon: IconDatabase,
//     },
//     {
//       name: 'Reports',
//       url: '#',
//       icon: IconReport,
//     },
//     {
//       name: 'Word Assistant',
//       url: '#',
//       icon: IconFileWord,
//     },
//   ],
// };

// @ts-ignore
export const menu: NavigationItem = {};
