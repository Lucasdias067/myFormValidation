import { LabelHTMLAttributes } from 'react';

export function FormLabel(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className='flex items-center justify-between' {...props} />;
}
