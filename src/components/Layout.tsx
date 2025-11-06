import type { ReactNode } from 'react';
import { MobileNav } from './MobileNav'

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      <main className="container mx-auto max-w-6xl px-4 py-6">
        {children}
      </main>
      <MobileNav />
    </div>
  );
};
