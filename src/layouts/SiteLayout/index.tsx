import { Footer, FooterLink, FooterSection, getFooterData } from '@/layouts/FooterLayout';
import { FooterSocialLink, FooterSocials } from '@/layouts/FooterLayout/FooterSocials';
import {
  getNavbarData,
  LoginButton,
  Navbar,
  NavbarAction,
  NavbarActions,
  NavbarLink,
  NavbarNav,
  ProfileButton,
  SITE_CHROME_BACKGROUND_CLASS,
} from '@/layouts/NavbarLayout';
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
  const navbar = getNavbarData(dict, { withBackground });
  const footer = getFooterData(dict);
  // TODO: Uncomment when auth is ready
  // const session = await auth();
  const session = null; // Placeholder

  return (
    <div className={withBackground ? SITE_CHROME_BACKGROUND_CLASS : undefined}>
      <Navbar fixed={navbar.fixed} backgroundColor={navbar.backgroundColor}>
        <NavbarNav>
          {navbar.navLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavbarLink key={link.href} href={link.href}>
                {Icon && <Icon className="size-5" />}
                {link.label}
              </NavbarLink>
            );
          })}
        </NavbarNav>
        <NavbarActions>
          {session && typeof session === 'object' && 'user' in session ? (
            <NavbarAction>
              <ProfileButton />
            </NavbarAction>
          ) : (
            <NavbarAction>
              <LoginButton />
            </NavbarAction>
          )}
        </NavbarActions>
      </Navbar>

      <main>{children}</main>

      <Footer
        banner={footer.banner}
        socials={
          <FooterSocials
            logo={footer.logo}
            languageText={footer.languageText}
            socialsText={footer.socialsText}
          >
            {footer.socials.map(social => (
              <FooterSocialLink
                key={social.href}
                href={social.href}
                altText={social.altText}
                icon={social.icon}
              />
            ))}
          </FooterSocials>
        }
      >
        {footer.linkGroups.map(group =>
          group.links.length > 0 ? (
            <FooterSection key={group.key} title={group.title}>
              {group.links.map(link => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterSection>
          ) : null
        )}
      </Footer>
    </div>
  );
}
