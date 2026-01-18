'use client';

import { useScrollPosition } from '@/hooks/useScrollPosition';
import * as React from 'react';

function ParallaxLayer({ children }: { children: React.ReactNode }) {
  const scrollY = useScrollPosition();

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const element = child as React.ReactElement<{
          style?: React.CSSProperties;
          'data-speed'?: string;
        }>;

        const speed = Number(element.props['data-speed'] ?? 1);
        const translateY = scrollY * (speed / 100);

        return React.cloneElement(element, {
          style: {
            ...(element.props.style ?? {}),
            transform: `translateY(${translateY}px)`,
          },
        });
      })}
    </>
  );
}

const PARALLAX_LAYERS = [
  {
    speed: '2',
    image: '/keyart/alive/index-0.png',
    className:
      'fixed block h-[800px] w-full bg-[#161A24] bg-[length:auto_700px] bg-bottom bg-center bg-repeat-x',
  },
  {
    speed: '7',
    image: '/keyart/alive/index-1.png',
    className:
      'absolute block h-[850px] w-full bg-[length:auto_700px] bg-bottom bg-center bg-repeat-x',
  },
  {
    speed: '12',
    image: '/keyart/alive/index-2.png',
    className:
      'absolute block h-[900px] w-full bg-[length:auto_700px] bg-bottom bg-center bg-repeat-x',
  },
  {
    speed: '17',
    image: '/keyart/alive/index-3.png',
    className:
      'absolute block h-[900px] w-full bg-[length:auto_700px] bg-bottom bg-center bg-repeat-x',
  },
  {
    speed: '21',
    image: '/keyart/alive/index-4.png',
    className:
      'absolute block h-[900px] w-full bg-[length:auto_700px] bg-bottom bg-center bg-repeat-x',
  },
  {
    speed: '30',
    image: '/keyart/alive/index-5.png',
    className:
      'absolute block h-[900px] w-full bg-[length:auto_700px] bg-bottom bg-center bg-repeat-x',
  },
];

function ParallaxWindow() {
  return (
    <div className='relative z-0 block h-[800px]'>
      <ParallaxLayer>
        {PARALLAX_LAYERS.map((layer, index) => (
          <div
            key={index}
            data-speed={layer.speed}
            className={layer.className}
            style={{ backgroundImage: `url('${layer.image}')` }}
          />
        ))}
      </ParallaxLayer>
      <div className="absolute block h-[900px] w-full bg-[url('/keyart/alive/index-6.png')] bg-[length:auto_700px] bg-bottom bg-center bg-repeat-x" />
    </div>
  );
}

export { ParallaxWindow };
