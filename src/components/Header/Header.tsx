'use client';

import ToggleTheme from '@/app/Toggletheme';

export default function Header() {
  return (
    <div className='flex h-14 justify-center bg-zinc-800 dark:bg-zinc-200'>
      <ToggleTheme />
    </div>
  );
}
