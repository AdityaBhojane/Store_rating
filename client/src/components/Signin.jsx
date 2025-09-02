import { useState } from "react";
import { Lock } from 'lucide-react';

export const SignIn = ({ onSignUpClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign-in logic here
        console.log('Signing in with:', { email, password });
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
            <div className="text-center">
                <div className="flex justify-center mb-4">
                   <div className="bg-indigo-100 p-3 rounded-full">
                     <Lock />
                   </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Sign in to continue to your account.
                </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="email-signin"
                        className="text-sm font-medium text-gray-700 sr-only"
                    >
                        Email address
                    </label>
                    <input
                        id="email-signin"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="password-signin"
                        className="text-sm font-medium text-gray-700 sr-only"
                    >
                        Password
                    </label>
                    <input
                        id="password-signin"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                        Sign in
                    </button>
                </div>
            </form>
            <p className="text-sm text-center text-gray-600">
                Don't have an account?{' '}
                <button
                    onClick={onSignUpClick}
                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
                >
                    Sign up
                </button>
            </p>
        </div>
    );
};