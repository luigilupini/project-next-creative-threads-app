import Link from "next/link";
import { BsPerson } from "react-icons/bs";

// Anytime we want to interact with the authenticated user state from firebase,
// We can use that helpful hook as seen in our pages/auth/login.js file.
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-10">
      <Link href={"/"}>
        <button className="text-lg font-medium">
          <strong>Logo</strong> | threads
        </button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <a className="py-2 px-4 text-sm bg-gray-200 text-slate-700 font-medium ml-8 rounded-lg">
              Join Now
            </a>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href={"/post"}>
              <button className="font-medium bg-gray-200 text-slate-700 py-2 px-4 rounded text-sm">
                Post
              </button>
            </Link>
            <Link href={"/dashboard"}>
              <BsPerson className="text-3xl text-gray-600 cursor-pointer hover:text-slate-900" />
              {/* <img
                src={user.photoURL}
                alt="avatar"
                referrerPolicy="no-referrer"
                className="w-12 rounded-full cursor-pointer"
              /> */}
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
