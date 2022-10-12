import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { toast } from "react-toastify";

export default function Post() {
  // Providing <form> state:
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  // Event callback handlers:
  const submitPost = async (e) => {
    // preventing <form> default browser behavior
    e.preventDefault();
    // Before submitting a post run the following condition for description:
    if (!post.description) {
      toast.error("Description field is empty 😅!", {
        position: "top-center",
        autoClose: 1500,
      });
      return; // exist logic
    }
    if (post.description.length > 300) {
      toast.error("Description field is too long 🧐!", {
        position: "top-center",
        autoClose: 1500,
      });
      return; // exist logic
    }

    // Makes a new post to `Firestore`, gets a CollectionReference instance that
    // refers to the collection at the specified absolute path.
    // @param `firestore` — A reference to the root `Firestore` instance.
    // @param `path` — A slash-separated path to a collection.
    const collectionRef = collection(db, "posts");
    await addDoc(collectionRef, {
      ...post, // spread current state (we don't mutate)!
      timestamp: serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName,
    });
    setPost({ description: "" }); // clear out after submission
    return route.push("/");
  };
  // Remember to not mutate state directly, instead we `...` spread existing
  // and then apply changes, otherwise you change the state completely.
  // Example: const changePost = (e) => setPost(e.target.value); // ❌
  // Well produce and error here: <p>{post.description.length}/300</p>
  const changePost = async (e) => {
    setPost({ ...post, description: e.target.value });
  };

  const { length } = post.description;
  const numExp = `text-cyan-600 text-sm ${length > 300 ? "text-red-600" : ""}`;
  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">Create a new post</h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={changePost}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          ></textarea>
          <p className={numExp}>{length}/300</p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
