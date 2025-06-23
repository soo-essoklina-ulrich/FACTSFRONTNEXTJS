import { ChildrenType } from '@/types/types';
import AuthGuard from '@/components/auth/AuthGuard';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import React from 'react';
import { SiteHeader } from '@/components/site-header';

const PrivateLayout = async ({ children }: ChildrenType) => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AuthGuard>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </AuthGuard>
    </SidebarProvider>
  );
};

export default PrivateLayout;
