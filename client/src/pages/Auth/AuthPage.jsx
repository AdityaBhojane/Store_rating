import  { useState } from 'react';
import { SignUp } from '../../components/Signup';
import { SignIn } from '../../components/Signin';

export default function AuthPage() {
    const [isSigningUp, setIsSigningUp] = useState(false);

    const showSignUp = () => setIsSigningUp(true);
    const showSignIn = () => setIsSigningUp(false);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="w-full max-w-md">
                {isSigningUp ? (
                    <SignUp onSignInClick={showSignIn} />
                ) : (
                    <SignIn onSignUpClick={showSignUp} />
                )}
            </div>
        </div>
    );
}
