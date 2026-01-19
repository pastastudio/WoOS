import NotFoundActions from '@/components/ui/base/notfound-actions';
import deSystemFiles from '@/i18n/de/system_files.json';
import enSystemFiles from '@/i18n/en/system_files.json';
import { SystemLayout } from '@/layouts/SystemLayout';
import { SearchSolid } from '@2hoch1/pixel-icon-library-react';

const systemFilesDict = {
  de: deSystemFiles,
  en: enSystemFiles,
};

export default function NotFound() {
  // Default to English for 404 page at root level
  const systemFiles = systemFilesDict.en;

  return (
    <SystemLayout>
      <div className='flex flex-col items-center gap-4 text-center'>
        <div className='animate-bounce'>
          <SearchSolid className='text-error-500 h-12 w-12' />
        </div>

        <h1 className='text-2xl font-semibold text-neutral-900'>
          {systemFiles.notFound.title}
        </h1>

        <p className='max-w-sm text-neutral-500'>
          {systemFiles.notFound.description}
        </p>

        <div className='mt-2 flex flex-wrap justify-center gap-3'>
          <NotFoundActions
            backText={systemFiles.notFound.buttons.back}
            homeText={systemFiles.notFound.buttons.home}
          />
        </div>
      </div>
    </SystemLayout>
  );
}
