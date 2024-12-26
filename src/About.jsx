import { useEffect, useState } from 'react';
import './App.css';
import Header from './header.jsx';
import { motion } from 'framer-motion';
import { preloadImages } from './utils';

function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    body.style.opacity = "0";
    const isMobile = () => {
      return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1
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
    // Preload images specific to the About component
    const imagesToPreload = [
      "images/connectlogo.png",
      "images/Croppedbackground1.png",
      "images/open.png",
      "images/close.png",
      "images/maxpicture.jpg",
      "images/IMG_0163.jpg",
    ];

    preloadImages(imagesToPreload)
      .then(() => {
        console.log("Images for About preloaded!");
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error preloading images for About:", error);
        setIsLoaded(true); // Proceed even if some images fail
      });
  }, []);

  // Handle page opacity based on the loading state
  useEffect(() => {
    const body = document.body;
    if (isLoaded) {
      body.style.transition = "opacity 0.5s ease-in-out";
      body.style.opacity = "1";
    } else {
      body.style.opacity = "0";
    }
  }, [isLoaded]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="about-container"
      >
        <div className="line-1"></div>
        <div id="TITLE">
          <h2>About Us</h2>
        </div>
        <div className="person">
          <span id="maximg">
            <img id="maxpicture" src="images/maxpicture.jpg" alt="Max" />
          </span>
          <span className="info2">
            <h1>Max Zhang</h1>
            <br />
            <div className="line-2"></div>
            <br />
            Hi, I am Max and I am a sophomore at Irvington <br />
            High School. I like badminton, coding, drawing. I<br />
            started making this website because I saw a need<br />
            to use 1-2 days of my time coding this website!<br />
            My skills in coding are mostly Java and HTML,<br />
            CSS, JS.
          </span>
        </div>
        <div className="person">
          <span className="info2">
            <h1>Maz Xhang</h1>
            <br />
            <div className="line-2"></div>
            <br />
            Hi, I am Maz and I am a sophomore at Irvington <br />
            School High. I like badminton, coding, drawing. I<br />
            started making this website because I saw a need<br />
            to use -1 days of my life coding this website!<br />
            My skills in coding are mostly playing Clash of Clans and,<br />
            arguing with my mom.
          </span>
          <span id="maximg">
            <img id="maxpicture" src="images/IMG_0163.jpg" alt="Max" />
          </span>
        </div>
      </motion.div>
    </>
  );
}

export default About;
