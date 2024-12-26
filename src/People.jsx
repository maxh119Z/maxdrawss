import { useEffect, useState } from 'react';
import './App.css';
import { motion } from "framer-motion";
import { preloadImages } from './utils';

function People() {
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
    // Preload images specific to the People component
    const imagesToPreload = [
      "images/connectlogo.png",
      "images/Croppedbackground1.png",
      "images/open.png",
      "images/close.png",
      "images/caden.jpg",
      "images/overview.jpg",
      "images/person10.jpg",
      "images/person9.png",
    ];

    preloadImages(imagesToPreload)
      .then(() => {
        console.log("Images for People preloaded!");
        setIsLoaded(true); // Mark as loaded
      })
      .catch((error) => {
        console.error("Error preloading images for People:", error);
        setIsLoaded(true); // Proceed even if some images fail
      });
  }, []);

  // Change opacity of the page based on loading state
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
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}
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
            <p>I drew him as a zombie. He looks very cool.</p>
          </span>
          <div className="image-container2">
            <span id="maximg">
              <img className="clickable" id="cadenpicture" src="images/caden.jpg" alt="Max" />
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

export default People;
