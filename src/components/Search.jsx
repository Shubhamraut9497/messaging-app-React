import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDoc,getDocs,doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../context/AutContext";

function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const currentUser=useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUser({ ...doc.data(), id: doc.id });
        setUserName("");
      });
    }
    catch(err){
      setErr(true);
      console.log(err);
    }
   
  };


  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  
  const handleSelect=async()=>{
    //check if the group (chats in firestore) exist and if not create new one group
    // create userChats
    const combinedId=currentUser.uid>user.uid?currentUser.uid+user.uid:user.uid+currentUser.uid;
    try{
      const res=await getDoc(doc(db,"chats",combinedId));
      if(!res.exists()){
        //create a chat in chat collection
        await setDoc(doc(db, "userChats", combinedId),{message:[]});
        // create user chats
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL,
          },
          [combinedId+".date"]:serverTimestamp()
        })
      }
    }
    catch(err){

    }
    
  }

  return (
    <div className="Search">
      <div className="SearchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {err && (<span style={{color:"red",marginLeft:"10px"}}>User not found</span>)}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user?.photoURL} alt="img" />
          <div className="userChatInfo">
            <span>{user?.displayName}</span>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Search;
