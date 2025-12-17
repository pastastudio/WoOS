'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCw, Home } from 'lucide-react';
import ErrorLayout from '@/layouts/ErrorLayout';
import { FlipButton } from '@/components/ui/shadcn-io/flip-button';

const ERROR_CONFIG = {
  title: 'Etwas ist schiefgelaufen',
  description:
    'Keine Sorge das kann mal passieren. Du kannst es erneut versuchen oder zur Startseite zurückkehren.',
  buttons: {
    retry: 'Erneut versuchen',
    home: 'Startseite',
  },
} as const;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className='flex flex-col items-center gap-4 text-center'
      >
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AlertTriangle className='text-error-500 h-12 w-12' />
        </motion.div>

        <h1 className='text-2xl font-semibold text-neutral-900'>
          {ERROR_CONFIG.title}
        </h1>

        <p className='max-w-sm text-neutral-500'>{ERROR_CONFIG.description}</p>

        <div className='mt-2 flex flex-wrap justify-center gap-3'>
          <FlipButton
            onClick={() => reset()}
            frontText={ERROR_CONFIG.buttons.retry}
            backText={<RotateCw className='inline' size={16} />}
            from='left'
            frontClassName='bg-neutral-100'
            backClassName='bg-error-500 text-white'
          />

          <Link href='/'>
            <FlipButton
              frontText={ERROR_CONFIG.buttons.home}
              backText={<Home className='inline' size={16} />}
              frontClassName='bg-neutral-100'
              backClassName='bg-error-500 text-white'
            />
          </Link>
        </div>
      </motion.div>
    </ErrorLayout>
  );
}
