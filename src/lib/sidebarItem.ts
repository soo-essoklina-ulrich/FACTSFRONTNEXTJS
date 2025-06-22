import type { Menytable, TypeNave } from '@/types/menu/NavigationType';
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
