import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Message from "../components/Message";
import { BsTrash2Fill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  // Get users data when component mounts and when dependency changes:
  useEffect(() => {
    // See if user is logged in:
    const getData = async () => {
      if (loading) return;
      if (!user) return route.push("/auth/login");
      // TODO: Read (CRUD) operation:
      // Get realtime updates with Cloud Firestore:
      // You can listen to a document with the `onSnapshot` method.
      // An initial call using the second argument being a callback you provide,
      // creates a document `snapshot` immediately with the current contents of
      // the single document. Then, each time the contents change, another call
      // updates the document snapshot. For more info, see below link:
      // ? https://firebase.google.com/docs/firestore/query-data/listen
      const collectionRef = collection(db, "posts");
      const q = query(collectionRef, where("user", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log(data);
        setPosts(data);
      });
      return unsubscribe;
    };
    getData();
  }, [user, loading]);

  // TODO: Delete (CRUD) operation:
  // Delete handler gets an individual `doc` an `DocumentReference` instance.
  // That refers to the document at specified absolute path.
  // @param firestore — A reference to the root Firestore `db` instance.
  // @param path — A slash-separated path to a document like `posts` collection.
  // Additional path segments must be applied relative to the first argument.
  const deletePost = async (id) => {
    try {
      route.push("/");
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4">
      <h2 className="py-2  mb-8">Below is your current post activity</h2>
      <div>
        {posts.map((post) => (
          <Message key={post.id} {...post}>
            <div className="flex gap-5 items-center">
              <button
                onClick={() => deletePost(post.id)}
                className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm"
              >
                <BsTrash2Fill className="text-2xl" />
                Delete
              </button>
              {/*
                Our <Link /> `href` prop with a configuration object. We can
                navigate to the next route being our '/post' and we update its
                `query` property with our individual post we iterating over.
                Now our pages/post component's `route` state, has these values.
              */}
              <Link href={{ pathname: "/post", query: post }}>
                <button className="text-[#00BA7C] flex items-center justify-center gap-2 py-2 text-sm">
                  <FiEdit className="text-2xl" />
                  Edit
                </button>
              </Link>
            </div>
          </Message>
        ))}
      </div>
      <button
        className="font-medium bg-gray-200 text-slate-700 py-2 px-4 my-6 rounded-lg"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
