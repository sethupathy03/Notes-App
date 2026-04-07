import { signInWithPopup } from "firebase/auth";
import search from "./assets/search.png"
import user from "./assets/user.png"
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, provider, db } from "./firebase";


function Login() {
  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      provider: "google",
      createdAt: serverTimestamp(),
    }, { merge: true });

    console.log("User saved to Firestore");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
    <div className="flex justify-center items-center mt-16">
      
        <div className="flex flex-col gap-7 bg-white-400 w-[410px] h-118 rounded-xl shadow-lg p-4">
          <img src={user} className="w-12 mx-auto" />
          <h1 className="text-2xl text-center font-semibold">Login</h1>
          
        <input type="email" placeholder="Email" className="p-4 bg-slate-200 h-12 text-slate-700 rounded-full border-none outline-none" />
        <input type="password" placeholder="Password" className="p-4 bg-slate-200  h-12 text-slate-700 rounded-full border-none outline-none" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">Login</button>
        <hr></hr>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-700">
          <img src={search} className="w-4 mt-1 float-right"/> Sign in with Google
        </button>
      </div>
      
    </div>
    </>
  );
}

export default Login;