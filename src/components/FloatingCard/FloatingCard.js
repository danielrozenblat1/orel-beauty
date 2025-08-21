import React, { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import styles from './FloatingCard.module.css';

const FloatingCard = ({ 
  icon, 
  title, 
  description, 
  animationDelay = 2500
}) => {
  const playerRef = useRef(null);

  const handleComplete = () => {
    setTimeout(() => {
      playerRef?.current?.playFromBeginning();
    }, animationDelay);
  };
  
  useEffect(() => {
    playerRef?.current?.playFromBeginning();
  }, []);
    
  return (
    <div className={styles.infoItem}>
      <div className={styles.iconWrapper}>
        <Player 
          icon={icon} 
          ref={playerRef} 
          size="100%" 
          onComplete={handleComplete}
          className={styles.infoIcon}
        />
      </div>
      <div className={styles.infoText}>
        <strong>{title}</strong>
        
        <div className={styles.infoText}>{description}</div>
      </div>
    </div>
  )
}

export default FloatingCard