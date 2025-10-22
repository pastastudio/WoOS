import React, { ReactElement, ChangeEvent } from 'react';

interface InputfieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

/**
 * Inputfield
 *
 * Labeled text input field with error display.
 *
 * Props:
 * @param {string} label - Label for the input field.
 * @param {string} value - Current value of the input field.
 * @param {(e: ChangeEvent<HTMLInputElement>) => void} onChange - Change handler.
 * @param {string | undefined} placeholder - Optional placeholder.
 * @param {string | undefined} error - Optional error text displayed below the field.
 *
 * Return: ReactElement
 */
export default function Inputfield({
  label,
  value,
  onChange,
  placeholder,
  error,
}: InputfieldProps): ReactElement {
  return (
    <div>
      <label className="mb-1 block font-medium">{label}</label>
      <input
        className={`rounded border p-2 focus:ring-2 focus:outline-none ${
          error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-gray-400 focus:ring-blue-200'
        }`}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
