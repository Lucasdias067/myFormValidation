'use client';
import { CreateUserFormData } from '@/components/RegisterForm';
import { createContext, useContext, useState } from 'react';

interface IAuthContext {
  output: CreateUserFormData[];
  setOutput: React.Dispatch<React.SetStateAction<CreateUserFormData[]>>;
}
type IChildren = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IChildren) => {
  const [output, setOutput] = useState<CreateUserFormData[]>([]);

  return (
    <AuthContext.Provider value={{ output, setOutput }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { output, setOutput } = useContext(AuthContext);

  return { output, setOutput };
};
