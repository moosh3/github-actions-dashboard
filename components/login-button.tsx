'use client';

import { useAuth } from '../app/auth/providers';

export default function LoginButton() {
  const { login } = useAuth();

  return (
    <button
      onClick={login}
      className="px-4 py-2 bg-black text-white rounded-md"
    >
      Sign in with GitHub
    </button>
  );
}