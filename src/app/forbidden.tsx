import ForbiddenActions from '@/components/forbidden-actions';
import deSystemFiles from '@/i18n/de/system_files.json';
import enSystemFiles from '@/i18n/en/system_files.json';
import { SiteLayout } from '@/layouts/SiteLayout';
import { ExclamationTriangleSolid } from '@2hoch1/pixel-icon-library-react';

const systemFilesDict = {
  de: deSystemFiles,
  en: enSystemFiles,
};

export default function Forbidden() {
  // Default to English for forbidden page at root level
  const systemFiles = systemFilesDict.en;

  return (
    <SiteLayout>
      <div className="bg-background flex min-h-screen w-full flex-1 items-center justify-center">
        <div className="animate-fade-in flex flex-col items-center gap-4 text-center">
          <div className="animate-float">
            <ExclamationTriangleSolid className="text-error-500 h-12 w-12" />
          </div>

          <h1 className="text-foreground text-2xl font-semibold">{systemFiles.forbidden.title}</h1>

          <p className="text-muted-foreground max-w-sm">{systemFiles.forbidden.description}</p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <ForbiddenActions
              backText={systemFiles.forbidden.buttons.back}
              homeText={systemFiles.forbidden.buttons.home}
            />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
