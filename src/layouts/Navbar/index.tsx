import { Button } from '@/components/ui/button';
import type { Links } from '@/types/index';
import { UserSolid } from '@2hoch1/pixel-icon-library-react';
import Link from 'next/link';
import { Fragment, ReactElement } from 'react';

import BannerSvg from '@/assets/banner.svg';
import LogoSvg from '@/assets/logo.svg';
// TODO: Uncomment when auth is ready
// import { auth } from '@/auth';
import { SearchBarToggle } from '@/components/searchbar-toggle';

import styles from './index.module.css';

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

// ============================================================================
// Component Sections
// ============================================================================

/**
 * Logo component with brand assets
 */
const LogoComponent = (): ReactElement => {
  return (
    <div className={styles.logoContainer}>
      <LogoSvg className={styles.logoSvg} />
      <BannerSvg className={styles.bannerSvg} />
    </div>
  );
};

/**
 * Navigation links component
 */
const NavLinks = ({ links }: { links: Links[] }): ReactElement => {
  return (
    <ul className={styles.linksList}>
      {links.map(link => {
        const Icon = link.icon;
        return (
          <li key={link.href} className={styles.linkItem}>
            <Link href={link.href} className={styles.link}>
              {Icon && <Icon className={styles.linkIcon} />}
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
        <UserSolid className={styles.accountIcon} />
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
        <UserSolid className={styles.accountIcon} />
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
    <div className={styles.rightSection}>
      {elements.map((element, index) => (
        <Fragment key={`element-${index}`}>
          <div className={styles.rightElement}>{element}</div>
          {index < elements.length - 1 && (
            <div key={`separator-${index}`} className={styles.separator} />
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

  // Build navbar classes
  const navbarClasses = [styles.navbar, fixed && styles.fixed, borderLine && styles.withBorder]
    .filter(Boolean)
    .join(' ');

  // Inline styles for dynamic colors
  const navbarStyles = {
    backgroundColor:
      backgroundColor === false ? 'transparent' : backgroundColor || 'var(--background)',
    color: frontColor || 'var(--foreground)',
  };

  return (
    <header className={navbarClasses} style={navbarStyles}>
      {/* Left Section: Logo */}
      <div className={styles.leftSection}>
        {logo && logoUrl && (
          <Link href={logoUrl} aria-label="Home">
            <LogoComponent />
          </Link>
        )}
      </div>

      {/* Center Section: Navigation Links */}
      <nav className={styles.centerNav}>{links && <NavLinks links={links} />}</nav>

      {/* Right Section: Search, Login/Profile */}
      <RightSection searchBar={searchBar} loginButton={loginButton} session={session} />
    </header>
  );
}
