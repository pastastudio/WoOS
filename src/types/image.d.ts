// Type declarations for importing SVGs as React components
// Allows: import Icon from '@/assets/icon.svg'; <Icon />
declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}

// Type declarations for importing image files
declare module '*.png' {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module '*.jpg' {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module '*.jpeg' {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module '*.gif' {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module '*.webp' {
  const content: { src: string; height: number; width: number };
  export default content;
}
