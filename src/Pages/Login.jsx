import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";
import { doc, setDoc } from "firebase/firestore";
import { db} from "../firebase";

function Login() {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      
      // Add the user's UID to the 'userChats' collection
      await setDoc(doc(db, "userChats", user.uid),{/*we can add data here*/});
      navigate("/");
    } catch (error) {
      setLoading(false);
      setErr("Something went wrong while creating the user.");
    }
  };
  return (
    
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="formContainer">
            <div className="formWrapper">
              <span className="logo">TKF Chat</span>
              <span className="title">Login</span>
              <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <button className="btn">Login</button>
              </form>
              {err && (
                <span className="error" style={{ color: "red" }}>
                  {err}
                </span>
              )}
              <p>
                You do not  have an account ? <Link to="/signup">Regiter</Link>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
  
}

export default Login;
