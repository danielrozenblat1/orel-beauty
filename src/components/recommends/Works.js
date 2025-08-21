import React from 'react';
import styles from './Recommendsr.module.css';
import Button from '../button/Button';

// Import your images
import result1 from "../../images/אוראל ביוטי לקוחות 1.png";
import result2 from "../../images/אוראל ביוטי לקוחות 2.png";
import result3 from "../../images/אוראל ביוטי לקוחות 3.png";
import result4 from "../../images/אוראל ביוטי לקוחות 4.png";
import result5 from "../../images/אוראל ביוטי לקוחות 5.png";
import result6 from "../../images/אוראל ביוטי לקוחות 6.png";
import result7 from "../../images/אוראל ביוטי לקוחות 7.png";
import result8 from "../../images/אוראל ביוטי לקוחות 8.png";
import result9 from "../../images/אוראל ביוטי לקוחות 9.png";
import result10 from "../../images/אוראל ביוטי לקוחות 10.png";
import result11 from "../../images/אוראל ביוטי לקוחות 11.png";
import result12 from "../../images/אוראל ביוטי לקוחות 12.png";

const Works = () => {
  const images = [
   result1, result2, result3, result4,  result5, result6, result7, result8, 
   result9, result10, result11, result12, 
  ];

  return (
    <>
      <div className={styles.explain}>
         וזה רק חלק קטן מההודעות שקיבלתי מהן
      </div>

   
      <div className={styles.container}>
        <div className={styles.scrollTrack}>
          {/* קבוצה ראשונה של תמונות */}
          <div className={styles.scrollContainer}>
            {images.map((img, index) => (
              <div key={`first-${index}`} className={styles.imageWrapper}>
                <img
                  src={img}
                  alt={`המלצה ${index + 1}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
          {/* קבוצה שנייה זהה של תמונות */}
          <div className={styles.scrollContainer}>
            {images.map((img, index) => (
              <div key={`second-${index}`} className={styles.imageWrapper}>
                <img
                  src={img}
                  alt={`המלצה ${index + 1}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Works;