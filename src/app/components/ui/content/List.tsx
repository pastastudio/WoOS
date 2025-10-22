// list component for displaying a list of items

import React, { ReactElement } from 'react';

interface ListProps<T> {
  items?: T[];
  renderItem?: (item: T, index: number) => ReactElement;
}

/**
 * List
 *
 * Generic list component that renders an array of items. A `renderItem` callback
 * can be used to control how each element is rendered.
 *
 * Props:
 * @template T
 * @param {T[] | undefined} items - Optional array of items. Default: []
 * @param {(item: T, index: number) => ReactElement | undefined} renderItem - Callback to render a list item.
 *
 * Return: ReactElement
 */
export default function List<T>({
  items = [],
  renderItem,
}: ListProps<T>): ReactElement {
  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <li key={index} className="p-2">
          {renderItem?.(item, index)}
        </li>
      ))}
    </ul>
  );
}
