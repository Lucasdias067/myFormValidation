import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface fieldProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FormField({ children, ...rest }: fieldProps) {
  return (
    <div
      className={twMerge('flex flex-col justify-center gap-1 ', rest.className)}
      {...rest}
    >
      {children}
    </div>
  );
}
