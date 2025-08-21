import React from 'react';
import needle from "../../icons/wired-lineal-1594-manicure-hover-pinch.json"
import technic from "../../icons/wired-lineal-1023-portfolio-hover-pinch (1).json"

import shake from "../../icons/wired-lineal-298-coins-hover-spending.json"
import work from "../../icons/wired-lineal-45-clock-time-hover-pinch (1).json"
import styles from './BenefitHishtalmut.module.css';
import ScrollReveal from 'scrollreveal';
import { useEffect,useRef } from 'react';
import {Player} from "@lordicon/react"

const VerticalIconCard = ({ text, icon }) => {

  const handleComplete = () => {
    setTimeout(() => {
      playerRef1?.current?.playFromBeginning();
    }, 2500);
  };
  
  const playerRef1 = useRef(null);
  
  useEffect(() => {
    playerRef1?.current?.playFromBeginning();
  }, []);
  
  useEffect(() => {
    ScrollReveal().reveal(`.${styles.text}`, {
      duration: 1000,
      distance: "40px",
      origin: "bottom",
      easing: "ease-out",
      reset: false,
      viewFactor: 0.2,
      interval: 300,
      delay: 200,
      scale: 1,
    });
  }, []);
  
  return (
    <div className={styles.card}>
       <div className={styles.icon}>
        <Player 
          icon={icon} 
          ref={playerRef1} 
          size="100%" 
          onComplete={handleComplete}
        />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

// יתרונות השתלמות המיקרובליידינג של רחלי מנקודת מבט התלמידה
const BenefitsContainer = () => {

  const benefits = [

    {
      icon: technic,
      text: "להפסיק לתת דין וחשבון לבוס כי את הופכת לבוסית של עצמך!"
    },
   
    {
      icon: shake,
      text: "להרוויח סכומים שפעם היו נשמעים לך דמיוניים - כל חודש מחדש!"
    },
        {
      icon: needle,
      text: "לקום בבוקר בידיעה שאת מתפרנסת מהתשוקה שלך"
    },
     {
      icon: work,
      text:"לעבוד לפי הזמנים שלך ולא מ9-17"
    },

   
  ];

  return (
    <div className={styles.container}>
      {benefits.map((benefit, index) => (
        <VerticalIconCard 
          key={index} 
          text={benefit.text} 
          icon={benefit.icon}
        />
      ))}
    </div>
  );
};

export default VerticalIconCard;
export { BenefitsContainer };