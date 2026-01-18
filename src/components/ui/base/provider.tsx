import { Button } from '@/components/ui/button';
import { Discord, Github, Google } from '@2hoch1/pixel-icon-library-react';

function DiscordProvider() {
  return (
    <Button className='w-full bg-[#5865F2] text-white hover:bg-[#4752C4]'>
      <Discord /> Discord
    </Button>
  );
}

function GitHubProvider() {
  return (
    <Button className='w-full bg-[#1A1A1A] text-white hover:bg-[#333333] dark:bg-[#E4E4E4] dark:text-black dark:hover:bg-[#C6C6C6]'>
      <Github /> GitHub
    </Button>
  );
}

function GoogleProvider() {
  return (
    <Button className='w-full bg-[#0085F8] text-white hover:bg-[#006CD1]'>
      <Google /> Google
    </Button>
  );
}

export { DiscordProvider, GitHubProvider, GoogleProvider };
