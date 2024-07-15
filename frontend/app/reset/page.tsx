// pages/ResetPasswordPage.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';


const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/request-password-reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      router.push('/newpass');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='bg-slate-200 p-6'>
      <div className="flex items-center justify-center h-screen bg-white rounded-lg ">
        {/* Bagian Kiri */}
        <div className="w-1/2 p-10">
          <div className="flex items-center justify-center mb-8">
            <Image src="/logo.svg" alt="Logo" width={300} height={300} />
          </div>
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Reset Password Anda
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-[300px] bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-sm"
              >
                Reset Password &rarr;
              </button>
            </div>
          </form>
        </div>

        {/* Bagian Kanan */}
        <div className="w-1/2 h-screen bg-blue-950 flex items-center justify-center rounded-lg">
          <Image src="/resetpass.png" alt="Image" width={300} height={300} />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
