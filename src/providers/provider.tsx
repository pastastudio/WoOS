'use client';

import { Button } from '@/components/ui/button';
import { Discord, Github, Google } from '@2hoch1/pixel-icon-library-react';

// TODO: Auth provider components - commented out
// Uncomment and wire up when next-auth is ready

function DiscordProvider() {
  return (
    <Button
      disabled
      className="bg-brand-discord hover:bg-brand-discord w-full cursor-not-allowed text-white opacity-50"
    >
      <Discord /> Discord (Coming Soon)
    </Button>
  );
  // TODO: Re-enable when auth is ready:
  // return (
  //   <form action={loginDiscord}>
  //     <Button type='submit' className='w-full bg-brand-discord text-white hover:bg-[#4752C4]'>
  //       <Discord /> Discord
  //     </Button>
  //   </form>
  // );
}

function GitHubProvider() {
  return (
    <Button
      disabled
      className="bg-muted hover:bg-muted text-muted-foreground w-full cursor-not-allowed opacity-50"
    >
      <Github /> GitHub (Coming Soon)
    </Button>
  );
}

function GoogleProvider() {
  return (
    <Button
      disabled
      className="bg-muted hover:bg-muted text-muted-foreground w-full cursor-not-allowed opacity-50"
    >
      <Google /> Google (Coming Soon)
    </Button>
  );
}

export { DiscordProvider, GitHubProvider, GoogleProvider };
