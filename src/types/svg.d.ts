// Type declarations for importing SVGs as React components
// Allows: import Icon from '@/assets/icon.svg'; <Icon />
declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}
