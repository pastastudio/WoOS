'use client';

import { ReactElement, useState } from 'react';

interface Section {
  title: string;
  items: string[];
}

const sections: Section[] = [
  {
    title: 'Getting started',
    items: ['Node.js', 'CLI'],
  },
  {
    title: 'Extending',
    items: ['Architecture', 'Resolver', 'Handler', 'Importer'],
  },
  {
    title: 'Reference',
    items: ['Config', 'API', 'Documentation', 'FileState', 'Handlers', 'CLI'],
  },
  {
    title: 'Migrate',
    items: ['v5 to v6'],
  },
  {
    title: 'Release Notes',
    items: ['react-docgen', '@react-docgen/cli'],
  },
];

/**
 * Sidebar
 *
 * Sidebar with multiple sections and selectable items.
 * Sections are currently defined internally.
 *
 * Props: none
 *
 * Return: ReactElement
 */
export default function Sidebar(): ReactElement {
  const [openSections, setOpenSections] = useState<string[]>([
    'Getting started',
  ]);
  const [activeItem, setActiveItem] = useState<string>('Node.js');

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title],
    );
  };

  return (
    <aside className='fixed flex h-screen w-64 flex-col border-r border-neutral-800 bg-neutral-900 text-gray-200'>
      {/* Header */}
      <div className='border-b border-neutral-800 p-4 text-lg font-semibold'>
        react-docgen
      </div>

      {/* Navigation */}
      <nav className='flex-1 overflow-y-auto p-2'>
        {sections.map((section) => (
          <div key={section.title} className='mb-2'>
            <button
              onClick={() => toggleSection(section.title)}
              className='flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-300 hover:text-white'
            >
              {section.title}
              <span className='text-xs'>
                {openSections.includes(section.title) ? '\u25be' : '\u25b8'}
              </span>
            </button>

            {openSections.includes(section.title) && (
              <div className='ms-4 mt-1 space-y-1'>
                {section.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveItem(item)}
                    className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                      activeItem === item
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className='border-t border-neutral-800 p-3 text-xs text-gray-500'>
        <div className='flex items-center justify-between'>
          <span>System</span>
          <span>\ud83c\udf19</span>
        </div>
      </div>
    </aside>
  );
}
