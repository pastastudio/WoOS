'use client';

import Wave from '@/assets/wave.svg';
import {
  FeedbackCarousel,
  negativeBadge,
  positiveBadge,
  verifiedBadge,
} from '@/components/ui/base/feedback-carousel';
import { ParallaxWindow } from '@/components/ui/base/parallax-window';
import Image from 'next/image';

const feedbackData = [
  {
    author: {
      name: 'Craemon',
      avatarUrl: '/Logo.png',
    },
    description:
      'TIch bin seit Ende 2023 Kunde bei Nexo und nutze hauptsächlich KVM-Server. Schon damals mit den Xeon KVMs war ich sehr zufrieden – mittlerweile bin ich auf nen Ryzen KVM (R7 7950X3D) umgestiegen und der läuft sogar noch besser als mein Kühlschrank haha Nexo setzt bei der Hardware nur auf Top-Niveau (finde ich zumindest), insbesondere bei den CPUs. Seit Kurzem nutze ich auch einen größeren Webspace und kann auch dort nur Positives berichten – stabil, schnell und zuverlässig. Der Support ist ebenfalls prima. Wenn es mal zu Problemen oder einer Downtime kommen, kümmert sich der Inhaber schnell und engagiert darum, dass alles wieder läuft - Sowas sollten sich andere Hoster mal als Beispiel nehmen^^ All-in-One: Ich bin absolut zufrieden. So einen Hoster wie Nexo findet man heutzutage gar nicht mehr :D',
    badges: [verifiedBadge, negativeBadge],
  },
  {
    author: {
      name: 'MaxUser',
      avatarUrl: '/Logo.png',
    },
    description:
      'Excellent service and support! The team responds quickly to any questions or issues. The infrastructure is reliable and the performance is outstanding. Highly recommended for anyone looking for professional hosting solutions. I have been very impressed with the quality of service provided.',
    badges: [verifiedBadge, positiveBadge],
  },
  {
    author: {
      name: 'TechPro',
      avatarUrl: '/Logo.png',
    },
    description:
      'Very happy with the services. The technical team is knowledgeable and always ready to help. The system uptime is impressive and the customer support is beyond expectations. Great value for money. Would definitely recommend to other businesses.',
    badges: [positiveBadge],
  },
  {
    author: {
      name: 'DevExpert',
      avatarUrl: '/Logo.png',
    },
    description:
      'Outstanding performance and reliability. The infrastructure is top-notch and the support team is incredibly responsive. They solved all my issues quickly and professionally. This is exactly what I was looking for in a hosting provider.',
    badges: [verifiedBadge, positiveBadge],
  },
  {
    author: {
      name: 'CloudUser',
      avatarUrl: '/Logo.png',
    },
    description:
      'Best hosting experience I have had so far. Fast deployment, excellent documentation, and responsive support team. The pricing is competitive and the service quality is exceptional. I recommend this to all my colleagues.',
    badges: [positiveBadge],
  },
];

export default function Page() {
  return (
    <>
      <div className='block overflow-hidden'>
        <ParallaxWindow />
        <div className='relative z-20 grid grid-cols-1 place-items-center gap-8 bg-black'>
          <div id='deadSpaceBuffer' className='h-25 bg-black'></div>
          <div className='h-100 p-8'>
            <h1 className='text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl'>
              <Image
                src='/Banner.png'
                alt='DM-WT Logo'
                width={700}
                height={100}
                className='mx-auto'
              />
            </h1>
            <h2 className='font-pixelify mx-auto max-w-xl pt-4 text-center text-2xl'>
              is an interactive platform for learning the fundamentals of
              operating systems.
            </h2>
          </div>
          <div className='w-full py-8'>
            {/* Top Wave */}
            <div className='overflow-hidden bg-black'>
              <Wave className='w-full' style={{ color: '#2b542b' }} />
            </div>

            {/* Content Section */}
            <div className='bg-[#2b542b] px-8 py-12'>
              {/* Add content here */}
            </div>

            {/* Bottom Wave - Rotated 180 degrees */}
            <div className='overflow-hidden bg-black'>
              <Wave
                className='w-full rotate-180 transform'
                style={{ color: '#2b542b' }}
              />
            </div>
          </div>
          <div className='p-30'>
            <FeedbackCarousel feedbackData={feedbackData} />
          </div>
        </div>
      </div>
    </>
  );
}
