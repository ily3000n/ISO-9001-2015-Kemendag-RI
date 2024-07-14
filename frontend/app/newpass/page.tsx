// pages/NewPasswordPage.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";

const NewPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get token from query params
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing token');
    }
  }, [token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      setError('Invalid or missing token');
      return;
    }
    try {
      const payload = {
        token: token,
        new_password: password,
      };

      console.log('Token:', token);
      console.log('Payload:', payload);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      router.push('/login');
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
            <Image src="/logo.svg" alt="Logo" width={300} height={300} />
          </div>
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Set New Password
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your new password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                Set New Password
              </button>
            </div>
          </form>
        </div>

        {/* Bagian Kanan */}
        <div className="w-1/2 h-screen bg-blue-950 flex items-center justify-center rounded-lg">
          <Image src="/newpass.png" alt="Image" width={300} height={300} />
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
