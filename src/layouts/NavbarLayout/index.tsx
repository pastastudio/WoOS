import { Button } from '@/components/ui/button';
import type { getDictionary } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { LayoutLinkItem } from '@/layouts/shared/link-item';
import type { Links } from '@/types/index';
import {
  BookHeartSolid,
  HomeSolid,
  SparklesSolid,
  UserSolid,
} from '@2hoch1/pixel-icon-library-react';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { Fragment, type ReactElement } from 'react';
import * as React from 'react';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

// Must stay in sync with the --color-chrome-background token in globals.css.
export const SITE_CHROME_BACKGROUND = '#161a24';
// Literal Tailwind class (not built via template interpolation) so the
// arbitrary-value utility is statically discoverable by Tailwind's scanner.
export const SITE_CHROME_BACKGROUND_CLASS = 'bg-[#161a24]';

export interface NavbarData {
  logoUrl: string;
  fixed: boolean;
  backgroundColor?: string;
  navLinks: Links[];
}

/** Builds the site navbar's default content from the locale dictionary. */
export function getNavbarData(
  dict: Dictionary,
  options?: { withBackground?: boolean }
): NavbarData {
  return {
    logoUrl: `/`,
    fixed: false,
    ...(options?.withBackground ? { backgroundColor: SITE_CHROME_BACKGROUND } : {}),
    navLinks: [
      { label: dict.nav.home, href: `/`, icon: HomeSolid },
      { label: dict.nav.quests, href: `/quests`, icon: SparklesSolid },
      { label: dict.nav.docs, href: `/docs/chapter_1`, icon: BookHeartSolid },
    ],
  };
}

const navbarVariants = cva('z-[100] grid h-auto w-auto grid-cols-[1fr_auto_1fr] items-center p-4', {
  variants: {
    fixed: {
      true: 'fixed top-0 right-0 left-0 z-50',
      false: '',
    },
    borderLine: {
      true: 'border-border border-b',
      false: '',
    },
  },
  defaultVariants: {
    fixed: false,
    borderLine: false,
  },
});

interface NavbarProps extends React.ComponentProps<'header'>, VariantProps<typeof navbarVariants> {
  backgroundColor?: string | false;
  frontColor?: string;
}

function Navbar({
  className,
  backgroundColor,
  frontColor,
  fixed,
  borderLine,
  style,
  ...props
}: NavbarProps) {
  return (
    <header
      data-slot="navbar"
      className={cn(navbarVariants({ fixed, borderLine, className }))}
      style={{
        backgroundColor:
          backgroundColor === false ? 'transparent' : backgroundColor || 'var(--background)',
        color: frontColor || 'var(--foreground)',
        ...style,
      }}
      {...props}
    />
  );
}

function NavbarLogo({
  className,
  href = '/',
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="navbar-logo"
      href={href}
      aria-label="Home"
      className={cn(
        'hover:text-muted-foreground col-start-1 flex items-center gap-3 justify-self-start',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

function NavbarNav({ className, children, ...props }: React.ComponentProps<'ul'>) {
  return (
    <nav className="col-start-2 flex justify-center justify-self-center">
      <ul
        data-slot="navbar-nav"
        className={cn(
          'font-pixelify flex gap-12 text-xl font-semibold text-[var(--color-default-font)]',
          className
        )}
        {...props}
      >
        {children}
      </ul>
    </nav>
  );
}

function NavbarLink({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <LayoutLinkItem
      slot="navbar-link"
      className={cn('hover:text-muted-foreground gap-2', className)}
      {...props}
    >
      {children}
    </LayoutLinkItem>
  );
}

function NavbarActions({ className, children, ...props }: React.ComponentProps<'div'>) {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <div
      data-slot="navbar-actions"
      className={cn('col-start-3 flex items-center justify-self-end', className)}
      {...props}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          {item}
          {index < items.length - 1 && (
            <div data-slot="navbar-actions-separator" className="bg-border mx-1 h-[1.3rem] w-px" />
          )}
        </Fragment>
      ))}
    </div>
  );
}

function NavbarAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="navbar-action"
      className={cn('flex items-center px-[0.3rem]', className)}
      {...props}
    />
  );
}

/**
 * Login button component
 */
function LoginButton(): ReactElement {
  return (
    <Link href="/login" passHref>
      <Button variant="ghost" size="icon" aria-label="Login">
        <UserSolid className="size-5" />
      </Button>
    </Link>
  );
}

/**
 * User profile button component
 */
function ProfileButton(): ReactElement {
  return (
    <Link href="/profile" passHref>
      <Button variant="ghost" size="icon" aria-label="Profil öffnen">
        <UserSolid className="size-5" />
      </Button>
    </Link>
  );
}

export {
  LoginButton,
  Navbar,
  NavbarAction,
  NavbarActions,
  NavbarLink,
  NavbarLogo,
  NavbarNav,
  ProfileButton,
};
