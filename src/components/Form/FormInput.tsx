import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function FormInput({ name, ...rest }: inputProps) {
  const { register } = useFormContext();

  return (
    <input
      className='mb-1 h-10 rounded border border-zinc-600 bg-zinc-800 px-3 text-[15px] text-white shadow-sm '
      {...register(name)}
      {...rest}
    />
  );
}
