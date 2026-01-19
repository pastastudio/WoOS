import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { chapter } = await request.json();

    if (!chapter || typeof chapter !== 'number') {
      return Response.json(
        { error: 'Invalid chapter number' },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();

    // Get existing completed chapters
    const completedCookie =
      cookieStore.get('completed_chapters')?.value || '[]';
    let completedChapters: number[] = [];

    try {
      completedChapters = JSON.parse(completedCookie);
    } catch {
      completedChapters = [];
    }

    // Add chapter if not already completed
    if (!completedChapters.includes(chapter)) {
      completedChapters.push(chapter);
    }

    // Sort for consistency
    completedChapters.sort((a, b) => a - b);

    // Set cookie (expires in 1 year)
    cookieStore.set('completed_chapters', JSON.stringify(completedChapters), {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return Response.json({
      success: true,
      completedChapters,
    });
  } catch (error) {
    console.error('Error saving chapter completion:', error);
    return Response.json(
      { error: 'Failed to save chapter completion' },
      { status: 500 },
    );
  }
}
