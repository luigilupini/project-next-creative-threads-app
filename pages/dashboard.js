import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  // Get users data when component (mounts) and when dependency changes:
  useEffect(() => {
    // See if user is logged in:
    const getData = async () => {
      if (loading) return;
      if (!user) return route.push("/auth/login");
    };
    getData();
  }, [user, loading]);

  return (
    <div>
      <h1>Your posts</h1>
      <div>posts</div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
}
