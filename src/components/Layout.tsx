import type { ReactNode } from 'react';
import { MobileNav } from './MobileNav'
import { AppSidebar } from './AppSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background pb-20 md:pb-6">
        <AppSidebar />

        <SidebarInset className='flex-1'>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
            <SidebarTrigger className="hidden md:flex" />
            <h1 className="text-lg font-semibold md:text-xl">Finance Tracker</h1>
          </header>

          <main className="container mx-auto max-w-6xl px-4 py-6">
            {children}
          </main>

          <MobileNav />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
