'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';
import { type StaticImageData } from 'next/image';

import CrystalScepterOne from '@/assets/cursor/Crystal_Scepter_stage_1.png';
import CrystalScepterTwo from '@/assets/cursor/Crystal_Scepter_stage_2.png';
import CrystalScepterThree from '@/assets/cursor/Crystal_Scepter_stage_3.png';
import CrystalScepterFour from '@/assets/cursor/Crystal_Scepter_stage_4.png';
import DefaultBlack from '@/assets/cursor/Default_Black.png';
import DefaultWhite from '@/assets/cursor/Default_White.png';
import FireSnakeOne from '@/assets/cursor/Fire_Snake_Wand_stage_1.png';
import FireSnakeTwo from '@/assets/cursor/Fire_Snake_Wand_stage_2.png';
import FireSnakeThree from '@/assets/cursor/Fire_Snake_Wand_stage_3.png';
import FireSnakeFour from '@/assets/cursor/Fire_Snake_Wand_stage_4.png';
import FlowerStaffOne from '@/assets/cursor/Flowerstaff_stage_1.png';
import FlowerStaffTwo from '@/assets/cursor/Flowerstaff_stage_2.png';
import FlowerStaffThree from '@/assets/cursor/Flowerstaff_stage_3.png';
import FlowerStaffFour from '@/assets/cursor/Flowerstaff_stage_4.png';

/**
 * Available cursor variations including default cursors and themed wand stages.
 *
 * - `default-white` / `default-black`: Standard cursors that adapt to theme
 * - `crystal-scepter-1` through `4`: Golden crystal scepter progression (gold sparkles/glow)
 * - `fire-snake-1` through `4`: Fire snake wand progression (blue sparkles/glow)
 * - `flowerstaff-1` through `4`: Flower staff progression (pink sparkles/glow)
 */
export type CursorVariation =
  | 'default-white'
  | 'default-black'
  | 'crystal-scepter-1'
  | 'crystal-scepter-2'
  | 'crystal-scepter-3'
  | 'crystal-scepter-4'
  | 'fire-snake-1'
  | 'fire-snake-2'
  | 'fire-snake-3'
  | 'fire-snake-4'
  | 'flowerstaff-1'
  | 'flowerstaff-2'
  | 'flowerstaff-3'
  | 'flowerstaff-4';

/**
 * Props for the CustomCursor component.
 *
 * @property variation - Cursor image variant to display. Defaults to theme-based (white for dark, black for light).
 * @property enableSparkles - Show animated sparkles trailing the cursor. Color varies by variation. Default: false.
 * @property enableGlow - Apply a subtle glow effect around the cursor. Color varies by variation. Default: false.
 */
