'use client';

import { motion } from 'framer-motion';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import LoadingLayout from '@/layouts/LoadingLayout';

const LOADING_CONFIG = {
  message: 'Wird geladen…',
} as const;

export default function Loading() {
  return (
    <LoadingLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='flex flex-col items-center gap-4'
      >
        <Spinner
          variant='infinite'
          size={56}
          className='text-brand-600'
          aria-label='Ladevorgang läuft'
        />

        <p className='animate-pulse text-sm text-neutral-500'>
          {LOADING_CONFIG.message}
        </p>
      </motion.div>
    </LoadingLayout>
  );
}
