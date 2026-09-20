import deSystemFiles from '@/i18n/de/system_files.json';
import enSystemFiles from '@/i18n/en/system_files.json';
import { SiteLayout } from '@/layouts/SiteLayout';

const systemFilesDict = {
  de: deSystemFiles,
  en: enSystemFiles,
};

export default function Loading() {
  // Default to English for loading page at root level
  const systemFiles = systemFilesDict.en;

  return (
    <SiteLayout>
      <div className="bg-background flex min-h-screen w-full flex-1 items-center justify-center">
        <div className="animate-scale-in flex flex-col items-center gap-4">
          <p className="text-muted-foreground animate-pulse text-sm">
            {systemFiles.loading.message}
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
