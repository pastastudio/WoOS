'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';
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
        backText={<ArrowLeft className='inline' size={16} />}
        from='left'
        frontClassName='bg-neutral-100'
        backClassName='bg-error-500 text-white'
      />

      <Link href='/'>
        <FlipButton
          frontText={homeText}
          backText={<Home className='inline' size={16} />}
          frontClassName='bg-neutral-100'
          backClassName='bg-error-500 text-white'
        />
      </Link>
    </>
  );
}
