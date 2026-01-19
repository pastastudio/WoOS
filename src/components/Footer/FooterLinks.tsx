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
  categories?: { key: string; title: string }[];
}

/**
 * Renders the footer links section
 */
export default function FooterLinks({
  links,
  categories,
}: FooterLinksProps): ReactElement {
  if (!links) return <div className={styles.linksContainer} />;
  if (!categories) return <div className={styles.linksContainer} />;

  const linkCategories = categories;
  return (
    <div className={styles.linksContainer}>
      {linkCategories.map(({ key, title }) => {
        const categoryLinks = links[key as keyof LinkCategorys];
        if (!categoryLinks || categoryLinks.length === 0) return null;

        return (
          <div key={key} className={styles.linkCategory}>
            <h3 className={styles.categoryTitle}>{title}</h3>
            <ul className={styles.linkList}>
              {categoryLinks.map((link) => (
                <li key={`${key}-${link.label}`}>
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
