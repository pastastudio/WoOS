'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type QuestAnswer = {
  answer: 'correct' | 'wrong';
  question: string;
  chapterName: string;
  chapterIndex: number;
};

interface QuestAnswersProps {
  answers: QuestAnswer[];
}

function QuestAnswers({ answers }: QuestAnswersProps) {
  return (
    <Table className='mx-auto w-fit'>
      <TableCaption>Your quiz answers and results.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='px-4'>Answer</TableHead>
          <TableHead className='px-4'>Question</TableHead>
          <TableHead className='px-4'>Chapter</TableHead>
          <TableHead className='px-4 text-right'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {answers.map((answer, index) => (
          <TableRow key={index}>
            <TableCell className='px-4 font-medium'>
              <span
                className={`inline-flex w-18 items-center justify-center rounded-full px-3 py-1 text-sm font-medium ${
                  answer.answer === 'correct'
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                {answer.answer}
              </span>
            </TableCell>
            <TableCell className='px-4'>{answer.question}</TableCell>
            <TableCell className='px-4'>{answer.chapterName}</TableCell>
            <TableCell className='px-4 text-right'>
              <Link href={`/informations/${answer.chapterIndex}`}>
                <Button variant='ghost' size='sm' className='gap-2'>
                  View <ArrowRight className='h-4 w-4' />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { QuestAnswers };
