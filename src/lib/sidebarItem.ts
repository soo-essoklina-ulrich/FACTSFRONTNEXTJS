// Type pour les icônes (supposant que vous utilisez des composants React)
import { ChildrenType } from '@/types/types';

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

type NavigationItem = TypeNave;

// @ts-ignore
export const menu: NavigationItem = {};
