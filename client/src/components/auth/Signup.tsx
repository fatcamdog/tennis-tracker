import React, { useState } from 'react';

import { useSignup } from '../../hooks/authHooks';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signupUser, isLoading, error } = useSignup();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await signupUser(name, email, password);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-2xl mb-2">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Name..."
          value={name}
          className="w-full max-w-xs input input-bordered bg-neutral mb-3"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <input
          type="email"
          placeholder="Email..."
          value={email}
          className="w-full max-w-xs input input-bordered bg-neutral mb-3"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          className="w-full max-w-xs input input-bordered bg-neutral mb-3"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button
          type="submit"
          className={`btn btn-accent btn-sm ${isLoading ? 'loading' : ''}`}
        >
          Sign Up
        </button>
        {error && (
          <div className="rounded-lg shadow-lg alert outline outline-3 outline-error bg-error/25 my-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
      </form>
      <div className="flex">
        <p className="mr-2">Already have an account?</p>
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </div>
    </div>
  );
}
