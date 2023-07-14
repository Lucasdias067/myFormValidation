'use client';
import { useAuth } from '@/context/OutputContext';
import { XCircleIcon } from '@heroicons/react/24/solid';

import React from 'react';

export default function FormOutput() {
  const { output, setOutput } = useAuth();

  function removeOutput(index: number) {
    const newForm = output.filter((_, itemIndex) => {
      return itemIndex !== index;
    });
    setOutput([...newForm]);
    localStorage.setItem('userForm', JSON.stringify(newForm));
  }

  return (
    <div className='flex flex-col gap-4'>
      {output &&
        output.map((user, index) => (
          <div
            className='relative rounded-lg bg-zinc-200 p-6 text-sm text-white dark:bg-zinc-800'
            key={index}
          >
            <p className='mb-4 text-lg font-bold text-zinc-950 dark:text-gray-400'>
              Nome:
              <span className='ml-2 inline text-base text-zinc-950 dark:text-gray-400'>
                {user.name}
              </span>
            </p>
            <p className='mb-2'>
              <span className='mr-2 font-bold text-zinc-950 dark:text-gray-400'>
                Email:
              </span>
              <span className='ml-2 inline text-base text-zinc-950 dark:text-gray-400'>
                {user.email}
              </span>
            </p>
            <p className='mb-2'>
              <span className='mr-2 font-bold text-zinc-950 dark:text-gray-400'>
                Senha:
              </span>
              <span className='ml-2 inline text-base text-zinc-950 dark:text-gray-400'>
                {user.password}
              </span>
            </p>
            <p className='mb-2 font-bold text-zinc-950 dark:text-gray-400'>
              Tecnologias:
            </p>
            {user.techs.map((tech) => (
              <p
                key={tech.title}
                className='pl-2 text-zinc-950 dark:text-gray-400'
              >
                {tech.title} -{' '}
                <span className='text-sm font-bold text-zinc-950 dark:text-slate-300'>
                  {tech.knowledge}
                </span>
              </p>
            ))}
            <XCircleIcon
              onClick={() => removeOutput(index)}
              className='absolute -right-3 -top-3 w-8 cursor-pointer text-rose-700 dark:text-rose-500'
            />
          </div>
        ))}
    </div>
  );
}
