import { useEffect, useRef, React } from 'react';
import './App.css';
import Header from './header.jsx';
import { motion } from 'framer-motion';
import { preloadImages } from './utils';

function About() {
  useEffect(() => {
    // Preload images specific to the Home component
    const imagesToPreload = [
      "images/connectlogo.png",
      "images/Croppedbackground1.png",
      "images/open.png",
      "images/close.png",
      "images/maxpicture.jpg"
    ];

    preloadImages(imagesToPreload).then(() => {
      console.log("Images for About preloaded!");
      
    }).catch((error) => {
      console.error("Error preloading images for About:", error);
      
    });
    const isMobile = () => {
      return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(
        navigator.userAgent
      );
    };

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
