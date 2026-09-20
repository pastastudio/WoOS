import UnauthorizedActions from '@/components/unauthorized-actions';
import deSystemFiles from '@/i18n/de/system_files.json';
import enSystemFiles from '@/i18n/en/system_files.json';
import { SiteLayout } from '@/layouts/SiteLayout';
import { LockSolid } from '@2hoch1/pixel-icon-library-react';

const systemFilesDict = {
  de: deSystemFiles,
  en: enSystemFiles,
};

export default function Unauthorized() {
  // Default to English for unauthorized page at root level
  const systemFiles = systemFilesDict.en;

  return (
    <SiteLayout>
      <div className="bg-background flex min-h-screen w-full flex-1 items-center justify-center">
        <div className="animate-fade-in flex flex-col items-center gap-4 text-center">
          <div className="animate-float">
            <LockSolid className="text-error-500 h-12 w-12" />
          </div>

          <h1 className="text-foreground text-2xl font-semibold">
            {systemFiles.unauthorized.title}
          </h1>

          <p className="text-muted-foreground max-w-sm">{systemFiles.unauthorized.description}</p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <UnauthorizedActions
              backText={systemFiles.unauthorized.buttons.back}
              homeText={systemFiles.unauthorized.buttons.home}
            />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
