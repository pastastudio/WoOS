'use client';

import { ReactElement } from 'react';

import Banner from '@/assets/banner.svg';
import styles from './index.module.css';

interface FooterBannerProps {
  banner?: boolean;
}

/**
 * Renders the footer banner section
 */
export default function FooterBanner({
  banner,
}: FooterBannerProps): ReactElement | null {
  if (!banner) return null;

  return (
    <div className={styles.bannerWrapper}>
      <Banner aria-label='Footer Banner' className={styles.banner} />
    </div>
  );
}
