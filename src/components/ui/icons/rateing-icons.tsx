'use client';

import Alright from '@assets/emojis/alright.svg';
import Happy from '@assets/emojis/happy.svg';
import NotHappy from '@assets/emojis/not-happy.svg';
import Okay from '@assets/emojis/okay.svg';
import { useState } from 'react';

import AlrightFilled from '@assets/emojis/alright_filled.svg';
import HappyFilled from '@assets/emojis/happy_filled.svg';
import NotHappyFilled from '@assets/emojis/not-happy_filled.svg';
import OkayFilled from '@assets/emojis/okay_filled.svg';

export function HappyRateing() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='cursor-pointer'
    >
      {isHovered ? <HappyFilled /> : <Happy />}
    </div>
  );
}

export function AlrightRateing() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='cursor-pointer'
    >
      {isHovered ? <AlrightFilled /> : <Alright />}
    </div>
  );
}

export function OkayRateing() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='cursor-pointer'
    >
      {isHovered ? <OkayFilled /> : <Okay />}
    </div>
  );
}

export function NotHappyRateing() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='cursor-pointer'
    >
      {isHovered ? <NotHappyFilled /> : <NotHappy />}
    </div>
  );
}
