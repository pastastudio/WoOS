'use client';

import type { Links } from '@/types/index';
import Link from 'next/link';
import { ReactElement } from 'react';

import styles from './index.module.css';

interface LinkCategorys {
  resources?: Links[];
  legal?: Links[];
  about?: Links[];
  social?: Links[];
}

interface FooterLinksProps {
  links?: LinkCategorys;
}

/**
 * Link categories configuration
 */
const LINK_CATEGORIES = [
  { key: 'resources', title: 'Ressourcen' },
  { key: 'social', title: 'Soziales' },
  { key: 'about', title: 'Informationen' },
  { key: 'legal', title: 'Richtlinien' },
] as const;

/**
 * Renders the footer links section
 */
export default function FooterLinks({ links }: FooterLinksProps): ReactElement {
  if (!links) return <div className={styles.linksContainer} />;

  return (
    <div className={styles.linksContainer}>
      {LINK_CATEGORIES.map(({ key, title }) => {
        const categoryLinks = links[key];
        if (!categoryLinks || categoryLinks.length === 0) return null;

        return (
          <div key={key} className={styles.linkCategory}>
            <h3 className={styles.categoryTitle}>{title}</h3>
            <ul className={styles.linkList}>
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
