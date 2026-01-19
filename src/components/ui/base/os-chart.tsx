'use client';

export const title = 'React Multiple Radar Chart';

import { useState } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { Button } from '@/components/ui/button';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'Individualisation', Windows: 60, Linux: 100, MacOS: 50 },
  { month: 'Data Privacy', Windows: 40, Linux: 90, MacOS: 70 },
  { month: 'Hardware independence', Windows: 60, Linux: 90, MacOS: 50 },
  { month: 'Energy Efficiency', Windows: 50, Linux: 60, MacOS: 70 },
  { month: 'Gaming', Windows: 90, Linux: 70, MacOS: 17 },
  { month: 'Content Creation', Windows: 90, Linux: 80, MacOS: 95 },
];

const chartConfig = {
  Windows: {
    label: 'Windows',
    color: '#0078D4', // Microsoft Blue
  },
  Linux: {
    label: 'Linux',
    color: '#FCC624', // Linux Yellow
  },
  MacOS: {
    label: 'MacOS',
    color: '#A2AAAD', // Apple Gray
  },
} satisfies ChartConfig;

function RadarMultiple() {
  const [visibility, setVisibility] = useState({
    Windows: true,
    Linux: true,
    MacOS: true,
  });

  const toggleVisibility = (os: keyof typeof visibility) => {
    // Prevent disabling all options - at least one must remain visible
    const currentlyVisible = Object.values(visibility).filter((v) => v).length;
    if (currentlyVisible === 1 && visibility[os]) {
      return; // Don't allow turning off the last visible OS
    }
    setVisibility((prev) => ({ ...prev, [os]: !prev[os] }));
  };

  return (
    <div className='flex h-full w-full flex-col p-4'>
      <div className='mb-2 text-center'>
        <h2>The Strengths of different OS in Comparison:</h2>
        <p className='text-muted-foreground text-sm'>
          Showing performance in different aspects
        </p>
      </div>

      {/* Legend with toggle buttons */}
      <div className='mb-6 flex flex-wrap items-center justify-center gap-4'>
        {(Object.keys(chartConfig) as Array<keyof typeof chartConfig>).map(
          (os) => (
            <Button
              key={os}
              variant={visibility[os] ? 'default' : 'outline'}
              size='sm'
              onClick={() => toggleVisibility(os)}
              className='flex items-center gap-2'
              style={
                visibility[os]
                  ? {
                      backgroundColor: chartConfig[os].color,
                      borderColor: chartConfig[os].color,
                      color: os === 'Linux' ? '#000' : '#fff',
                    }
                  : {
                      borderColor: chartConfig[os].color,
                      color: chartConfig[os].color,
                    }
              }
            >
              <div
                className='h-3 w-3 rounded-full'
                style={{
                  backgroundColor: visibility[os] ? '#fff' : 'transparent',
                  border: `2px solid ${visibility[os] ? '#fff' : chartConfig[os].color}`,
                }}
              />
              {chartConfig[os].label}
            </Button>
          ),
        )}
      </div>

      <div className='flex min-h-0 flex-1 items-center justify-center'>
        <ChartContainer config={chartConfig} className='w-full max-w-6xl'>
          <RadarChart
            data={chartData}
            margin={{ top: 40, right: 130, bottom: 40, left: 130 }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='month' />
            <PolarGrid />
            {visibility.Windows && (
              <Radar
                dataKey='Windows'
                fill='#0078D4'
                fillOpacity={0.6}
                stroke='#0078D4'
                strokeWidth={2}
              />
            )}
            {visibility.Linux && (
              <Radar
                dataKey='Linux'
                fill='#FCC624'
                fillOpacity={0.6}
                stroke='#FCC624'
                strokeWidth={2}
              />
            )}
            {visibility.MacOS && (
              <Radar
                dataKey='MacOS'
                fill='#A2AAAD'
                fillOpacity={0.6}
                stroke='#A2AAAD'
                strokeWidth={2}
              />
            )}
          </RadarChart>
        </ChartContainer>
      </div>
      <div className='mt-2 flex flex-col gap-1 text-center text-sm'>
        <div className='text-muted-foreground flex items-center justify-center gap-2 leading-none'>
          Click legend buttons to toggle OS visibility
        </div>
      </div>
    </div>
  );
}

export default RadarMultiple;
