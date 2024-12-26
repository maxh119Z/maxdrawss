import { useEffect, useRef, React } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { preloadImages } from './utils';

function People() {
  useEffect(() => {
    // Preload images specific to the Home component
    const imagesToPreload = [
      "images/connectlogo.png",
      "images/Croppedbackground1.png",
      "images/open.png",
      "images/close.png",
      "images/caden.jpg",
      "images/person7.jpg",
      "images/person10.jpg"
    ];

    preloadImages(imagesToPreload).then(() => {
      
    }).catch((error) => {
  
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
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <>
      
      <div id="TITLE">
            <h1>People</h1>
        </div>
    
      <div className="person">
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/person10.jpg" alt="Max" />
          </span>
          <div className="bottom-right-text">11/27/2024</div>
        </div>
        <span className="info">
          <h1>Eye Part Two</h1>
          <div className="line-2"></div>
          <p>Scroll down to see eye part 1, this one is better I think</p>
        </span>
      </div>

      <div className="person">
        <span className="info">
          <h1>Zombified Caden</h1>
          <div className="line-2"></div>
          <p>I drew him as a zombie. He looks very cool. Click on the image.</p>
        </span>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="cadenpicture" src="images/person7.jpg" alt="Max" />
          </span>
          <div className="bottom-right-text">9/5/2024</div>
        </div>
      </div>

      <div className="person">
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/person5.jpg" alt="Max" />
          </span>
          <div className="bottom-right-text">8/4/2024</div>
        </div>
        <span className="info">
          <h1>Kevin Zhou</h1>
          <div className="line-2"></div>
          <p>I drew Kevin Zhou, he looks really cool am I right?</p>
        </span>
      </div>

      <div className="person">
        <span className="info">
          <h1>Attempt of Rajat</h1>
          <div className="line-2"></div>
          <p>I tried drawing Rajat, it didn't turn out good.</p>
        </span>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="rajatpicture" src="images/person6.jpg" alt="Max" />
          </span>
          <div className="bottom-right-text">8/10/2024</div>
        </div>
      </div>

      <div className="person">
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/person2.jpg" alt="Max" />
          </span>
          <div className="bottom-right-text">7/24/2024</div>
        </div>
        <span className="info">
          <h1>My Ancestor 🐒</h1>
          <div className="line-2"></div>
          <p>I'm not sure what this drawing is. I kinda just searched up an old guy for reference.</p>
        </span>
      </div>

      <div className="person">
        <span className="info">
          <h1>A Chinese Dude</h1>
          <div className="line-2"></div>
          <p>This Chinese dude works in rice fields.</p>
        </span>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/person3.jpg" alt="Max" />
          </span>
          <div className="bottom-right-text">7/22/2024</div>
        </div>
      </div>

      <div className="person">
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/overview.jpg" alt="Max" />
          </span>
          <div className="bottom-right-text">7/23/2024</div>
        </div>
        <span className="info">
          <h1>Um, This Is My Eye</h1>
          <div className="line-2"></div>
          <p>Eyes are cool, so I drew one because I was bored and did not feel like doing math homework.</p>
        </span>
      </div>

      <div className="person">
        <span className="info">
          <h1>Dude Is Depressed</h1>
          <div className="line-2"></div>
          <p>He is contemplating life choices and why he is sitting there.</p>
        </span>
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/person1.jpg" alt="Max" />
          </span>
          <div className="bottom-right-text">7/21/2024</div>
        </div>
      </div>

      <div className="person">
        <div className="image-container2">
          <span id="maximg">
            <img className="clickable" id="maxpicture" src="images/person4.jpg" alt="Max" />
          </span>
          <div className="bottom-right-text">April 2024</div>
        </div>
        <span className="info">
          <h1>My Math Homework</h1>
          <div className="line-2"></div>
          <p>
            I was doing math homework and my math teacher Ms. Lin got mad at me for drawing this.
          </p>
        </span>
      </div>
      
    </>
    </motion.div>
  );
}


export default People