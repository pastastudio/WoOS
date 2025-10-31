import { PrismaClient, Prisma } from '../src/app/generated/prisma';

const prisma = new PrismaClient();

const feedbackData: Prisma.FeedbackCreateInput[] = [
  { content: 'Super Seite!' },
  { content: 'Mehr Darkmode bitte.' },
  { content: 'Feedback funktioniert.' },
];

export async function main() {
  for (const f of feedbackData) {
    await prisma.feedback.create({ data: f });
  }
}

main();
