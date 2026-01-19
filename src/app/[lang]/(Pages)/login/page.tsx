import Link from 'next/link';

import { ParallaxWindow } from '@/components/ui/base/parallax-window';

import {
  DiscordProvider,
  GitHubProvider,
  GoogleProvider,
} from '@/components/ui/base/provider';

export default function Page() {
  return (
    <>
      <div className='relative block min-h-screen'>
        <div className='absolute inset-0 blur-sm'>
          <ParallaxWindow />
        </div>
        <div className='absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
          <div className='mx-auto max-w-md rounded-lg bg-[#f9f9f9] p-10 text-center shadow-2xl dark:bg-[#171717]'>
            <h1 className='text-2xl font-bold'>Create an Account</h1>
            <p className='mt-1'>
              We only support accounts via third party providers.
            </p>
            <div className='mx-auto mt-6 flex max-w-sm flex-col gap-3'>
              <DiscordProvider />
              <GitHubProvider />
              <GoogleProvider />
            </div>
            <p className='mx-4 mt-6 text-center text-sm text-gray-500'>
              By clicking continue, you agree to our{' '}
              <Link href='/terms-of-service' className='underline'>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href='/privacy-policy' className='underline'>
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
