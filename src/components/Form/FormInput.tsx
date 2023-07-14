import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function FormInput({ name, ...rest }: inputProps) {
  const { register } = useFormContext();

  return (
    <input
      className='mb-1 h-10 rounded border px-3 text-[15px] text-zinc-950 shadow-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white '
      {...register(name)}
      {...rest}
    />
  );
}
