'use client';

import React, { ReactElement } from 'react';

interface SwitchProps {
  checked?: boolean | undefined;
  onChange?: (checked: boolean) => void;
}

/**
 * Switch
 *
 * A toggle switch that holds a boolean state and triggers an `onChange` callback.
 *
 * Props:
 * @param {boolean | undefined} checked - Initial state of the switch (default: false).
 * @param {(checked: boolean) => void | undefined} onChange - Callback invoked on toggle with the new state.
 *
 * Return: ReactElement
 */
export default function Switch({
  checked = false,
  onChange,
}: SwitchProps): ReactElement {
  const [isOn, setIsOn] = React.useState(checked);

  const toggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  React.useEffect(() => {
    setIsOn(checked);
  }, [checked]);

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={`relative inline-flex h-5 w-10 items-center rounded-md transition-colors ${isOn ? 'bg-blue-500' : 'bg-gray-400'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-md bg-white transition-transform ${isOn ? 'translate-x-5' : 'translate-x-1'}`}
        />
      </button>
    </>
  );
}
