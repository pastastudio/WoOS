'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface QuestChartProps {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
}

function QuestChart({
  correctAnswers,
  wrongAnswers,
  totalQuestions,
}: QuestChartProps) {
  const chartData = [
    {
      label: 'Total Questions',
      value: totalQuestions,
      fill: 'var(--color-total)',
    },
    {
      label: 'Correct Answers',
      value: correctAnswers,
      fill: 'var(--color-correct)',
    },
    { label: 'Wrong Answers', value: wrongAnswers, fill: 'var(--color-wrong)' },
  ];

  const chartConfig = {
    total: {
      label: 'Total Questions',
      color: 'var(--chart-1)',
    },
    correct: {
      label: 'Correct Answers',
      color: '#22c55e', // Green
    },
    wrong: {
      label: 'Wrong Answers',
      color: '#ef4444', // Red
    },
  } satisfies ChartConfig;

  return (
    <div className='bg-background w-full max-w-xl rounded-md border p-4'>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          layout='vertical'
          margin={{
            left: 20,
          }}
        >
          <XAxis dataKey='value' hide type='number' />
          <YAxis
            axisLine={false}
            dataKey='label'
            tickLine={false}
            tickMargin={10}
            type='category'
            width={150}
          />
          <ChartTooltip
            content={<ChartTooltipContent hideLabel />}
            cursor={false}
          />
          <Bar dataKey='value' radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export { QuestChart };
