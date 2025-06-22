// Type pour les icônes (supposant que vous utilisez des composants React)
import { ChildrenType } from '@/types/types';
import {
  BriefcaseBusiness,
  FileBox,
  FileUser,
  GalleryHorizontalEnd,
  LayoutDashboard,
  Regex,
  Tag,
  UsersRound,
} from 'lucide-react';
import { IconUsersGroup } from '@tabler/icons-react';

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

type TypeNave = {
  special?: {
    tooltip: string;
    className?: React.CSSProperties;
    icon?: IconComponent;
  };
} & { nav?: 'main' | 'secondary'; group?: boolean } & NavItemWithSub;

type Menytable = {
  name: string;
  menu: TypeNave[];
};

const menuParGroups: Menytable[] = [
  {
    name: 'dashboard',
    menu: [
      {
        title: 'Tableau de Bord',
        url: '/home',
        icon: LayoutDashboard,
      },
    ] as TypeNave[],
  },
  {
    name: 'Utilisateur',
    menu: [
      {
        title: 'Utilisateur',
        url: '/user',
        icon: UsersRound,
      },
    ] as TypeNave[],
  },
  {
    name: 'PROJET-CLIENT',
    menu: [
      {
        title: 'Projet',
        url: '/projet',
        icon: BriefcaseBusiness,
      },
      {
        title: 'Client',
        url: '/client',
        icon: Regex,
      },
    ] as TypeNave[],
  },
  {
    name: 'DOSSIER',
    menu: [
      {
        title: 'Proforma',
        url: '/documents/proforma',
        icon: FileBox,
      },
      {
        title: 'Borderau',
        url: '/documents/bordeau',
        icon: GalleryHorizontalEnd,
      },
      {
        title: 'Facture',
        url: '/documents/facture',
        icon: FileUser,
      },
    ] as TypeNave[],
  },
  {
    name: 'Gestion Article',
    menu: [
      {
        title: 'Article',
        url: '/article',
        icon: Tag,
      },
    ] as TypeNave[],
  },
];

export default menuParGroups;
