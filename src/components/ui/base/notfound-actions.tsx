'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      <Button onClick={() => router.back()}>{backText}</Button>

      <Link href='/'>
        <Button>{homeText}</Button>
      </Link>
    </>
  );
}
