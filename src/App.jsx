import { useEffect, useRef, useState } from 'react';
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
  const [isPreloaded, setIsPreloaded] = useState(false);

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
    const body = document.body;
    body.style.opacity = "0";
    addViewCount();
    const isMobile = () => {
      return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(
        navigator.userAgent
      );
    };
    

    if (isMobile()) {
      console.log('MOBILE DEVICE OR U JUST NOT FULLSCREEN');
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
      infoElements.forEach((element) => {
        element.style.fontSize = '0.7rem';
      });

      const info2Elements = document.querySelectorAll('.info2');
      info2Elements.forEach((element) => {
        element.style.fontSize = '0.7rem';
      });

      const bottomRightTextElements = document.querySelectorAll('.bottom-right-text');
      bottomRightTextElements.forEach((element) => {
        element.style.fontSize = '0.85rem';
      });

      if (titledescription) {
        titledescription.style.fontSize = '1rem';
      }

      if (text1 && window.matchMedia('(orientation: portrait)').matches) {
        console.log('Changed');
        text1.innerHTML =
          'This website shows drawings I drew for fun. I like drawing, and am mostly self-taught. I hope you enjoy! :P';
      }
    }

    // Preload images
    const imagesToPreload = [
      '/images/connectlogo.png',
      '/images/Croppedbackground1.png',
      '/images/maxpicture.jpg',
      '/images/person1.jpg',
      '/images/open.png',
      '/images/close.png',
      '/images/back2.gif',
      '/images/person10.jpg',
      '/images/ipad1.jpg',
    ];

    preloadImages(imagesToPreload)
      .then(() => {
        console.log('Images for App preloaded!');
        setIsPreloaded(true);
      })
      .catch((error) => {
        console.error('Error preloading images for App:', error);
        setIsPreloaded(true); // Proceed even if some images fail
      });
  }, []);

  // Handle page opacity transition
  useEffect(() => {
    const body = document.body;
    if (isPreloaded) {
   
      body.style.opacity = '1';
      const gifDiv = document.createElement('div');
            gifDiv.className = 'gif';
            
            const gifImg = document.createElement('img');
            gifImg.src = `images/back2.gif?t=${new Date().getTime()}`;
            gifImg.className = 'gifimg';
            gifImg.style.border = 'none';
            gifDiv.appendChild(gifImg);
            document.body.appendChild(gifDiv);

            const trackedSetTimeout = (callback, delay) => {
              return setTimeout(callback, delay);
            };

            // Fade out and remove gif
            const fadeOutTimeout = trackedSetTimeout(() => {
              gifImg.classList.add('fade-out');
              trackedSetTimeout(() => {
                gifImg.remove();
                gifDiv.remove();
              }, 450); // Match the fade-out transition duration
            }, 2850);

            // const numberOfSquares = 24;

            trackedSetTimeout(() => {
              const containers = document.querySelector('.shake-container');
              if (containers) {
                containers.classList.add('shake');
                console.log("Shaking");

                containers.addEventListener('animationend', () => {
                  containers.classList.remove('shake');
                  console.log("removed shaking");
                });
              }
              else{
                console.log("Shaker doesnt exist");
              }

            //   for (let i = 0; i < numberOfSquares; i++) {
            //     trackedSetTimeout(function(){
            //       const square = document.createElement('div');
            //       let a = Math.floor(Math.random() * 6);
            //       if (a == 5){
            //         square.classList.add('floating-rectangle');
            //       }
            //       else{
            //         square.classList.add('floating-square');
            //       }
                  
            //       square.style.left = Math.random() * window.innerWidth + 'px';
            //       square.style.top = '-75px';
            //       document.getElementById("container").appendChild(square);

            //       trackedSetTimeout(function() {
            //           document.getElementById("container").removeChild(square);
            //       }, 4000);
            //     }, Math.ceil(Math.random() * 1350));
            //   }
             }, 1750);
             
             const popupDiv = document.createElement('div');
              popupDiv.className = 'popup';
              popupDiv.innerHTML = `
                <div class="popup-content">
                  <span class="popup-close">&times;</span>
                  <p>Website recently moved to firebase & github. If any bugs lmk!</p>
                </div>
              `;
              document.body.appendChild(popupDiv);

              // Close popup on click of the 'X'
              const closePopup = popupDiv.querySelector('.popup-close');
              closePopup.addEventListener('click', () => {
                popupDiv.remove();
              });
                popupDiv.style.display = 'block';
                const fadeOutTimeout2 = trackedSetTimeout(() => {
                  gifImg.classList.add('fade-out');
                  trackedSetTimeout(() => {
                    popupDiv.remove();
                  }, 450); // Match the fade-out transition duration
                }, 5850);
    } else {
      body.style.opacity = '0';
    }
  }, [isPreloaded]);

  return (
    <Router basename="/">
      <Header />
      <div>
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

    const isMobile = () => {
      return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(
        navigator.userAgent
      );
    };
    

    if (isMobile()) {
      console.log('MOBILE DEVICE OR U JUST NOT FULLSCREEN');
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
      infoElements.forEach((element) => {
        element.style.fontSize = '0.7rem';
      });

      const info2Elements = document.querySelectorAll('.info2');
      info2Elements.forEach((element) => {
        element.style.fontSize = '0.7rem';
      });

      const bottomRightTextElements = document.querySelectorAll('.bottom-right-text');
      bottomRightTextElements.forEach((element) => {
        element.style.fontSize = '0.85rem';
      });

      if (titledescription) {
        titledescription.style.fontSize = '1rem';
      }

      if (text1 && window.matchMedia('(orientation: portrait)').matches) {
        console.log('Changed');
        text1.innerHTML =
          'This website shows drawings I drew for fun. I like drawing, and am mostly self-taught. I hope you enjoy! :P';
      }
    }
  }, []);
  return (
    <motion.div
      initial={{  x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <div id="body" className="shake-container">
        <div id="container"></div>
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
              <img
                src="./images/person10.jpg"
                alt="Overview Image"
                id="overviewpicture"
              />
              <div className="bottom-right-text">Recent</div>
            </div>
          </Link>
          <div id="overview-text">
            <p id="text1">
              On Max's Drawings, you will see drawings I do over time. I like
              drawing sometimes, so I made this website. Below this description,
              you can see portraits or ppl I draw, other stuff, and things I drew
              on my brother's Ipad during break. I hope you enjoy! I also put some
              drawings from a few years ago I found in my closet. I originally
              created this website for a non-profit idea but screw that becuz it
              seems like too much work that I didn't want to do.
            </p>
          </div>
        </div>
        <div className="line-1"></div>
        <div className="person" id="bar">
          <Link to="/People">
            <div className="image-container">
              <img
                src="./images/person1.jpg"
                alt="personlookingsideways"
                className="indexpics"
              />
              <div className="bottom-right-text">People</div>
            </div>
          </Link>
          <Link to="/Ipad">
            <div className="image-container">
              <img
                src="./images/ipad1.jpg"
                alt="boyheronwallpaperIdrew"
                className="indexpics"
              />
              <div className="bottom-right-text">Ipad Draws</div>
            </div>
          </Link>
          <Link to="/Other">
            <div className="image-container">
              <img
                src="./images/other1.jpg"
                alt="abstractpicture"
                className="indexpics"
              />
              <div className="bottom-right-text">Other Stuff</div>
            </div>
          </Link>
          <Link to="/About">
            <div className="image-container">
              <img
                src="./images/maxpicture.jpg"
                alt="maxpicture"
                className="indexpics"
              />
              <div className="bottom-right-text">About me ig</div>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
