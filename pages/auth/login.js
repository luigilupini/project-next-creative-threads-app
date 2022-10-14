import { useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";

// React Firebase Hooks - Auth: A set of reusable React Hooks for Firebase.
// https://www.npmjs.com/package/react-firebase-hooks
// Once `provider(s)` setup, use this library to explore how React Hooks can
// make integration with Firebase more straightforward.

// The hook provides a convenience listener for Firebase Auth's object `auth`
// state/instance of Auth. It wraps around auth.onAuthStateChange(...) method,
// to ensure that it is always up to date.
import { useAuthState } from "react-firebase-hooks/auth";

// Retrieve and monitor the authentication state from Firebase.
// The `useAuthState` hook takes the following parameters:
// - auth: auth.Auth instance for the app you would like to monitor
// - options: (optional)
// **Returns:**
// - user: The auth.User if logged in, or null if not
// - loading: A boolean to indicate if the auth state is still being loaded
// - error: Any AuthError returned by Firebase when trying to load the user

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  // We use provider(s) with our `auth` instance to redirect for authentication.
  // First we create an instance of the Google provider object:
  // https://cloud.google.com/identity-platform/docs/web/google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    // Additionally, use the React Firebase (Auth) Hook for assistance.
    // We import the `auth` instance defined in our utils/firebase.js setup.
    // Use `react-firebase-hooks` library to assist with pulling user data.
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      // Maybe apply react toast here to mention redirection.
      route.push("/");
    } else {
      console.log("login needed.");
    }
  }, [user]);

  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium">Welcome</h2>
      <div>
        <h3 className="py-3 mb-2">Log in with your account</h3>
        <button
          onClick={googleLogin}
          className="text-slate-700 bg-gray-200 w-full font-medium rounded-lg flex items-center p-4 gap-3"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
