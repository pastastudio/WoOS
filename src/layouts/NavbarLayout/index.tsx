import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Links } from '@/types/index';
import { UserSolid } from '@2hoch1/pixel-icon-library-react';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { Fragment, ReactElement } from 'react';

import BannerSvg from '@/assets/banner.svg';
import LogoSvg from '@/assets/logo.svg';
// TODO: Uncomment when auth is ready
// import { auth } from '@/auth';
import { SearchBarToggle } from '@/components/searchbar-toggle';

export interface NavbarProps {
  logoUrl?: string | null | undefined;
  logo?: boolean | null | undefined;
  links: Links[] | null | undefined;
  searchBar?: boolean | null | undefined;
  loginButton?: boolean | null | undefined;
  backgroundColor?: string | false | null | undefined;
  borderLine?: boolean | null | undefined;
  frontColor?: string | null | undefined;
  fixed?: boolean | null | undefined;
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

// ============================================================================
// Component Sections
// ============================================================================

/**
 * Logo component with brand assets
 */
const LogoComponent = (): ReactElement => {
  return (
    <div className="hover:text-muted-foreground flex items-center gap-3">
      <LogoSvg className="h-8 w-auto" />
      <BannerSvg className="h-6 w-auto" />
    </div>
  );
};

/**
 * Navigation links component
 */
const NavLinks = ({ links }: { links: Links[] }): ReactElement => {
  return (
    <ul className="font-pixelify flex gap-12 text-xl font-semibold text-[var(--color-default-font)]">
      {links.map(link => {
        const Icon = link.icon;
        return (
          <li key={link.href} className="list-none">
            <Link href={link.href} className="hover:text-muted-foreground flex items-center gap-2">
              {Icon && <Icon className="size-5" />}
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

/**
 * Login button component
 */
const LoginButton = (): ReactElement => {
  return (
    <Link href="/login" passHref>
      <Button variant="ghost" size="icon" aria-label="Login">
        <UserSolid className="size-5" />
      </Button>
    </Link>
  );
};

/**
 * User profile button component
 */
const ProfileButton = (): ReactElement => {
  return (
    <Link href="/profile" passHref>
      <Button variant="ghost" size="icon" aria-label="Profil öffnen">
        <UserSolid className="size-5" />
      </Button>
    </Link>
  );
};

/**
 * Right section component with actions
 */
const RightSection = ({
  searchBar,
  loginButton,
  session,
}: {
  searchBar?: boolean | null;
  loginButton?: boolean | null;
  session: unknown;
}): ReactElement => {
  const elements = [];

  if (searchBar) elements.push(<SearchBarToggle key="search" />);
  if (session && typeof session === 'object' && 'user' in session) {
    elements.push(<ProfileButton key="profile" />);
  } else if (loginButton) {
    elements.push(<LoginButton key="login" />);
  }

  return (
    <div className="flex items-center gap-1 justify-self-end">
      {elements.map((element, index) => (
        <Fragment key={`element-${index}`}>
          <div className="flex items-center px-[0.3rem]">{element}</div>
          {index < elements.length - 1 && (
            <div key={`separator-${index}`} className="bg-border mx-1 h-[1.3rem] w-px" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

/**-
 * Navbar
 * Renders the navigation bar with optional logo, links, search bar, dark mode toggle, and login button.
 *
 * @param {NavbarProps} props - The properties for the Navbar component.
 * @returns {ReactElement} The Navbar component.
 */
export default function Navbar({
  logoUrl,
  logo,
  links,
  searchBar,
  loginButton,
  backgroundColor,
  borderLine,
  frontColor,
  fixed,
}: NavbarProps): ReactElement {
  // TODO: Uncomment when auth is ready
  // const session = await auth();
  const session = null; // Placeholder

  // Inline styles for dynamic colors
  const navbarStyles = {
    backgroundColor:
      backgroundColor === false ? 'transparent' : backgroundColor || 'var(--background)',
    color: frontColor || 'var(--foreground)',
  };

  return (
    <header
      className={cn(navbarVariants({ fixed: Boolean(fixed), borderLine: Boolean(borderLine) }))}
      style={navbarStyles}
    >
      {/* Left Section: Logo */}
      <div className="justify-self-start">
        {logo && logoUrl && (
          <Link href={logoUrl} aria-label="Home">
            <LogoComponent />
          </Link>
        )}
      </div>

      {/* Center Section: Navigation Links */}
      <nav className="flex justify-center justify-self-center">
        {links && <NavLinks links={links} />}
      </nav>

      {/* Right Section: Search, Login/Profile */}
      <RightSection searchBar={searchBar} loginButton={loginButton} session={session} />
    </header>
  );
}
