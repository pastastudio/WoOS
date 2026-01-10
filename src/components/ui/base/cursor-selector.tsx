'use client';

import { useState } from 'react';
import { MousePointer2, Palette, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type SkeletonCursor = {
  name: string;
  accent: string;
  detail: string;
};

const skeletonCursors: SkeletonCursor[] = [
  {
    name: 'Cherry Bloom',
    accent: 'from-rose-400 to-orange-300',
    detail: 'Pastel Glow · Federleicht · Soft Trails',
  },
  {
    name: 'Neon Synth',
    accent: 'from-cyan-400 via-violet-500 to-fuchsia-500',
    detail: 'RGB Neon · Crisp Outline · Pulse',
  },
  {
    name: 'Blueprint',
    accent: 'from-sky-300 to-indigo-700',
    detail: 'Grid Texture · Cool Tone · Technical',
  },
];

function CursorSkeletonRow({ name, accent, detail }: SkeletonCursor) {
  return (
    <Card className='border-muted-foreground/20 bg-muted/30 border-dashed shadow-none'>
      <CardHeader className='flex flex-row items-start gap-4'>
        <div
          className={`size-12 rounded-lg bg-gradient-to-br ${accent} opacity-80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] blur-[0.4px]`}
        />
        <div className='flex-1 space-y-1.5'>
          <CardTitle className='flex items-center gap-2 text-base'>
            <MousePointer2 className='text-muted-foreground size-4' />
            <span>{name}</span>
            <Badge variant='outline'>Coming soon</Badge>
          </CardTitle>
          <CardDescription className='text-xs sm:text-sm'>
            {detail}
          </CardDescription>
        </div>
        <div className='text-muted-foreground flex items-center gap-1 text-xs'>
          <Palette className='size-4' />
          <span>Preview</span>
        </div>
      </CardHeader>
      <CardContent className='grid gap-2 sm:grid-cols-3'>
        <div className='bg-foreground/10 h-8 rounded-md' />
        <div className='bg-foreground/10 h-8 rounded-md' />
        <div className='bg-foreground/10 hidden h-8 rounded-md sm:block' />
      </CardContent>
    </Card>
  );
}

export default function CursorSelectSkeleton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className='from-background to-muted/50 flex items-center gap-3 rounded-xl border bg-gradient-to-br p-4 shadow-sm'>
        <div className='bg-muted/50 grid size-12 place-items-center rounded-lg border'>
          <MousePointer2 className='text-muted-foreground size-5' />
        </div>
        <div className='flex-1 space-y-1'>
          <p className='text-sm font-medium'>Cursor Presets</p>
          <p className='text-muted-foreground text-sm'>
            Kleines Skeleton, das die Dialog-Komponente nutzt, um künftige
            Cursor-Styles zu skizzieren.
          </p>
        </div>
        <DialogTrigger>
          <Button size='lg'>Dialog öffnen</Button>
        </DialogTrigger>
      </div>

      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Cursor auswählen</DialogTitle>
          <DialogDescription>
            Placeholder-Dialog mit Skeleton-Karten. Später können hier echte
            Presets und Live-Previews landen.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-3'>
          {skeletonCursors.map((cursor) => (
            <CursorSkeletonRow key={cursor.name} {...cursor} />
          ))}
        </div>

        <DialogFooter className='flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
            <Sparkles className='size-4' />
            <span>Live-Vorschau und Auswahl folgen.</span>
          </div>
          <div className='flex gap-2'>
            <DialogClose>
              <Button variant='ghost'>Schließen</Button>
            </DialogClose>
            <Button disabled>Übernehmen</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
