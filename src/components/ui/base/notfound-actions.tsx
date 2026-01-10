'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftSolid, HomeSolid } from '@2hoch1/pixel-icon-library-react';
import { FlipButton } from '@/components/ui/shadcn-io/flip-button';

export default function NotFoundActions({
  backText,
  homeText,
}: {
  backText: string;
  homeText: string;
}) {
  const router = useRouter();

  return (
    <>
      <FlipButton
        onClick={() => router.back()}
        frontText={backText}
        backText={<ArrowLeftSolid className='inline' size={16} />}
        from='left'
        frontClassName='bg-neutral-100'
        backClassName='bg-error-500 text-white'
      />

      <Link href='/'>
        <FlipButton
          frontText={homeText}
          backText={<HomeSolid className='inline' size={16} />}
          frontClassName='bg-neutral-100'
          backClassName='bg-error-500 text-white'
        />
      </Link>
    </>
  );
}
