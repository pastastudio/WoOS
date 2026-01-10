import Image, { StaticImageData } from 'next/image';
import { LockSolid } from '@2hoch1/pixel-icon-library-react';
import { cn } from '@/lib/utils';

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

type WandVariation =
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

type WandDisplayProps = {
  variation?: WandVariation;
  alt?: string;
  locked?: boolean;
  className?: string;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  size?: number;
};

const wandImages: Record<WandVariation, StaticImageData> = {
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

export default function WandDisplay({
  variation = 'default-white',
  alt = 'Wand',
  locked = false,
  className,
  rotation = 0,
  offsetX = 0,
  offsetY = 0,
  size = 1,
}: WandDisplayProps) {
  const src = wandImages[variation] ?? CrystalScepterOne;
  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden rounded border',
        'border-border/70 bg-muted/40',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes='100vw'
        className={cn(
          'object-contain p-6 transition-all',
          locked && 'opacity-80 blur-[1px] brightness-90',
        )}
        style={{
          transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px) scale(${size})`,
        }}
        priority={false}
      />

      {locked && (
        <div className='pointer-events-none absolute inset-0 grid place-items-center'>
          <div className='flex h-14 w-14 items-center justify-center rounded-md'>
            <LockSolid className='h-10 w-10 text-white/90' />
          </div>
        </div>
      )}
    </div>
  );
}
