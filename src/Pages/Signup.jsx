import React, { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'
import Loading from '../components/Loading';

function Signup() {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if (!file || !displayName || !email || !password) {
      setErr("please fill all fields.");
      return;
    }
    else{
    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            setLoading(false);
            setErr("Something went wrong while uploading the avatar.");
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              navigate("/");
              setLoading(false);
              toast.success('Successfully signed up!');
              resolve();
            } catch (error) {
              setLoading(false);
              setErr("Something went wrong while updating the user profile.");
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      setLoading(false);
      setErr("Something went wrong while creating the user.");
    }
  };
}

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">TKF Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="file" style={{ display: "none" }} id="file" />
          <label htmlFor="file">
            <FcAddImage className="icon-avatar" />{" "}
            <span className="t">Add an avatar</span>
          </label>
          <button className="btn" disabled={loading}>
            {loading ? <span className="loading"><Loading/></span>: "Signup"}
          </button>
          {err && <span className="error" style={{color:'red'}}>{err}</span>}
        </form>
        <p>You do have an account ? <Link to ="/login">Login</Link></p>
      </div>
      {loading?<Toaster position="top-right" reverseOrder={false} />:<></>}
    </div>
  );
}

export default Signup;
