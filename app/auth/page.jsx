"use client"

import axios from 'axios';
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '../components/Input';


const Auth = () => {
  // State variables for email, name, password, and variant (login/register)
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
          redirect: false,// Prevent automatic redirection after sign-in
          callbackUrl: '/'// Redirect URL after successful sign-in
        });
  
        router.push('/profiles');
      } catch (error) {
        console.log(error);
      }
    }, [email, password, router]);

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
        <div className="flex flex-row items-center justify-center gap-4 mt-8">
              <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80">
                <FcGoogle size={32} />
              </div>
              <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80">
                <FaGithub size={32} />
              </div>
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
