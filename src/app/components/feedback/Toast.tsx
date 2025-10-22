import React, { ReactElement } from 'react';

interface ToastProps {
  icon?: React.ReactNode;
  text: string;
}

/**
 * Toast
 *
 * Short notification with an optional icon.
 *
 * Props:
 * @param {React.ReactNode | undefined} icon - Optional icon or element displayed to the left of the message.
 * @param {string} text - Message to display.
 *
 * Return: ReactElement
 */
export default function Toast({ icon, text }: ToastProps): ReactElement {
  return (
    <div className="rounded-2x1 flex items-center gap-3 px-4 shadow-sm">
      {/*Icon*/}
      {icon && <div className="">{icon}</div>}

      {/*Text*/}
      <p className="">{text}</p>
    </div>
  );
}
