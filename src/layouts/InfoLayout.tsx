import type { RouteEntry } from '@/lib/content';
import type { TableOfContents } from '@/lib/markdown';
import { ReactNode } from 'react';

function generateSidebarContent(routes: RouteEntry[] | undefined) {
  if (!routes?.length) {
    return <p className='text-muted-foreground text-sm'>No entries yet.</p>;
  }

  return (
    <>
      <h2 className='text-left text-sm font-semibold'>Weitere Seiten</h2>
      <ul className='space-y-2 text-sm'>
        {routes.map((route) => (
          <li key={`${route.locale}-${route.section}-${route.slug}`}>
            <a
              className='hover:underline'
              href={`/${route.locale}/${route.section}/${route.slug}`}
            >
              {route.slug}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

function OnThisPage({ toc }: { toc?: TableOfContents }) {
  if (!toc?.length) {
    return <p className='text-muted-foreground text-sm'>No headings yet.</p>;
  }

  return (
    <ul className='space-y-2 text-sm'>
      {toc.map((item) => {
        const indent = item.depth > 2 ? 'ml-4 text-muted-foreground' : '';

        return (
          <li key={item.url} className={indent}>
            <a className='hover:underline' href={item.url}>
              {item.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

interface InfoLayoutProps {
  content?: ReactNode;
  routes?: RouteEntry[];
  toc?: TableOfContents;
  title?: string;
}

function InfoLayout({ routes, content, toc, title }: InfoLayoutProps) {
  return (
    <div className='grid h-screen w-screen grid-cols-[2fr_5fr_2fr] gap-4'>
      <div
        id='theme-sidebar'
        className='flex justify-end rounded border border-red-500 bg-red-50/20'
      >
        <div className='border border-yellow-500 bg-yellow-50/20'>
          <aside className='border border-purple-500 bg-purple-50/20 p-8'>
            {generateSidebarContent(routes)}
          </aside>
        </div>
      </div>

      <div
        id='content'
        className='grid grid-rows-[auto_1fr] rounded border border-blue-500 bg-blue-50/20 p-8'
      >
        <div className='rounded border border-orange-500 bg-orange-50/20 p-4'>
          <h1 className='text-2xl font-semibold'>{title ?? 'Information'}</h1>
        </div>

        <div className='rounded border border-cyan-500 bg-cyan-50/20 p-4'>
          {content}
        </div>
      </div>

      <div
        id='on-page'
        className='justify-left flex rounded border border-red-500 bg-red-50/20'
      >
        <div className='border border-yellow-500 bg-yellow-50/20'>
          <aside className='border border-purple-500 bg-purple-50/20 p-8'>
            <h2 className='text-left text-sm font-semibold'>On This Page</h2>
            <OnThisPage toc={toc} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export { InfoLayout };
