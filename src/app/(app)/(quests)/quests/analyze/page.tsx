'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AnalyzeChart } from '@/components/charts/analyze-chart';
import RadarMultiple from '@/components/charts/os-chart';
import { QuestAnswers, type QuestAnswer } from '@/components/quest-answers';
import { QuestChart } from '@/components/charts/quest-chart';
import { Button } from '@/components/ui/button';
import { useQuizContext } from '@/context/quiz-context';
import { computeOsCounts, toPercentage } from '@/lib/analyze';
import Link from 'next/link';

export default function Page() {
  const { state } = useQuizContext();

  if (state.phase !== 'complete') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-3xl font-bold">Take a quiz first</h1>
        <p className="text-muted-foreground max-w-md">
          Complete a chapter quiz to see your personalized analysis here.
        </p>
        <Link href={`/quests`}>
          <Button size="lg">Go to Quests</Button>
        </Link>
      </div>
    );
  }

  const osCounts = computeOsCounts(state.personalQuestions, state.personalAnswers);
  const totalAnswered = osCounts.windows + osCounts.linux + osCounts.macos;
  const percentage = (count: number) => toPercentage(count, totalAnswered);

  // TODO: no ground-truth correct-answer field exists in the question JSON yet
  // (chapter_N.json's `_a/_b/_c` are opaque option ids, not correctness markers),
  // so every answered question is shown as "correct" until real scoring is added.
  const questAnswersData: QuestAnswer[] = state.technicalQuestions.map(question => ({
    answer: 'correct',
    question: question._title,
    chapterName: `Chapter ${state.chapter ?? ''}`.trim(),
    chapterIndex: state.chapter ?? 0,
  }));

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold">Analysis & Insights</h1>
        <p className="text-muted-foreground max-w-2xl">
          Discover how different operating systems are distributed among our users. This data helps
          us understand our community better and improve our platform for everyone.
        </p>
      </div>
      <div>
        <h2>Your Quest Answers</h2>
      </div>
      {/* TODO: correctAnswers/wrongAnswers can't be honestly split yet - see the
          questAnswersData TODO above. Showing answered vs. total until real
          scoring exists. */}
      <QuestChart
        correctAnswers={Object.keys(state.technicalAnswers).length}
        wrongAnswers={0}
        totalQuestions={state.technicalQuestions.length}
      />
      <h2>We would suggest based on your answers to use:</h2>
      <AnalyzeChart
        windowsPercentage={percentage(osCounts.windows)}
        linuxPercentage={percentage(osCounts.linux)}
        macosPercentage={percentage(osCounts.macos)}
      />
      <QuestAnswers answers={questAnswersData} />
      <p className="text-muted-foreground max-w-2xl text-xs">
        This data is calculated based on your answers.
      </p>
      <RadarMultiple />
      <h2>Narratives of Users</h2>
      <Accordion className="w-full max-w-2xl">
        <AccordionItem value="windows">
          <AccordionTrigger>Windows</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              Windows users appreciate the familiar interface and extensive software compatibility.
              The operating system offers seamless integration with Microsoft services and supports
              a wide range of applications and games.
            </p>
            <p>
              With regular updates and robust security features, Windows provides a reliable
              environment for both casual users and professionals. The vast ecosystem ensures
              you&apos;ll find support and resources for any task.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="linux">
          <AccordionTrigger>Linux</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              Linux enthusiasts value open-source freedom, customization, and control over their
              system. The operating system is known for its stability, security, and efficient
              resource management.
            </p>
            <p>
              Whether you&apos;re a developer, system administrator, or privacy-conscious user,
              Linux offers powerful command-line tools, extensive package managers, and a supportive
              community that continuously improves the ecosystem.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="macos">
          <AccordionTrigger>macOS</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              macOS users enjoy a polished, intuitive experience with seamless integration across
              Apple devices. The operating system combines Unix-based power with elegant design and
              user-friendly features.
            </p>
            <p>
              Perfect for creative professionals and developers alike, macOS offers excellent
              performance, outstanding display quality, and a curated ecosystem of high-quality
              applications that work harmoniously together.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
