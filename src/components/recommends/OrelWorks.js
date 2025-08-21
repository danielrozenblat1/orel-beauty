import React from 'react';
import styles from './Recommends.module.css';
import Button from '../button/Button';

// Import your images
import result1 from "../../images/אוראל הרוש ציפורניים 1.png";
import result2 from "../../images/אוראל הרוש ציפורניים 2.png";
import result3 from "../../images/אוראל הרוש ציפורניים 3.png";
import result4 from "../../images/אוראל הרוש ציפורניים 4.png";
import result5 from "../../images/אוראל הרוש ציפורניים 5.png";
import result6 from "../../images/אוראל הרוש ציפורניים 6.png";
import result7 from "../../images/אוראל הרוש ציפורניים 7.png";
import result8 from "../../images/אוראל הרוש ציפורניים 8.png";
import result9 from "../../images/אוראל הרוש ציפורניים 9.png";
import result10 from "../../images/אוראל הרוש ציפורניים 10.png";


const OrelWorks = () => {
  const images = [
   result1, result2, result3, result4,  result5, result6, result7, result8, 
   result9, result10,
  ];

  return (
    <>
      <div className={styles.explain}>
    בשנים האחרונות הוצאתי אלפי נשים עם ציפורניים שנראות ככה:
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

export default OrelWorks;