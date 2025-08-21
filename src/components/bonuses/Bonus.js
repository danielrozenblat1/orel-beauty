import React, { useEffect, useRef } from 'react';
import styles from './Bonus.module.css';
import ScrollReveal from 'scrollreveal';
import { Player } from '@lordicon/react';

import finish from "../../icons/wired-outline-456-handshake-deal-hover-pinch.json";

import shake from "../../icons/wired-outline-981-consultation-hover-conversation-alt (1).json";
import business from "../../icons/wired-outline-187-suitcase-morph-open (3).json";

const BenefitCard = () => {
  const benefits = [
    {
      id: "01",
      title: "ליווי גם אחרי הקורס",
      description: "גם אחרי סיום הקורס אני זמינה לך לכל שאלה, חשש שעולה לך או התייעצות, את תמיד יכולה לפנות אלי, להרים צלצול ולהתייעץ איתי על הכל",
      icon: finish
    },
    {
      id: "02",
      title: "יחס אישי",
      description: "אני איתך בקצב שלך. בלי לחץ, בלי לרוץ קדימה. יש מקום לשאלות, לעצירות, להסברים – עד שתרגישי בטוחה בעצמך.",
      icon: shake
    },
    {
      id: "03",
      title: "הכנה לעולם העצמאות",
      description: "תצאי מהקורס עם ביטחון לפתוח עסק. תלמדי איך להתחיל לעבוד, לגבות מחיר נכון ולמשוך לקוחות שמחפשים בדיוק אותך.",
      icon: business
    }
  ];

  const playerRefs = useRef(benefits.map(() => React.createRef()));

  const handleComplete = (index) => {
    setTimeout(() => {
      if (playerRefs.current[index]?.current) {
        playerRefs.current[index].current.playFromBeginning();
      }
    }, 2500);
  };

  useEffect(() => {
    playerRefs.current.forEach(ref => {
      if (ref.current) {
        ref.current.playFromBeginning();
      }
    });
  }, []);

  useEffect(() => {
    const sr = ScrollReveal({
      distance: '30px',
      duration: 1000,
      easing: 'ease-out',
      reset: false,
      viewFactor: 0.2,
      interval: 300,
      delay: 200,
      scale: 1,
    });

    sr.reveal(`.${styles.title}`, { origin: 'right' });
    sr.reveal(`.${styles.cardDescription}`, { origin: 'bottom' });
    sr.reveal(`.${styles.icon}`, { origin: 'left' });

    return () => sr.destroy();
  }, []);

  return (
    <div className={styles.benefitContainer}>
      <div className={styles.cardsGrid}>
        {benefits.map((benefit, index) => (
          <div key={benefit.id} className={styles.card}>
            <div className={styles.numberOverlay}>
              {benefit.id}
            </div>
            <div className={styles.icon}>
              <Player
                icon={benefit.icon}
                ref={playerRefs.current[index]}
                size="100%"
                onComplete={() => handleComplete(index)}
                state="hover-cycle"
              />
            </div>
            <h3 className={styles.cardTitle}>
              {benefit.title}
            </h3>
            <p className={styles.cardDescription}>
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitCard;
