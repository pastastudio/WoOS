import Footer from '@/layouts/FooterLayout';
import Navbar from '@/layouts/NavbarLayout';
import { getSiteNavFooterProps, SITE_CHROME_BACKGROUND_CLASS } from '@/layouts/site-chrome';
import { getDictionary } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { ReactNode } from 'react';

interface SiteLayoutProps {
  children: ReactNode;
  withBackground?: boolean;
}

/** Shared navbar/footer chrome for the site's route-group layouts. */
export async function SiteLayout({ children, withBackground = false }: SiteLayoutProps) {
  const lang = await getLocale();
  const dict = await getDictionary(lang);
  const { navbar, footer } = getSiteNavFooterProps(dict, { withBackground });

  return (
    <div className={withBackground ? SITE_CHROME_BACKGROUND_CLASS : undefined}>
      <Navbar {...navbar} />
      <main>{children}</main>
      <Footer {...footer} />
    </div>
  );
}
