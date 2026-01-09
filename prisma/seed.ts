import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    id: 1n,
    username: 'user1',
    nickname: 'User One',
    verified: true,
  },
  {
    id: 2n,
    username: 'user2',
    nickname: 'User Two',
  },
];

const feedbackData: Prisma.FeedbackCreateInput[] = [
  { context: 'Super Seite!', user: { connect: { id: 1n } } },
  { context: 'Mehr Darkmode bitte.', user: { connect: { id: 1n } } },
  { context: 'Feedback funktioniert.', user: { connect: { id: 2n } } },
];

const ratingData: Prisma.RatingCreateInput[] = [
  {
    site: 'SITE_1_PLACEHOLDER',
    score: 5,
    context: 'Sehr gut!',
    user: { connect: { id: 1n } },
  },
  {
    site: 'SITE_2_PLACEHOLDER',
    score: 3,
    context: 'Mittelmäßig',
    user: { connect: { id: 2n } },
  },
  { site: 'SITE_3_PLACEHOLDER', score: 6, user: { connect: { id: 1n } } },
];

export async function main() {
  // Create User
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }

  // Create Feedback
  for (const f of feedbackData) {
    await prisma.feedback.create({ data: f });
  }

  // Create Rating
  for (const r of ratingData) {
    await prisma.rating.create({ data: r });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
