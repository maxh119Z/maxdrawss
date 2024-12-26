import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import { preloadImages } from './utils';

const Other = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    body.style.opacity = "0";
    // Preload images specific to the Other component
    const imagesToPreload = [
      "images/connectlogo.png",
      "images/Croppedbackground1.png",
      "images/open.png",
      "images/close.png",
      "images/other6.jpg",
      "images/other5.jpg",
      "images/other4.jpg",
    ];

    preloadImages(imagesToPreload)
      .then(() => {
        console.log("Images for Other preloaded!");
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error preloading images for Other:", error);
        setIsLoaded(true); // Proceed even if some images fail
      });
  }, []);

  // Set page opacity based on the loading state
  useEffect(() => {
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
    const body = document.body;
    if (isLoaded) {
      body.style.transition = "opacity 0.5s ease-in-out";
      body.style.opacity = "1";
    } else {
      body.style.opacity = "0";
    }
  }, [isLoaded]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="other-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div className="person" variants={itemVariants}>
        <span className="info">
          <h1>Islamic Art</h1>
          <br />
          <div className="line-2"></div>
          <br />
          Mr. Einfeldt plz I need the one point of extra credit
        </span>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/other6.jpg" alt="Islamic Art" />
          </span>
          <div className="bottom-right-text">9/23/2024</div>
        </div>
      </motion.div>

      <motion.div className="person" variants={itemVariants}>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/other1.jpg" alt="Guy Eating Earth" />
          </span>
          <div className="bottom-right-text">2022?</div>
        </div>
        <span className="info">
          <h1>
            A guy eating a <br />
            guy eating Earth
          </h1>
          <br />
          <div className="line-2"></div>
          <br />
          I drew this with my friends at school with marker.
        </span>
      </motion.div>

      <motion.div className="person" variants={itemVariants}>
        <span className="info">
          <h1>Max's pizza</h1>
          <br />
          <div className="line-2"></div>
          <br />
          A visual arts elective I had for a few months in 7th grade
        </span>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/other2.jpg" alt="Max's Pizza" />
          </span>
          <div className="bottom-right-text">2021</div>
        </div>
      </motion.div>

      <motion.div className="person" variants={itemVariants}>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/other3.jpg" alt="I'm Dizzy" />
          </span>
          <div className="bottom-right-text">I don't know</div>
        </div>
        <span className="info">
          <h1>im dizzy</h1>
          <br />
          <div className="line-2"></div>
          idk when I drew this to be honest.
          <br />
        </span>
      </motion.div>

      <motion.div className="person" variants={itemVariants}>
        <span className="info">
          <h1>depressed lisa</h1>
          <br />
          <div className="line-2"></div>
          7th grade visual arts elective.
          <br />
          Mona Lisa sad because of pollution.
          <br />
        </span>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/other4.jpg" alt="Depressed Lisa" />
          </span>
          <div className="bottom-right-text">2021</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Other;
