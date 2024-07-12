'use client';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginFormDemo = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black my-9">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to admin
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to ISO ITJEN KEMENDAG RI
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <Link href="/reset">
              <span className="text-sm text-neutral-600 dark:text-neutral-300 hover:underline">
                Forgot password?
              </span>
            </Link>

            <button
              className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Login &rarr;
              <BottomGradient />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default LoginFormDemo;

// // /components/LoginFormDemo.tsx
// 'use client'
// import React from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/utils/cn";
// import Link from "next/link";

// const LoginFormDemo = () => {
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form submitted");
//   };

//   return (
//     <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black my-9">
//       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//         Welcome to admin
//       </h2>
//       <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
//         Login to Aceternity
//       </p>

//       <form className="my-8" onSubmit={handleSubmit}>
//         <div className="flex flex-col space-y-4">
//           <Label htmlFor="username">Username</Label>
//           <Input id="username" placeholder="Enter your username" type="text" />
//           <Label htmlFor="password">Password</Label>
//           <Input id="password" placeholder="••••••••" type="password" />

//           <div className="flex items-center justify-between">
//             <Link href="/reset">
//               <span className="text-sm text-neutral-600 dark:text-neutral-300 hover:underline">
//                 Forgot password?
//               </span>
//             </Link>

//             <button
//               className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//               type="submit"
//             >
//               Login &rarr;
//               <BottomGradient />
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// export default LoginFormDemo;
