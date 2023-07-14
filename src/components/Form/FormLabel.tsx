import { LabelHTMLAttributes } from 'react';

export function FormLabel(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className='flex items-center justify-between text-zinc-950 dark:text-zinc-400'
      {...props}
    />
  );
}
