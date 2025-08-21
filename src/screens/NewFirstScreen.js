import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './NewFirstScreen.module.css';
import middleImage from "../images/אוראל ביוטי תמונה מרכזית.png";
import rightImage from "../images/אוראל ביוטי תמונה ימין.png"
import leftImage from "../images/אוראל ביוטי תמונה שמאל.png"
import GradientLoader from '../components/loader/Loader';

const FirstScreen = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imageUrls = [
      middleImage,
      rightImage,
      leftImage
    ];

    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    };

    Promise.all(imageUrls.map(loadImage))
      .then(() => setImagesLoaded(true))
      .catch((err) => console.error("Failed to load images", err));
  }, []);

  if (!imagesLoaded) {
    return <GradientLoader/>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={`${styles.backgroundImage} ${styles.leftImage}`}></div>
        <div className={`${styles.backgroundImage} ${styles.centerImage}`}></div>
        <div className={`${styles.backgroundImage} ${styles.rightImage}`}></div>
      </div>
      
      <div className={styles.contentBox}>
        <h1 className={styles.title}>OREL BEAUTY</h1>
        <p className={styles.description}>הדרך שלך לקריירה רווחית בתחום הציפורניים מתחילה כאן</p>
        
        <div className={styles.scrollIndicator}>
          <ChevronDown className={styles.scrollArrow} size={34} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
};

export default FirstScreen;