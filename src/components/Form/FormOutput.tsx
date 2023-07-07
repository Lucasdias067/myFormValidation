'use client';
import React from 'react';

export interface Ioutput {
  name: string;
  email: string;
  password: string;
  techs: {
    title: string;
    knowledge: string;
  }[];
}

interface FormOutputProps {
  output: Ioutput[];
}

export default function FormOutput({ output }: FormOutputProps) {
  return (
    <div className='flex flex-col gap-4'>
      {output &&
        output.map((user, index) => (
          <div
            className='rounded-lg bg-zinc-800 p-6 text-sm text-zinc-100'
            key={index}
          >
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Senha: {user.password}</p>
            <p>Tecnologias:</p>
            {user.techs.map((tech) => (
              <p key={tech.title}>
                {' '}
                {tech.title} - {tech.knowledge}{' '}
              </p>
            ))}
          </div>
        ))}
    </div>
  );
}
