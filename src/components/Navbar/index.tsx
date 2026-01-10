import { ReactElement, Fragment } from 'react';
import type { Links } from '@/types/index';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLinkSolid, UserSolid } from '@2hoch1/pixel-icon-library-react';

import LogoSvg from '@/assets/logo.svg';
import BannerSvg from '@/assets/banner.svg';
import { ThemeToggle } from '@/components/ui/base/theme-toggle';
import { SearchBarToggle } from '@/components/ui/base/searchbar-toggle';

import styles from './index.module.css';

export interface NavbarProps {
  logoUrl?: string | null | undefined;
  logo?: boolean | null | undefined;
  links: Links[] | null | undefined;
  searchBar?: boolean | null | undefined;
  darkModeToggle?: boolean | null | undefined;
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
      {links.map((link) => (
        <li key={link.href} className={styles.linkItem}>
          <Link href={link.href} className={styles.link}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

/**
 * Login button component
 */
const LoginButton = (): ReactElement => {
  return (
    <Link href='' passHref>
      <Button variant='ghost' className={styles.loginButton}>
        Login <ExternalLinkSolid />
      </Button>
    </Link>
  );
};

/**
 * User profile button component
 */
const ProfileButton = (): ReactElement => {
  return (
    <Link href='/profile' passHref>
      <Button
        variant='ghost'
        size='icon'
        className={styles.profileButton}
        aria-label='Profil öffnen'
      >
        <UserSolid />
      </Button>
    </Link>
  );
};

/**
 * Right section component with actions
 */
const RightSection = ({
  searchBar,
  darkModeToggle,
  loginButton,
  session,
}: {
  searchBar?: boolean | null;
  darkModeToggle?: boolean | null;
  loginButton?: boolean | null;
  session: string;
}): ReactElement => {
  const elements = [];

  if (searchBar) elements.push(<SearchBarToggle key='search' />);
  if (darkModeToggle) elements.push(<ThemeToggle key='theme' />);
  if (session) elements.push(<ProfileButton key='profile' />);
  else if (loginButton) elements.push(<LoginButton key='login' />);

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

/**
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
  darkModeToggle,
  loginButton,
  backgroundColor,
  borderLine,
  frontColor,
  fixed,
}: NavbarProps): ReactElement {
  const session = 'i'; // Replace with actual session logic

  // Build navbar classes
  const navbarClasses = [
    styles.navbar,
    fixed && styles.fixed,
    borderLine && styles.withBorder,
  ]
    .filter(Boolean)
    .join(' ');

  // Inline styles for dynamic colors
  const navbarStyles = {
    backgroundColor:
      backgroundColor === false ? 'transparent' : backgroundColor || '#0a0a0a',
    color: frontColor || 'white',
  };

  return (
    <header className={navbarClasses} style={navbarStyles}>
      {/* Left Section: Logo */}
      <div>
        {logo && logoUrl && (
          <Link href={logoUrl} aria-label='Home'>
            <LogoComponent />
          </Link>
        )}
      </div>

      {/* Center Section: Navigation Links */}
      <nav className={styles.centerNav}>
        {links && <NavLinks links={links} />}
      </nav>

      {/* Right Section: Search, Theme Toggle, Login/Profile */}
      <RightSection
        searchBar={searchBar}
        darkModeToggle={darkModeToggle}
        loginButton={loginButton}
        session={session}
      />
    </header>
  );
}
