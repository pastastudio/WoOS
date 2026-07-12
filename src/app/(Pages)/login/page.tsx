import Link from 'next/link';

import { ParallaxWindow } from '@/components/parallax-window';

import { DiscordProvider, GitHubProvider, GoogleProvider } from '@/providers/provider';

export default function Page() {
  return (
    <>
      <div className="relative block min-h-screen">
        <div className="absolute inset-0 blur-sm">
          <ParallaxWindow />
        </div>
        <div className="bg-background/20 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className="mx-auto max-w-md rounded-none bg-neutral-50 p-10 text-center shadow-2xl">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="mt-1">We only support accounts via third party providers.</p>
            <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3">
              <DiscordProvider />
              <GitHubProvider />
              <GoogleProvider />
            </div>
            <p className="text-muted-foreground mx-4 mt-6 text-center text-sm">
              By clicking continue, you agree to our{' '}
              <Link href="/terms-of-service" className="underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="underline">
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
