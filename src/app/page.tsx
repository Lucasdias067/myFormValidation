import RegisterForm from '@/components/RegisterForm';

export default function Home() {
  return (
    <main className='flex h-full flex-col justify-center gap-10 bg-zinc-900 p-[5%] text-zinc-300'>
      <RegisterForm />
    </main>
  );
}
