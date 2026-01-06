import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

export interface Links {
  label: string;
  href: string;
}

export interface Sozials {
  href: string;
  altText: string;
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ChildrenProps = {
  children: ReactNode;
};

export type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
};

export interface CurrentUserProps {
  currentUser?: {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    password: string | null;
    isAdmin: boolean;
  } | null;
}

export interface Routes {
  path: string;
  resolved: string;
  priority: number;
}

export interface Theme {
  backgroundColor: string;
  themeColor: string;
}
