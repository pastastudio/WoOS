'use client';

import type { Links, Sozials } from '@/types/index';
import { ReactElement } from 'react';

import Wave from '@/assets/wave.svg';

import FooterBanner from './FooterBanner';
import FooterLinks from './FooterLinks';
import FooterSozials from './FooterSozials';
import styles from './index.module.css';

export interface LinkCategorys {
  resources?: Links[];
  legal?: Links[];
  about?: Links[];
  social?: Links[];
}

export interface FooterProps {
  links?: LinkCategorys;
  sozials?: Sozials[];
  socialsText?: { key: string; title: string};
  languageText?: { key: string; title: string};
  categories?: { key: string; title: string}[];
  logo?: boolean;
  banner?: boolean;
  showWave?: boolean;
  color?: string;
  waveBackgroundColor?: string;
}

/**
 * Page footer with a list of links and social media links.
 *
 * @param {FooterProps} props - The properties for the Footer component.
 * @param {LinkCategorys} props.links - The categories of links to display in the footer.
 * @param {Sozials[]} props.sozials - The social media links to display.
 * @param {boolean} props.logo - Whether to display the logo.
 * @param {boolean} props.banner - Whether to display the banner (defaults to true).
 * @param {boolean} props.showWave - Whether to display the wave decoration (defaults to true).
 * @param {string} props.color - The background color for the footer and wave color (defaults to #2b542b).
 * @param {string} props.waveBackgroundColor - The background color for the wave section (defaults to black).
 * @returns {ReactElement} The Footer component.
 */
export default function Footer({
  links,
  sozials,
  socialsText,
  languageText,
  categories,
  logo = false,
  banner = true,
  showWave = true,
  color = '#2b542b',
  waveBackgroundColor = '#0a0a0a',
}: FooterProps): ReactElement {
  return (
    <footer>
      {/* Wave Decoration */}
      {showWave && (
        <div
          className={styles.waveWrapper}
          style={{ backgroundColor: waveBackgroundColor }}
        >
          <Wave className={styles.wave} style={{ color: color }} />
        </div>
      )}

      {/* Main Footer Content */}
      <div
        className={styles.footerContainer}
        style={{ backgroundColor: color }}
      >
        <div className={styles.contentGrid}>
          {/* Sozials Section */}
          <FooterSozials logo={logo} sozials={sozials} socialText = {socialsText} languageText={languageText}/>

          {/* Links Section */}
          <div className={styles.linksWrapper}>
            <FooterLinks links={links} categories={categories} />
          </div>

          {/* Banner Section */}
          <FooterBanner banner={banner} />
        </div>
      </div>
    </footer>
  );
}
