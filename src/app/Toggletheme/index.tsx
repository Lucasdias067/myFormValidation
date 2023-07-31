'use client';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

export default function ToggleTheme() {
  useEffect(() => {
    const systemPreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const darkClass = localStorage.getItem('theme') === 'dark';
    const pageClasses = document.documentElement.classList;

    systemPreference && darkClass && pageClasses.add('dark');
  }, []);

  function handleToggle() {
    const myClasses = document.documentElement.classList;
    myClasses.toggle('dark');
    localStorage.setItem(
      'theme',
      myClasses.contains('dark') ? 'dark' : 'light'
    );
  }

  return (
    <div className='w-max rounded-lg p-2 dark:border-gray-700 sm:block '>
      <MoonIcon
        onClick={handleToggle}
        className='h-8 cursor-pointer text-slate-200 dark:hidden'
      />
      <SunIcon
        onClick={handleToggle}
        className='hidden h-8 cursor-pointer text-white dark:block dark:text-orange-500'
      />
    </div>
  );
}
