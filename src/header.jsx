import React, { useState, useEffect } from 'react';

import './App.css'; // Optional for styling
import { auth, db } from './firebase/firebase.jsx';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { Routes, Route, Link } from 'react-router-dom';

function Header() {
  const [name, setName] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect device type
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent));
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Handle authentication state changes
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.displayName) {
          setName(currentUser.displayName);
        } else {
          setName(currentUser.email);
        }
      } else {
        setName("");
      }
    });
  }, []);

  const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
    if (document.getElementById("myDropdown").classList.contains("show")) {
      document.getElementById("dropimg").src = "images/close.png";
    } else {
      document.getElementById("dropimg").src = "images/open.png";
    }
  };

  const signOutOfAccount = async () => {
    signOut(auth)
      .then(() => {
        setName("");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setName(user.displayName);

      const usersRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(usersRef);

      if (!userSnap.exists()) {
        await setDoc(usersRef, {
          email: user.email,
          name: user.displayName,
          uid: user.uid,
        });
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <div className="site-header">
      <Link to="/">
        <img id="logoimg" src="./images/connectlogo.png" alt="Logo" />
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

export default Header;
