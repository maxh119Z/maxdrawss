import { useEffect, useState } from 'react';
import './App.css';
import Header from './header.jsx';
import { motion } from 'framer-motion';
import { preloadImages } from './utils';

function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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
