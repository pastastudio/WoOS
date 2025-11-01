import React, { ReactElement, ChangeEvent, useState } from 'react';

interface InputfieldProps {
  label: string;
  /** Controlled value. If omitted the component will manage its own internal state. */
  value?: string;
  /** Change handler for controlled usage. Optional when uncontrolled. */
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Initial value when using uncontrolled mode */
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  className?: string; // optional wrapper class (e.g. "max-w-md")
  fullWidth?: boolean; // make input take full width of its container
  height?: string; // CSS height, e.g. "48px" or "3rem"
  heightClass?: string; // optional Tailwind height class, e.g. "h-12"
  multiline?: boolean; // render a textarea that wraps lines
  rows?: number; // textarea rows
}

/**
 * Inputfield
 *
 * Labeled text input field with error display.
 *
 * Props:
 * @param {string} label - Label for the input field.
 * @param {string} value - Current value of the input field.
 * @param {(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} onChange - Change handler.
 * @param {string | undefined} placeholder - Optional placeholder.
 * @param {string | undefined} error - Optional error text displayed below the field.
 * @param {string | undefined} className - Optional wrapper CSS class (e.g. "max-w-md" or "w-full").
 * @param {boolean} [fullWidth=false] - When true the input and wrapper will take full width of their container.
 * @param {string} [height] - CSS height, e.g. "48px" or "3rem"
 * @param {string} [heightClass] - Optional Tailwind height class, e.g. "h-12"
 * @param {boolean} [multiline=false] - When true, render a textarea that wraps lines.
 * @param {number} [rows] - Number of rows for the textarea.
 *
 * Return: ReactElement
 */
export default function Inputfield({
  label,
  value,
  onChange,
  defaultValue,
  placeholder,
  error,
  className,
  fullWidth = false,
  height,
  heightClass,
  multiline = false,
  rows,
}: InputfieldProps): ReactElement {
  // controlled vs uncontrolled
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? '',
  );
  const currentValue = isControlled ? value : internalValue;

  const wrapperClasses =
    `${fullWidth ? 'w-full' : ''} ${className ?? ''}`.trim();
  const inputWidthClass = fullWidth ? 'w-full' : '';
  const inputHeightClass = height ? '' : (heightClass ?? '');
  const inputStyle = height ? { height } : undefined;

  const sharedClasses = `rounded border p-2 focus:ring-2 focus:outline-none ${inputWidthClass} ${inputHeightClass} ${
    error
      ? 'border-red-500 focus:ring-red-200'
      : 'border-gray-400 focus:ring-blue-200'
  }`;

  // specific handlers to satisfy textarea/input event types and forward to the union-typed onChange
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (onChange)
      onChange(e as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (onChange)
      onChange(e as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
  };

  return (
    <div className={wrapperClasses}>
      <label className="mb-1 block font-medium">{label}</label>

      {multiline ? (
        <textarea
          style={inputStyle}
          rows={rows ?? 3}
          className={`${sharedClasses} resize-y`}
          value={currentValue}
          onChange={handleTextareaChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          style={inputStyle}
          className={sharedClasses}
          type="text"
          value={currentValue}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      )}

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
