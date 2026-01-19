'use client';

import { Button } from '@/components/ui/button';
import { Discord, Github, Google } from '@2hoch1/pixel-icon-library-react';

// TODO: Auth provider components - commented out
// Uncomment and wire up when next-auth is ready

function DiscordProvider() {
  return (
    <Button disabled className='w-full bg-[#5865F2] text-white cursor-not-allowed opacity-50 hover:bg-[#5865F2]'>
      <Discord /> Discord (Coming Soon)
    </Button>
  );
  // TODO: Re-enable when auth is ready:
  // return (
  //   <form action={loginDiscord}>
  //     <Button type='submit' className='w-full bg-[#5865F2] text-white hover:bg-[#4752C4]'>
  //       <Discord /> Discord
  //     </Button>
  //   </form>
  // );
}

function GitHubProvider() {
  return (
    <Button
      disabled
      className='w-full bg-gray-400 text-white cursor-not-allowed opacity-50 hover:bg-gray-400'
    >
      <Github /> GitHub (Coming Soon)
    </Button>
  );
}

function GoogleProvider() {
  return (
    <Button
      disabled
      className='w-full bg-gray-400 text-white cursor-not-allowed opacity-50 hover:bg-gray-400'
    >
      <Google /> Google (Coming Soon)
    </Button>
  );
}

export { DiscordProvider, GitHubProvider, GoogleProvider };
