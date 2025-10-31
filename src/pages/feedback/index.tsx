'use client';

import React, { useState, useEffect } from 'react';
import List from '../../app/components/ui/content/List';
import Inputfield from '../../app/components/ui/input/Inputfield';

interface Feedback {
  id: number;
  content: string;
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all feedbacks on mount
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/feedback');
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      } else {
        console.error('Failed to fetch feedbacks');
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFeedback.trim()) {
      alert('Bitte geben Sie Feedback ein!');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newFeedback }),
      });

      if (response.ok) {
        const createdFeedback = await response.json();
        setFeedbacks([createdFeedback, ...feedbacks]); // Add to top
        setNewFeedback(''); // Clear input
      } else {
        const error = await response.json();
        alert(`Fehler: ${error.error || 'Unbekannter Fehler'}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Fehler beim Senden des Feedbacks');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-grid min-h-screen p-6">
      <main className="app-col app-col-main">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="pb-8 text-center text-4xl font-bold">Feedback</h1>

          {/* Feedback List */}
          <section className="mb-8">
            <h2 className="mb-4 text-center text-2xl font-semibold">
              Alle Feedbacks
            </h2>
            {isLoading ? (
              <p className="text-center text-gray-500">Lade Feedbacks...</p>
            ) : feedbacks.length === 0 ? (
              <p className="text-center text-gray-500">
                Noch keine Feedbacks vorhanden.
              </p>
            ) : (
              <List
                items={feedbacks}
                renderItem={(feedback) => (
                  <div className="rounded bg-gray-50 p-4 dark:bg-gray-800">
                    <p>{feedback.content}</p>
                  </div>
                )}
              />
            )}
          </section>

          {/* Feedback Form */}
          <section className="rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-700">
            <h2 className="mb-4 text-center text-2xl font-semibold">
              Neues Feedback
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Inputfield
                label="Ihr Feedback"
                placeholder="Geben Sie hier Ihr Feedback ein..."
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-blue-600 px-5 py-2 text-white shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Feedback absenden'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
