'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { OS_BRAND_COLORS } from './os-colors';

interface AnalyzeChartProps {
  windowsPercentage: number;
  linuxPercentage: number;
  macosPercentage: number;
}

function AnalyzeChart({ windowsPercentage, linuxPercentage, macosPercentage }: AnalyzeChartProps) {
  const chartData = [
    {
      os: 'windows',
      percentage: windowsPercentage,
      fill: 'var(--color-windows)',
    },
    { os: 'linux', percentage: linuxPercentage, fill: 'var(--color-linux)' },
    { os: 'macos', percentage: macosPercentage, fill: 'var(--color-macos)' },
  ];

  const chartConfig = {
    percentage: {
      label: 'Percentage',
    },
    windows: {
      label: 'Windows',
      color: OS_BRAND_COLORS.windows,
    },
    linux: {
      label: 'Linux',
      color: OS_BRAND_COLORS.linux,
    },
    macos: {
      label: 'macOS',
      color: OS_BRAND_COLORS.macos,
    },
  } satisfies ChartConfig;

  return (
    <div className="bg-background w-full max-w-xl rounded-none border p-4">
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="os"
            tickFormatter={value => chartConfig[value as keyof typeof chartConfig]?.label}
            tickLine={false}
            tickMargin={10}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
          <Bar dataKey="percentage" radius={0} strokeWidth={2} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export { AnalyzeChart };
