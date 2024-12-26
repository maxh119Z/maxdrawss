import { useEffect, useRef } from 'react';
import './App.css';
import { auth, db } from './firebase/firebase.jsx';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import Header from './header.jsx';
import People from './People.jsx';
import Ipad from './Ipad.jsx';
import Other from './other.jsx';
import About from './About.jsx';
import { preloadImages } from './utils';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function App() {
  const containerRef = useRef(null);
  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(
      navigator.userAgent
    );
  };

  const addViewCount = async () => {
    try {
      const viewDocRef = doc(db, 'viewcount', 'viewcount');
      const viewDoc = await getDoc(viewDocRef);
      if (viewDoc.exists()) {
        await updateDoc(viewDocRef, { Views: increment(1) });
        console.log('View count incremented!');
      } else {
        console.log('Document does not exist. Creating a new one...');
        await setDoc(viewDocRef, { Views: 1331 });
        console.log('Document created and initialized.');
      }
    } catch (error) {
      console.error('Error updating view count:', error.message);
    }
  };

  useEffect(() => {
    addViewCount();
    

    const isInIframe = () => {
      return window.self !== window.top;
    };

    if (isMobile() || isInIframe()) {
      console.log(
        "MOBILE DEVICE OR U JUST NOT FULLSCREEN");
      const siteHeaderContent = document.getElementById('siteheader-content');
      const dropDiv = document.getElementById('dropdiv');
      const title = document.getElementById('TITLE');
      const logoImg = document.getElementById('logoimg');
      const titledescription = document.getElementById('titledescription');
      const text1 = document.getElementById('text1');

      if (siteHeaderContent) siteHeaderContent.style.display = 'none';
      if (dropDiv) dropDiv.style.display = 'inline-block';

      if (title) {
        title.style.fontSize = '1.5rem';
        title.style.fontWeight = 'bold';
      }

      if (logoImg) {
        logoImg.style.height = '100%';
        logoImg.style.width = 'auto';
      }

      const infoElements = document.querySelectorAll('.info');
      infoElements.forEach(element => {
        element.style.fontSize = '0.7rem';
      });

      const info2Elements = document.querySelectorAll('.info2');
      info2Elements.forEach(element => {
        element.style.fontSize = '0.7rem';
      });

      const bottomRightTextElements = document.querySelectorAll('.bottom-right-text');
      bottomRightTextElements.forEach(element => {
        element.style.fontSize = '0.85rem';
      });

      if (titledescription) {
        titledescription.style.fontSize = '1rem';
      }

      if (text1 && window.matchMedia('(orientation: portrait)').matches) {
        text1.innerHTML =
          'This website shows drawings I drew for fun. I like drawing, and am mostly self-taught. I hope you enjoy! :P';
      }
    }
    
  }, []);

  return (
    <Router basename="/maxdrawss/">
      <Header />
      <div ref={containerRef}>
        <AnimatedRoutes />
      </div>
      <footer>
        <p>
          Make your own website
          <br />
          <a href="https://youtu.be/chOvyuyZe9M">https://youtu.be/chOvyuyZe9M</a>
        </p>
        <p>
          Do not email me
          <br />
          <a href="mailto:maxhzhang119@gmail.com">maxhzhang119@gmail.com</a>
        </p>
      </footer>
    </Router>
  );
}

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/People" element={<People />} />
      <Route path="/Ipad" element={<Ipad />} />
      <Route path="/Other" element={<Other />} />
      <Route path="/About" element={<About />} />
    </Routes>
  );
}

function Home() {
  useEffect(() => {
    const imagesToPreload = [
      "/maxdrawss/images/connectlogo.png",
      "/maxdrawss/images/Croppedbackground1.png",
      "/maxdrawss/images/maxpicture.jpg",
      "/maxdrawss/images/santa.png",
      "/maxdrawss/images/christmas.png",
      "/maxdrawss/images/person1.jpg",
      "/maxdrawss/images/open.png",
      "/maxdrawss/images/close.png",
      "/maxdrawss/images/back2.gif",
      "/maxdrawss/images/person10.jpg",
      "/maxdrawss/images/ipad1.jpg"
    ];

    preloadImages(imagesToPreload)
      .then(() => console.log("Images for Home preloaded!"))
      .catch((error) => console.error("Error preloading images for Home:", error));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <div id="body" className="shake-container">
        <div id = "container"></div>
        <div id="TITLE">
          <h1>Max's Drawings</h1>
        </div>
        <div className="line-1"></div>
        <div id="titledescription">
          <h2>Website made in 2024 Summer</h2>
        </div>
        <div id="overview">
          <Link to="/People">
            <div className="image-container">
              <img src="/maxdrawss/images/person10.jpg" alt="Overview Image" id="overviewpicture" />
              <div className="bottom-right-text">Recent</div>
            </div>
          </Link>
          <div id="overview-text">
                {isMobile ? (
              <p id="text1">
                On Max's Drawings, you will see drawings I do over time. I like drawing sometimes, so I made this
                website. Below this description, you can see portraits or ppl I draw, other stuff, and things I drew on
                my brother's Ipad during break. I hope you enjoy! I also put some drawings from a few years ago I found
                in my closet. I originally created this website for a non-profit idea but screw that becuz it seems like
                too much work that I didn't want to do.
              </p>
            ) : (
              <p id = "text1">This website shows drawings I drew for fun. I like drawing, and am mostly self-taught. I hope you enjoy! :P</p>
            )}
          </div>
        </div>
        <div className="line-1"></div>
        <div className="person" id="bar">
          <Link to="/People">
            <div className="image-container">
              <img src="/maxdrawss/images/person1.jpg" alt="personlookingsideways" className="indexpics" />
              <div className="bottom-right-text">People</div>
            </div>
          </Link>
          <Link to="/Ipad">
            <div className="image-container">
              <img src="/maxdrawss/images/ipad1.jpg" alt="boyheronwallpaperIdrew" className="indexpics" />
              <div className="bottom-right-text">Ipad Draws</div>
            </div>
          </Link>
          <Link to="/Other">
            <div className="image-container">
              <img src="/maxdrawss/images/other1.jpg" alt="abstractpicture" className="indexpics" />
              <div className="bottom-right-text">Other Stuff</div>
            </div>
          </Link>
          <Link to="/About">
            <div className="image-container">
              <img src="/maxdrawss/images/maxpicture.jpg" alt="maxpicture" className="indexpics" />
              <div className="bottom-right-text">About me ig</div>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
