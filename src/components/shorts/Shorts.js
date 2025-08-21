import React, { useState, useRef, useEffect } from 'react';
import styles from './Shorts.module.css';

const LazyYoutubeEmbed = ({ videoId, index }) => {
  const ref = useRef(null);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowIframe(true);
        observer.disconnect();
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // ScrollReveal effect
  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      
      // Set initial state
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px) scale(0.95)';
      element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay based on index for staggered animation
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
            observer.unobserve(element);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      observer.observe(element);
      
      return () => observer.disconnect();
    }
  }, [index]);

  return (
    <div className={styles.shortItem} ref={ref}>
      {showIframe && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={`Short ${index + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.iframe}
          loading="lazy"
        />
      )}
    </div>
  );
};

const Shorts = () => {
  const titleRef = useRef(null);
  
  const shortsData = [
    '7gkADUUFY4g',
    'HULSpg02czU',
    'X7Ifdhi7aZE',
  ];

  // Title scroll reveal
  useEffect(() => {
    if (titleRef.current) {
      const element = titleRef.current;
      
      element.style.opacity = '0';
      element.style.transform = 'translateY(-20px)';
      element.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.320, 1)';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }, 200);
            observer.unobserve(element);
          }
        });
      }, {
        threshold: 0.5
      });
      
      observer.observe(element);
      
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div>
      {/* <h2 className={styles.title} ref={titleRef}>
        מאות תלמידות הוכשרו באקדמיה
      </h2> */}
      <div className={styles.shortsContainer}>
        {shortsData.map((videoId, index) => (
          <LazyYoutubeEmbed 
            key={index} 
            videoId={videoId} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default Shorts;