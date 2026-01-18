import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AnalyzeChart } from '@/components/ui/base/analyze-chart';
import {
  QuestAnswers,
  type QuestAnswer,
} from '@/components/ui/base/quest-answers';
import { QuestChart } from '@/components/ui/base/quest-chart';

const questAnswersData: QuestAnswer[] = [
  {
    answer: 'correct',
    question: 'What is React?',
    chapterName: 'Introduction to React',
    chapterIndex: 1,
  },
  {
    answer: 'wrong',
    question: 'How do you create a component?',
    chapterName: 'Creating Components',
    chapterIndex: 2,
  },
  {
    answer: 'correct',
    question: 'What are props?',
    chapterName: 'Props and State',
    chapterIndex: 3,
  },
  {
    answer: 'wrong',
    question: 'Explain hooks',
    chapterName: 'React Hooks',
    chapterIndex: 4,
  },
  {
    answer: 'correct',
    question: 'What is JSX?',
    chapterName: 'JSX Basics',
    chapterIndex: 5,
  },
];

const TEXT_CONFIG = {
  title: 'Analysis & Insights',
} as const;

export default function Page() {
  return (
    <div className='flex flex-col items-center gap-8 py-12'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <h1 className='text-4xl font-bold'>Analysis & Insights</h1>
        <p className='text-muted-foreground max-w-2xl'>
          Discover how different operating systems are distributed among our
          users. This data helps us understand our community better and improve
          our platform for everyone.
        </p>
      </div>
      <div>
        <h2>Your Quest Answers</h2>
      </div>
      <QuestChart correctAnswers={7} wrongAnswers={3} totalQuestions={10} />
      <h2>We would suggest based on your answers to use:</h2>
      <AnalyzeChart
        windowsPercentage={100}
        linuxPercentage={30}
        macosPercentage={20}
      />
      <QuestAnswers answers={questAnswersData} />
      <p className='text-muted-foreground max-w-2xl text-xs'>
        This data is calculated based on your answers.
      </p>
      <h2>Narratives of Users</h2>
      <Accordion className='w-full max-w-2xl'>
        <AccordionItem value='windows'>
          <AccordionTrigger>Windows</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-4'>
            <p>
              Windows users appreciate the familiar interface and extensive
              software compatibility. The operating system offers seamless
              integration with Microsoft services and supports a wide range of
              applications and games.
            </p>
            <p>
              With regular updates and robust security features, Windows
              provides a reliable environment for both casual users and
              professionals. The vast ecosystem ensures you&apos;ll find support
              and resources for any task.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='linux'>
          <AccordionTrigger>Linux</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-4'>
            <p>
              Linux enthusiasts value open-source freedom, customization, and
              control over their system. The operating system is known for its
              stability, security, and efficient resource management.
            </p>
            <p>
              Whether you&apos;re a developer, system administrator, or
              privacy-conscious user, Linux offers powerful command-line tools,
              extensive package managers, and a supportive community that
              continuously improves the ecosystem.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='macos'>
          <AccordionTrigger>macOS</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-4'>
            <p>
              macOS users enjoy a polished, intuitive experience with seamless
              integration across Apple devices. The operating system combines
              Unix-based power with elegant design and user-friendly features.
            </p>
            <p>
              Perfect for creative professionals and developers alike, macOS
              offers excellent performance, outstanding display quality, and a
              curated ecosystem of high-quality applications that work
              harmoniously together.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
