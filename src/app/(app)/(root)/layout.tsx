import { SiteLayout } from '@/layouts/SiteLayout';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout withBackground>{children}</SiteLayout>;
}
