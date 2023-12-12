import Header from '@/components/Header/Header';
import RegisterForm from '@/components/RegisterForm';
import { AuthProvider } from '@/context/OutputContext';

export default function Home() {
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <main className='flex  flex-col justify-center gap-10 bg-zinc-50 p-[5%] text-zinc-300 dark:bg-zinc-900'>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </main>
    </>
  );
}
