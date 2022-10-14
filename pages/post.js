import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-toastify";
const toastObj = { position: "top-center", autoClose: 1500 };

export default function Post() {
  // Providing <form> state:
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  // console.log(route);
  const routeData = route.query; // We use this in our route `checkUser` handler.

  // Event callback handlers:
  const submitPost = async (e) => {
    // preventing <form> default browser behavior
    e.preventDefault();
    // Before submitting a post run the following condition for description:
    if (!post.description) {
      toast.error("Description field is empty 😅", toastObj);
      return; // exist logic
    }
    if (post.description.length > 300) {
      toast.error("Description field is too long 🧐", toastObj);
      return; // exist logic
    }

    // TODO: Update (CRUD) operation:
    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatePost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatePost);
      toast.success("Post has been updated 👍🏻", toastObj);
      return route.push("/");
    } else {
      // TODO: Create (CRUD) operation:
      // Makes a new post to `Firestore`, gets a CollectionReference instance that
      // refers to the collection at the specified absolute path.
      // @param `firestore` — A reference to the root `Firestore` instance.
      // @param `path` — A slash-separated path to a collection.
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post, // spread current state (we don't mutate)!
        comments: [],
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" }); // clear out after submission
      toast.success("Post has been created 🚀", toastObj);
      return route.push("/");
    }
  };

  // Remember to not mutate state directly, instead we spread existing
  // and then apply changes, otherwise you change the state completely.
  // Example: const changePost = (e) => setPost(e.target.value); ❌
  // Otherwise JSX: <p>{post.description.length}/300</p> will produce error.
  const changePost = async (e) => {
    setPost({ ...post, description: e.target.value });
  };

  useEffect(() => {
    // Check our user and route state.
    const checkUser = async () => {
      if (loading) return;
      if (!user) route.push("/auth/login");
      const { id, description } = routeData;
      if (routeData.id) setPost({ id: id, description: description });
    };
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-xl rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="h-48 w-full text-slate-700 bg-slate-100  rounded-lg p-2 text-sm"
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? "text-red-600 font-bold" : ""
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-200 text-slate-700  font-medium p-2 my-2 rounded-lg text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
