// pages/LoginPage.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { HiEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const { token } = await res.json();
      sessionStorage.setItem('token', token);
      router.push('/cms');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='bg-slate-200 p-6'>
      <div className="flex items-center justify-center h-screen bg-white rounded-lg">
        {/* Bagian Kiri */}
        <div className="w-1/2 p-10">
          <div className="flex items-center justify-center mb-8">
          <a href="/">
            <Image src="/logo.svg" alt="Logo" width={300} height={300} />
            </a>
          </div>
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Login
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  error ? 'border-red-500' : ''
                }`}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    error ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <HiEyeSlash className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  ) : (
                    <IoEyeSharp className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-[300px] bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-sm"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Bagian Kanan */}
        <div className="w-1/2 h-screen bg-blue-950 flex flex-col items-center justify-center rounded-lg">
          <Image src="/iso9001-2015.png" alt="Image" width={200} height={200} className='mt-10' />
          <Image src="/login-image.png" alt="Image" width={300} height={300} />
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
