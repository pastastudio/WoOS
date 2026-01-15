'use client';

import { CircleForm, StarShape } from '@/components/ui/base/shapes';
import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  shapeType: 'star' | 'circle';
  points?: number;
  size: number;
}

export interface CursorSparkelsProps {
  size?: number;
  color?: string;
}

/**
 * Custom cursor sparkles with animated stars and circles that fade out after spawning.
 * Spawns shapes on mouse movement with random offsets.
 *
 * @example
 * ```tsx
 * <CursorSparkels size={12} color="#FFD700" />
 * ```
 */
export default function CursorSparkels({
  size = 12,
  color = '#facc15',
}: CursorSparkelsProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const minStarPoints = 4;
  const maxStarPoints = 6;
  const spawnRate = 12;

  useEffect(() => {
    let sparkleCounter = 0;
    let moveCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (moveCounter % spawnRate === 0) {
        setTimeout(() => {
          const shapeType: 'star' | 'circle' =
            Math.random() > 0.5 ? 'star' : 'circle';
          const points =
            shapeType === 'star'
              ? Math.floor(
                  Math.random() * (maxStarPoints - minStarPoints + 1),
                ) + minStarPoints
              : undefined;
          const shapeSize = shapeType === 'star' ? size / 4 : size / 5;

          const newSparkle: Sparkle = {
            id: sparkleCounter++,
            x: e.clientX + (Math.random() - 0.5) * 25,
            y: e.clientY + (Math.random() - 0.5) * 25,
            shapeType,
            points,
            size: shapeSize,
          };

          setSparkles((prev) => [...prev, newSparkle]);

          setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
          }, 600);
        }, 50);
      }

      moveCounter++;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size]);

  return (
    <>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className='pointer-events-none fixed z-[2147483646] animate-ping opacity-70'
          style={{
            left: sparkle.x,
            top: sparkle.y,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          {sparkle.shapeType === 'star' ? (
            <StarShape
              size={sparkle.size}
              color={color}
              points={sparkle.points || 5}
            />
          ) : (
            <CircleForm size={sparkle.size} color={color} />
          )}
        </div>
      ))}
    </>
  );
}
