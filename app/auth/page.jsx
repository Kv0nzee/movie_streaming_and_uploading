"use client"

import axios from 'axios';
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '../components/Input';


const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');
  const router = useRouter();
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
  }, []);

  const login = useCallback(async () => {
    try {
        await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/'
        });
  
        router.push('/profiles');
      } catch (error) {
        console.log(error);
      }
    }, [email, password]);

    const register = useCallback(async () => {
        try {
          await axios.post('/api/register', {
            email,
            name,
            password
          });
    
          login();
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);
    

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800">
          {variant === 'login' ? 'Sign in' : 'Create an account'}
        </h2>
        <div className='flex flex-col gap-y-2'>    
            {variant === 'register' && (
            <Input
                id="name"
                type="text"
                label="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            )}
            <Input
            id="email"
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input
            type="password"
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button
          onClick={variant === 'login' ? login : register}
          className="w-full py-3 mt-6 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {variant === 'login' ? 'Sign in' : 'Sign up'}
        </button>
        <div className="flex justify-center mt-6">
          <button className="flex items-center justify-center w-10 h-10 mr-4 text-gray-700 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none">
            <FcGoogle size={24} />
          </button>
          <button className="flex items-center justify-center w-10 h-10 text-gray-700 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none">
            <FaGithub size={24} />
          </button>
        </div>
        <p className="mt-8 text-sm text-center text-gray-600">
          {variant === 'login' ? 'New to our platform?' : 'Already have an account?'}
          <span
            onClick={toggleVariant}
            className="ml-1 text-blue-500 cursor-pointer hover:underline"
          >
            {variant === 'login' ? 'Create an account' : 'Sign in'}
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default Auth;
