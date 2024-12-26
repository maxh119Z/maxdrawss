// src/Header.jsx
import React, { useState, useEffect } from 'react';

import './App.css'; // Optional for styling
import { auth , db} from './firebase/firebase.jsx'
import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where, getDoc, onSnapshot , updateDoc, increment} from "firebase/firestore";
import { Routes, Route, Link} from 'react-router-dom';

function header() {
  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(
      navigator.userAgent
    );
  };
    const [name, setName] = useState("");
    useEffect(() => {
            onAuthStateChanged(auth, (currentUser) => {
            if (currentUser){
                if (currentUser.displayName){
                setName(currentUser.displayName);
                }
                else{
                setName(currentUser.email);
                }
            }
            else setName("");
            });
            
    }, []);
      const myFunction = () =>{
          document.getElementById("myDropdown").classList.toggle("show");
          if (document.getElementById("myDropdown").classList.contains("show")){
            document.getElementById("dropimg").src = "images/close.png";
          }
          else{
            document.getElementById("dropimg").src = "images/open.png";
          }
        
      }
      const signOutOfAccount = async () => {
        signOut(auth).then(() => {
          setName("");
          console.log("Signed out successfully");
        }).catch((error) => {
          // An error happened.
        });
      };
      document.body.addEventListener('click', function () {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          for (let openDropdown of dropdowns) {
            if (openDropdown.classList.contains('show')) {
              document.getElementById("dropimg").src = "images/open.png";
              openDropdown.classList.remove('show');
            }
          }
        }
      });
      const addViewCount = async () => {
        try {
          const viewDocRef = doc(db, "viewcount", "viewcount"); 
          const viewDoc = await getDoc(viewDocRef);
          if (viewDoc.exists()) {
            await updateDoc(viewDocRef, {
              Views: increment(1),
            });
            console.log("View count incremented!");
          } else {
            console.log("Document does not exist. Creating a new one...");
            await setDoc(viewDocRef, { Views: 1331 }); //my old website on replit
            console.log("Document created and initialized.");
          }
        } catch (error) {
          console.error("Error updating view count:", error.message);
        }
      };
    
      const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
    
          // The signed-in user info.
          const user = result.user;
          setName(user.displayName);
          console.log(user.displayName);
    
          const usersRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(usersRef);
    
          if (!userSnap.exists()) {
            console.log("No such document!");
            //we now want to add a new entry to our database...
            await setDoc(usersRef, {
              email: user.email,
              name: user.displayName,
              uid : user.uid
            })
            
            console.log("Added new entry for user " + user.displayName);
          } else {
            console.log("Document already exists: ", userSnap.data());
          }
        } catch (error) {
          console.error("Error during sign-in:", error.message);
        }
    
      };
    return (
      
      <div className="site-header">
        <Link to="/">
            <img id="logoimg" src="/maxdrawss/images/connectlogo.png" alt="Logo" />
        </Link>
        
        {isMobile ? (
  <div id="dropdiv" className="dropdown">
    <div id="A">
      <button onClick={myFunction} className="dropbtn">
        <img id="dropimg" className="dropbtn" src="images/open.png" alt="Dropdown" />
      </button>
    </div>
    <div id="myDropdown" className="dropdown-content">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/People">People</Link></li>
          <li><Link to="/Ipad">Ipad</Link></li>
          <li><Link to="/Other">Other</Link></li>
          <li><Link to="/About">About</Link></li>
          {name ? (
            <li><button className="dropbtn2" onClick={signOutOfAccount}>SIGNOUT</button></li>
          ) : (
            <li><button className="dropbtn2" onClick={googleSignIn}>LOGIN</button></li>
          )}
        </ul>
      </nav>
    </div>
  </div>
) : (
  <div className="header-content">
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/People">People</Link></li>
        <li><Link to="/Ipad">Ipad</Link></li>
        <li><Link to="/Other">Other</Link></li>
        <li><Link to="/About">About</Link></li>
        {name ? (
          <li><button className="dropbtn2" onClick={signOutOfAccount}>SIGNOUT</button></li>
        ) : (
          <li><button className="dropbtn2" onClick={googleSignIn}>LOGIN</button></li>
        )}
      </ul>
    </nav>
  </div>
)}

      </div>
    );
  }
export default header;
