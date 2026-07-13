import Wave from '@/assets/wave.svg';
import {
  FeedbackCarousel,
  negativeBadge,
  positiveBadge,
  verifiedBadge,
} from '@/components/feedback/feedback-carousel';
import { ParallaxWindow } from '@/components/parallax-window';
import { getDictionary } from '@/i18n/getDictionary';
import { getLocale } from '@/lib/locale';
import Image from 'next/image';

type HomeInfoBox = {
  title: string;
  description: string;
};

type HomeContent = {
  title: string;
  intro: {
    part1: string;
    part2: string;
    part3: string;
  };
  infoBoxes: Record<string, HomeInfoBox>;
};

const feedbackData = [
  {
    author: {
      name: 'Misi Multari',
      avatarUrl: '/images/Logo.png',
    },
    description:
      'As someone who mainly uses Windows for everyday stuff, I liked how the home page explains the idea fast. The structure is clear, the visual design feels intentional, and the intro makes the whole thing easy to get into without overexplaining it.',
    badges: [verifiedBadge, positiveBadge],
  },
  {
    author: {
      name: 'Hans Constantin Dorade',
      avatarUrl: '/images/Logo.png',
    },
    description:
      'As a Linux power user, I actually appreciated the way the site treats operating systems as a real choice instead of a one-size-fits-all answer. The analysis flow makes sense, and the chapter questions push people to think about trade-offs instead of just chasing the “best” option.',
    badges: [verifiedBadge, positiveBadge],
  },
  {
    author: {
      name: 'Arthur Philip',
      avatarUrl: '/images/Logo.png',
    },
    description:
      'I’m mostly here for the gaming angle, so the OS comparison chart immediately caught my eye. The Windows, Linux, and macOS toggles are useful, and the strengths chart is fast to scan. Gaming still feels a bit too simplified, but the comparison itself is solid.',
    badges: [positiveBadge],
  },
  {
    author: {
      name: 'Sofia Greco',
      avatarUrl: '/images/Logo.png',
    },
    description:
      'I like the sustainability angle because it speaks to how I actually use a laptop day to day. The hardware and settings sections are practical, and the site connects operating-system choices with longer device life instead of treating it as just theory.',
    badges: [verifiedBadge, positiveBadge],
  },
  {
    author: {
      name: 'Muster Maxmann',
      avatarUrl: '/images/Logo.png',
    },
    description:
      'As a student, I like the chapter and quest structure because it gives the site a proper learning path. It feels active instead of static, and the short sections make it easy to keep going without getting lost.',
    badges: [positiveBadge],
  },
  {
    author: {
      name: 'John Smith',
      avatarUrl: '/images/Logo.png',
    },
    description:
      'The narrative sections for Windows, Linux, and macOS feel pretty balanced from a regular user point of view. I like that each system gets its own profile, and the explanations are understandable without assuming too much background knowledge.',
    badges: [verifiedBadge, positiveBadge],
  },
  {
    author: {
      name: 'Begench Amanov',
      avatarUrl: '/images/Logo.png',
    },
    description:
      'Overall the site feels polished and easy to navigate. My only complaint is that a few sections could go deeper, especially once you already know the basics, but for most people the balance between simple and detailed is still good.',
    badges: [negativeBadge],
  },
];

export default async function Page() {
  const lang = await getLocale();
  const dict = await getDictionary(lang);
  const homeContent = dict.home as HomeContent;
  const infoBoxes = Object.values(homeContent.infoBoxes);

  return (
    <>
      <div className="block overflow-hidden">
        <ParallaxWindow />
        <div className="bg-background relative z-20 grid grid-cols-1 place-items-center gap-8">
          <div id="deadSpaceBuffer" className="bg-background h-25"></div>
          <div className="h-100 p-8">
            <h1 className="text-foreground text-center text-4xl font-bold md:text-5xl">
              <Image
                src="/images/Banner.png"
                alt="DM-WT Logo"
                width={700}
                height={100}
                className="mx-auto h-auto w-auto"
              />
            </h1>
            <h2 className="font-pixelify mx-auto max-w-xl pt-4 text-center text-2xl">
              is an interactive platform for learning the fundamentals of operating systems.
            </h2>
          </div>
          <div className="w-full py-8">
            {/* Top Wave */}
            <div className="bg-background overflow-hidden">
              <Wave className="w-full" style={{ color: 'var(--color-footer-brand)' }} />
            </div>

            {/* Content Section */}
            <div className="bg-footer-brand px-8 py-12">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-foreground mb-6 text-3xl font-bold">{homeContent.title}</h2>
                <div className="text-foreground mb-8 space-y-4">
                  <p>{homeContent.intro.part1}</p>
                  <p>{homeContent.intro.part2}</p>
                  <p>{homeContent.intro.part3}</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {infoBoxes.map((box, index) => (
                    <div key={index} className="rounded-none border border-white/20 bg-white/5 p-6">
                      <h3 className="text-foreground mb-3 text-xl font-semibold">{box.title}</h3>
                      <p className="text-muted-foreground text-sm">{box.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Wave - Rotated 180 degrees */}
            <div className="bg-background overflow-hidden">
              <Wave
                className="w-full rotate-180 transform"
                style={{ color: 'var(--color-footer-brand)' }}
              />
            </div>
          </div>
          <div className="p-30">
            <FeedbackCarousel feedbackData={feedbackData} />
          </div>
        </div>
      </div>
    </>
  );
}
