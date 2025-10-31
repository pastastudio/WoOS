import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

/**
 * GET /api/feedback
 * Returns all feedback entries
 */
export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        id: 'desc', // Newest first
      },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 },
    );
  }
}

/**
 * POST /api/feedback
 * Creates a new feedback entry
 * Body: { content: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content } = body;

    if (
      !content ||
      typeof content !== 'string' ||
      content.trim().length === 0
    ) {
      return NextResponse.json(
        { error: 'Content is required and must be a non-empty string' },
        { status: 400 },
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        content: content.trim(),
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json(
      { error: 'Failed to create feedback' },
      { status: 500 },
    );
  }
}
