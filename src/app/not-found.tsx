import { SearchSolid } from '@2hoch1/pixel-icon-library-react';
import ErrorLayout from '@/layouts/ErrorLayout';
import NotFoundActions from '@/components/ui/base/notfound-actions';

const NOT_FOUND_CONFIG = {
  title: 'Seite nicht gefunden',
  description:
    'Die Seite, die du suchst, ist leider nicht verfügbar. Sie wurde entweder entfernt oder an einen neuen Ort verschoben.',
  buttons: {
    back: 'Zurück',
    home: 'Home',
  },
} as const;

export default function NotFound() {
  return (
    <ErrorLayout>
      <div className='flex flex-col items-center gap-4 text-center'>
        <div className='animate-bounce'>
          <SearchSolid className='text-error-500 h-12 w-12' />
        </div>

        <h1 className='text-2xl font-semibold text-neutral-900'>
          {NOT_FOUND_CONFIG.title}
        </h1>

        <p className='max-w-sm text-neutral-500'>
          {NOT_FOUND_CONFIG.description}
        </p>

        <div className='mt-2 flex flex-wrap justify-center gap-3'>
          <NotFoundActions
            backText={NOT_FOUND_CONFIG.buttons.back}
            homeText={NOT_FOUND_CONFIG.buttons.home}
          />
        </div>
      </div>
    </ErrorLayout>
  );
}
