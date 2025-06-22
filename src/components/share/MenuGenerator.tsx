'use client';

import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Reprise de vos types
type IconComponent = React.ComponentType<any>;

type NavItem = {
  title: string;
  url: string;
  icon?: IconComponent;
};

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

interface MenuGeneratorProps {
  items: TypeNave[];
  groupLabel?: string;
  className?: string;
}

export default function MenuGenerator({ items, groupLabel, className }: MenuGeneratorProps) {
  const { isMobile } = useSidebar();

  const renderMenuItem = (item: TypeNave, index: number) => {
    const Icon = item.icon || item.special?.icon;
    const hasItems = item.items && item.items.length > 0;
    const isActive = item.isActive;

    // Composant de base pour un élément de menu
    const MenuItemContent = () => (
      <>
        {Icon && <Icon className="h-4 w-4" />}
        <span className="flex-1">{item.title}</span>
        {hasItems && (
          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
        )}
      </>
    );

    // Si l'élément a un tooltip spécial
    if (item.special?.tooltip) {
      return (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                {hasItems ? (
                  <CollapsibleMenuItem item={item} index={index} />
                ) : (
                  <SimpleMenuItem item={item} index={index} />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.special.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    // Élément avec sous-éléments
    if (hasItems) {
      return <CollapsibleMenuItem key={index} item={item} index={index} />;
    }

    // Élément simple
    return <SimpleMenuItem key={index} item={item} index={index} />;
  };

  return (
    <SidebarGroup className={className}>
      {groupLabel && <SidebarGroupLabel className={'uppercase'}>{groupLabel}</SidebarGroupLabel>}
      <SidebarMenu>{items.map((item, index) => renderMenuItem(item, index))}</SidebarMenu>
    </SidebarGroup>
  );
}

// Composant pour un élément de menu simple
function SimpleMenuItem({ item, index }: { item: TypeNave; index: number }) {
  const Icon = item.icon || item.special?.icon;

  return (
    <SidebarMenuItem key={index}>
      <SidebarMenuButton
        asChild
        isActive={item.isActive}
        className={cn(item.nav === 'secondary' && 'text-muted-foreground', item.special?.className)}
      >
        <a href={item.url}>
          {Icon && <Icon className="h-4 w-4" />}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

// Composant pour un élément de menu avec sous-éléments
function CollapsibleMenuItem({ item, index }: { item: TypeNave; index: number }) {
  const Icon = item.icon || item.special?.icon;

  return (
    <Collapsible key={index} asChild defaultOpen={item.isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className={cn(
              item.nav === 'secondary' && 'text-muted-foreground',
              item.special?.className
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem, subIndex) => (
              <SidebarMenuSubItem key={subIndex}>
                <SidebarMenuSubButton asChild>
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

// Hook personnalisé pour simplifier l'utilisation
export function useMenuGenerator() {
  const createMenuItem = (
    title: string,
    url: string,
    options?: {
      icon?: IconComponent;
      isActive?: boolean;
      items?: Omit<NavItem, 'icon'>[];
      nav?: 'main' | 'secondary';
      group?: boolean;
      special?: {
        tooltip: string;
        className?: React.CSSProperties;
        icon?: IconComponent;
      };
    }
  ): TypeNave => {
    return {
      title,
      url,
      icon: options?.icon,
      isActive: options?.isActive,
      items: options?.items,
      nav: options?.nav,
      group: options?.group,
      special: options?.special,
    };
  };

  return { createMenuItem };
}
