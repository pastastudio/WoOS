import React, { ReactElement } from 'react';

interface TextareaProps {
  text: string;
  label?: string;
}

/**
 * Textarea
 *
 * A read-only textarea component with an optional label.
 *
 * Props:
 * @param {string} text - The text displayed in the textarea.
 * @param {string | undefined} label - Optional label displayed above the textarea.
 *
 * Return: ReactElement
 */
export default function Textarea({ text, label }: TextareaProps): ReactElement {
  return (
    <div className="flex flex-col space-y-2">
      {/*Optional label*/}
      {label && <label className="">{label}</label>}

      {/*Textarea*/}
      <textarea
        value={text}
        readOnly
        className="min-h-[100px] w-full cursor-default focus:outline-none"
      />
    </div>
  );
}
