import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ColorSelectFieldProps {
  id: string;
  label: string;
}

export function ColorSelectField({ id, label }: ColorSelectFieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Select>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select color" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="red">Red</SelectItem>
          <SelectItem value="blue">Blue</SelectItem>
          <SelectItem value="green">Green</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
