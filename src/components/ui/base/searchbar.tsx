'use client';

import * as React from 'react';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

export interface SearchBarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchBarDialog({
  open,
  onOpenChange,
}: SearchBarDialogProps): React.ReactElement {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder='Suche oder Befehle eingeben...' />
      <CommandList>
        <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>
        <CommandGroup heading='Vorschläge'>
          <CommandItem>
            <Calendar />
            <span>Kalender</span>
          </CommandItem>
          <CommandItem>
            <Smile />
            <span>Emoji suchen</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator />
            <span>Rechner</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Einstellungen'>
          <CommandItem>
            <User />
            <span>Profil</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Abrechnung</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Einstellungen</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export { CommandDialog };