export interface CustomCursorProps {
  variation?: CursorVariation;
  enableSparkles?: boolean;
  enableGlow?: boolean;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

const CURSOR_SIZE = 22;

const cursorImages: Record<CursorVariation, StaticImageData> = {
  'default-white': DefaultWhite,
  'default-black': DefaultBlack,
  'crystal-scepter-1': CrystalScepterOne,
  'crystal-scepter-2': CrystalScepterTwo,
  'crystal-scepter-3': CrystalScepterThree,
  'crystal-scepter-4': CrystalScepterFour,
  'fire-snake-1': FireSnakeOne,
  'fire-snake-2': FireSnakeTwo,
  'fire-snake-3': FireSnakeThree,
  'fire-snake-4': FireSnakeFour,
  'flowerstaff-1': FlowerStaffOne,
  'flowerstaff-2': FlowerStaffTwo,
  'flowerstaff-3': FlowerStaffThree,
  'flowerstaff-4': FlowerStaffFour,
};

const resolveSparkleColor = (variation: CursorVariation): string => {
  if (variation.startsWith('crystal-scepter')) return '#FFD700';
  if (variation.startsWith('fire-snake')) return '#38bdf8';
  if (variation.startsWith('flowerstaff')) return '#ec4899';
  return '#facc15';
};

const resolveGlowColor = (variation: CursorVariation): string => {
  if (variation.startsWith('crystal-scepter')) return 'rgba(255, 215, 0, 0.65)';
  if (variation.startsWith('fire-snake')) return 'rgba(56, 189, 248, 0.6)';
  if (variation.startsWith('flowerstaff')) return 'rgba(236, 72, 153, 0.6)';
  return variation === 'default-black'
    ? 'rgba(0, 0, 0, 0.4)'
    : 'rgba(255, 255, 255, 0.55)';
};

const detectInteractive = (x: number, y: number): boolean => {
  if (typeof document === 'undefined') return false;
  const el = document.elementFromPoint(x, y);
  return !!el?.closest('a,button,[role="button"],input,select,textarea');
};

/**
 * Custom cursor component with theme-aware defaults, interactive hover effects,
 * optional sparkles and glow. Hides when window loses focus or cursor leaves viewport.
 *
 * @example
 * ```tsx
 * import { CustomCursor } from '@/components/ui/base/cursor';
 *
 * <CustomCursor
 *   variation="crystal-scepter-3"
 *   enableSparkles
 *   enableGlow
 * />
 * ```
 */
export function CustomCursor({
  variation,
  enableSparkles = false,
  enableGlow = false,
}: CustomCursorProps) {
  const { resolvedTheme } = useTheme();
  const [domTheme, setDomTheme] = useState<'light' | 'dark' | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const detectTheme = () => {
      const isDark = root.classList.contains('dark');
      setDomTheme(isDark ? 'dark' : 'light');
    };

    detectTheme();

    const observer = new MutationObserver(detectTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const themeMode = useMemo(
    () => resolvedTheme ?? domTheme ?? 'light',
    [domTheme, resolvedTheme],
  );

  const activeVariation: CursorVariation = useMemo(() => {
    if (variation) return variation;
    return themeMode === 'dark' ? 'default-white' : 'default-black';
  }, [variation, themeMode]);

  const sparkleColor = useMemo(
    () => resolveSparkleColor(activeVariation),
    [activeVariation],
  );

  const glowColor = useMemo(
    () => resolveGlowColor(activeVariation),
    [activeVariation],
  );

  useEffect(() => {
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') setIsVisible(false);
      if (document.visibilityState === 'visible') setIsVisible(true);
    };
    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsVisible(false);
      }
    };
    const handleContextMenu = () => setIsVisible(false);

    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('blur', handleLeave);
    window.addEventListener('focus', handleEnter);
    window.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('blur', handleLeave);
      window.removeEventListener('focus', handleEnter);
      window.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  useEffect(() => {
    let sparkleCounter = 0;
    let moveCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const hoveringInteractive = detectInteractive(e.clientX, e.clientY);

      setPosition({ x: e.clientX, y: e.clientY });
      setIsHoveringInteractive(hoveringInteractive);
      setIsVisible(true);

      if (enableSparkles && moveCounter % 3 === 0) {
        setTimeout(() => {
          const newSparkle: Sparkle = {
            id: sparkleCounter++,
            x: e.clientX + (Math.random() - 0.5) * 25,
            y: e.clientY + (Math.random() - 0.5) * 25,
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
  }, [enableSparkles, sparkleColor]);

  useEffect(() => {
    if (!enableSparkles) {
      setSparkles([]);
    }
  }, [enableSparkles]);

  useEffect(() => {
    if (!isVisible) {
      setSparkles([]);
    }
  }, [isVisible]);

  return (
    <>
      {enableSparkles &&
        sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className='pointer-events-none fixed z-[9998] animate-ping opacity-70'
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: '3px',
              height: '3px',
              background: sparkleColor,
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              boxShadow: `0 0 6px ${sparkleColor}`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      <span
        className='pointer-events-none fixed z-[9999] drop-shadow-lg'
        style={{
          left: position.x,
          top: position.y,
          width: `${CURSOR_SIZE}px`,
          height: `${CURSOR_SIZE}px`,
        }}
      >
        <Image
          src={cursorImages[activeVariation]}
          alt='cursor'
          width={CURSOR_SIZE}
          height={CURSOR_SIZE}
          priority
          unoptimized
          className={`pointer-events-none transition-transform duration-150 ${
            isHoveringInteractive ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
          }`}
          style={{
            opacity: isVisible ? 1 : 0,
            filter: enableGlow
              ? `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 10px ${glowColor})`
              : undefined,
          }}
        />
      </span>
    </>
  );
}
