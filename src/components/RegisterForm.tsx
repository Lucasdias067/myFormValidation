'use client';
import { Form } from './Form';
import { useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/OutputContext';

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatário')
    .transform((name) =>
      name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(' ')
    ),
  email: z.string().nonempty('O email é obrigatório').email('email inválido!'),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty('O titúlo é obrigatório'),
        knowledge: z.string().nonempty('Obrigatório')
      })
    )
    .min(2, 'Insira pelo menos duas tecnologias')
});

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function RegisterForm() {
  const { output, setOutput } = useAuth();

  const createUserForm = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = createUserForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs'
  });

  const techKnowledgeLevel = [
    'Iniciante',
    'Básico',
    'Intermediário',
    'Avançado'
  ];

  function createUsers(data: CreateUserFormData) {
    setOutput((prevState) => [...prevState, data]);
    reset();
    remove(fields.length - 2);
  }

  function addNewTech() {
    append({ title: '', knowledge: '' });
  }

  useEffect(() => {
    if (output && output.length) {
      localStorage.setItem('userForm', JSON.stringify(output));
    }
  }, [output]);

  useEffect(() => {
    const userForm = localStorage.getItem('userForm');
    console.log(userForm);

    if (userForm) {
      const parsedUserForm = JSON.parse(userForm);
      setOutput(parsedUserForm);
    }
  }, [setOutput]);

  return (
    <section className='grid min-h-screen grid-cols-[400px,1fr] gap-4'>
      <FormProvider {...createUserForm}>
        <div>
          <form
            className='fixed top-[10%] flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-zinc-400 bg-zinc-200 p-6 dark:border-zinc-600 dark:bg-zinc-900 '
            onSubmit={handleSubmit(createUsers)}
          >
            <Form.Field>
              <Form.Label htmlFor='name'>Nome</Form.Label>
              <Form.Input
                type='text'
                name='name'
                placeholder='Digite seu nome'
              />
              <Form.Error name='name' />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Input
                type='email'
                name='email'
                placeholder='Digite seu email'
              />
              <Form.Error name='email' />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor='password'>Senha</Form.Label>
              <Form.Input
                type='password'
                name='password'
                autoComplete='true'
                placeholder='Digite sua senha'
              />
              <Form.Error name='password' />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor=''>
                Tecnologias
                <button
                  onClick={addNewTech}
                  type='button'
                  className='rounded-md bg-emerald-500 px-2 py-1 text-[0.8em] font-medium text-white transition-colors  hover:bg-emerald-600 dark:bg-zinc-900 dark:text-emerald-500'
                >
                  Adicionar
                </button>
              </Form.Label>
              {fields.map((field, index) => {
                const techTitle = `techs.${index}.title`;
                return (
                  <Form.Field
                    key={field.id}
                    className='flex items-baseline gap-2'
                  >
                    <Form.Field className='flex-1 flex-col'>
                      <Form.Input
                        type='text'
                        name={techTitle}
                        placeholder='Tecnologia'
                      />
                      <Form.Error name={techTitle} />
                    </Form.Field>
                    <Form.Field className='flex flex-col items-center'>
                      <select
                        {...register(`techs.${index}.knowledge`)}
                        className='h-10 w-16 rounded border border-zinc-600 bg-white px-3 text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white'
                      >
                        <option disabled></option>
                        {techKnowledgeLevel.map((tech) => (
                          <option key={tech}>{tech}</option>
                        ))}
                      </select>
                      <Form.Error name={`techs.${index}.knowledge`} />
                    </Form.Field>
                  </Form.Field>
                );
              })}
              <Form.Error name='techs' />
            </Form.Field>
            <button
              type='submit'
              className='h-10 rounded bg-emerald-500 font-semibold text-white transition-colors  hover:bg-emerald-600'
              disabled={Object.keys(errors).length > 0}
            >
              Salvar
            </button>
          </form>
        </div>
        <Form.Output />
      </FormProvider>
    </section>
  );
}
