import { useEffect, useState } from 'react';
import './App.css';
import { preloadImages } from './utils';
import { motion } from "framer-motion";

const Ipad = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const body = document.body;
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
    // Preload images specific to the Ipad component
    const imagesToPreload = [
      "images/connectlogo.png",
      "images/Croppedbackground1.png",
      "images/open.png",
      "images/close.png",
      "images/ipad1.jpg",
      "images/ipad2.png",
      "images/person9.png",
      "images/ipad3.jpg",
    ];

    preloadImages(imagesToPreload)
      .then(() => {
        console.log("Images for Ipad preloaded!");
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error preloading images for Ipad:", error);
        setIsLoaded(true); // Proceed even if some images fail to preload
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
    <motion.div
      initial={{y: 50 }}
      animate={{ y: 0 }}
      exit={{ y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="person">
        <span className="info">
          <h1>last week before amc10 AHhh</h1>
          <br />
          <div className="line-2"></div>
          <br />
          help i failed
        </span>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/person9.png" alt="Max" />
          </span>
          <div className="bottom-right-text">11/3/2024</div>
        </div>
      </div>

      <div className="person">
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/ipad1.jpg" alt="Max" />
          </span>
          <div className="bottom-right-text">December 2023</div>
        </div>
        <span className="info">
          <h1>boy and heron</h1>
          <br />
          <div className="line-2"></div>
          I drew this with my brother while on plane ride to Cancun in Winter Break
        </span>
      </div>

      <div className="person">
        <span className="info">
          <h1>boy x heron<br /> computer wallpaper</h1>
          <br />
          <div className="line-2"></div>
          I drew this after watching
          <br />
          boy and heron with my brother.
          <br />
        </span>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/ipad2.png" alt="Max" />
          </span>
          <div className="bottom-right-text">2023 December</div>
        </div>
        <div className="person">
          <div className="image-container2">
            <span id="maximg">
              <img className="clickable" id="maxpicture" src="images/ipad3.jpg" alt="Max" />
            </span>
            <div className="bottom-right-text">April 2024</div>
          </div>
          <span className="info">
            <h1>he is more chinese<br /> than Kevin Zhou</h1>
            <br />
            <div className="line-2"></div>
            I drew this on plane ride on Ana's iPad
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Ipad;
