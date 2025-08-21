import React, { useEffect, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import styles from './Me.module.css'
import editPhoto from '../../images/אוראל ביוטי תדמית.png'
import ScrollReveal from 'scrollreveal'

const AboutMe = () => {
  const containerRef = useRef(null)
  
  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Refs for form fields
  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const reasonRef = useRef(null);

  // Server settings
  const serverUrl = "https://dynamic-server-dfc88e1f1c54.herokuapp.com/leads/newLead";
  const reciver = "orelhen123@gmail.com";

  useEffect(() => {
    if (containerRef.current) {
      const sr = ScrollReveal({
        duration: 1000,
        delay: 150,
        opacity: 0,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        container: window.document.documentElement,
        mobile: true,
        reset: false,
        viewFactor: 0.2
      })

      // אפקט רגיל לאלמנטים
      sr.reveal(`.${styles.revealItem}`, {
        origin: 'bottom',
        distance: '20px',
        interval: 100
      })

      // אפקט מיוחד ל-dividers - נפתחים לרוחב עם scale
      sr.reveal(`.${styles.divider}`, {
        origin: 'left',
        distance: '0px',
        duration: 1200,
        delay: 300,
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        scale: 0,
        opacity: 1,
        interval: 200,
        beforeReveal: function(domEl) {
          domEl.style.transformOrigin = 'left center'
        },
        afterReveal: function(domEl) {
          domEl.style.transform = 'scaleX(1)'
        }
      })
    }

    return () => {
      ScrollReveal().destroy()
    }
  }, [])

  const handleFormNavigation = () => {
    setIsFormOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closeForm = () => {
    setIsFormOpen(false);
    document.body.style.overflow = 'auto';
    // איפוס השדות אם הטופס נסגר ללא שליחה
    if (!submitted) {
      if (fullNameRef.current) fullNameRef.current.value = "";
      if (phoneRef.current) phoneRef.current.value = "";
      if (reasonRef.current) reasonRef.current.value = "";
      setErrors({
        fullName: '',
        phone: '',
        reason: ''
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name = fullNameRef.current.value;
    const phone = phoneRef.current.value;
    const reason = reasonRef.current.value;
    
    // Validate inputs
    let valid = true;
    const newErrors = { ...errors };

    // Validate full name
    if (!name.trim()) {
      newErrors.fullName = 'נא להזין שם מלא';
      valid = false;
    } else if (name.trim().length < 2) {
      newErrors.fullName = 'שם חייב להכיל לפחות 2 תווים';
      valid = false;
    } else {
      newErrors.fullName = '';
    }

    // Validate phone number (Israeli format)
    const phoneRegex = /^0(5\d|[23489])\d{7}$/;
    if (!phone.trim()) {
      newErrors.phone = 'נא להזין מספר טלפון';
      valid = false;
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = 'נא להזין מספר טלפון תקין';
      valid = false;
    } else {
      newErrors.phone = '';
    }

    // Validate reason
    if (!reason.trim()) {
      newErrors.reason = 'נא להזין סיבת פנייה';
      valid = false;
    } else if (reason.trim().length < 5) {
      newErrors.reason = 'נא להזין לפחות 5 תווים';
      valid = false;
    } else {
      newErrors.reason = '';
    }

    setErrors(newErrors);
    
    if (!valid) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Server data object
    const serverData = {
      name: name,
      phone: phone,
      email: "",
      reason: reason,
      reciver: reciver
    };

    try {
      // Send to server
      const serverResponse = await fetch(serverUrl, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(serverData)
      });

      if (serverResponse.ok) {
        setIsSubmitting(false);
        setSubmitted(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          fullNameRef.current.value = "";
          phoneRef.current.value = "";
          reasonRef.current.value = "";
          setSubmitted(false);
          setErrors({
            fullName: '',
            phone: '',
            reason: ''
          });
          closeForm();
        }, 3000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      alert("התרחשה שגיאה, אנא נסו שוב מאוחר יותר");
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section ref={containerRef} className={styles.section} id="מי-אני">
        <div className={styles.container}>
          <div className={`${styles.imageWrapper} ${styles.revealItem}`}>
            <img src={editPhoto} alt="אוראל הרוש" className={styles.image} />
          </div>

          <div className={`${styles.content} ${styles.revealItem}`}>
            <h2 className={styles.mainTitle}>נעים להכיר, אוראל הרוש</h2>

            <div className={styles.quoteContainer}>
              <p className={styles.quote}>
            שיניתי את החיים שלי מקצה לקצה והבנתי שהשליחות שלי היא לעזור גם לאחרות לעשות את אותו הדבר
              </p>
            </div>

            <div className={styles.textBlock}>
              <p className={styles.paragraph}>
                עשר שנים הייתי לוחמת במג׳׳ב. היה מי שהחליט בשבילי מתי אני קמה, מתי אני אוכלת, ואיך ייראה כל יום שלי. אבל בפנים ידעתי שאני רוצה משהו אחר. רציתי חופש. רציתי לבחור איך ייראה היום שלי, ולדעת שכל מה שיש לי בחיים - הגיע בזכות מה שאני עושה, לא בזכות מערכת שקובעת לי
              </p>

              <div className={styles.divider}></div>

              <p className={styles.paragraph}>
                עולם היופי תמיד סקרן אותי אבל דווקא את הלימודים בתחום דחיתי המון זמן. היו בי חששות, פחדים, ספקות. לא ידעתי מאיפה להתחיל, אם אני בכלל אצליח, אם להיות עצמאית זה בשבילי ואם מישהי בכלל תסכים לבוא אליי. 
              </p>

              <div className={styles.divider}></div>

       <p className={styles.paragraph}>
    ובכל זאת, עשיתי את הצעד. נרשמתי, התחלתי מאפס, והלכתי עם התחושה הפנימית שלי למרות כל הפחדים. מהר מאוד הבנתי שאני לא היחידה שהרגישה ככה, ושדווקא מהמקום הזה מתחילים. בלימודים כבר הבנתי שזה המקום שלי והחלטתי שאני באה כדי להצליח!. אחרי התמדה,תרגול והשקעה מהצד שלי  <strong>תוך שלושה חודשים היומן שלי כבר היה מפוצץ!</strong>
  </p>

              <div className={styles.divider}></div>

  <p className={styles.paragraph}>
    היום אני מלווה נשים שיש להן את אותה התשוקה בדיוק, ונותנת להן את כל מה שלי היה חסר בהתחלה. הלימודים איתי לא עוצרים בטכניקה - את מקבלת ביטחון, ליווי אישי, והכוונה לבנות עסק מקצועי ורווחי שמחזיק לאורך זמן.
  </p>

              <div className={styles.divider}></div>

  <p className={styles.finalText}>
    היום אני מבינה שלקח לי יותר מדי זמן לעשות את הצעד הכי חשוב בחיים שלי. בדיעבד, הייתי מתחילה הרבה קודם. ואני יודעת שכשאת תבחרי להתחיל, את תחשבי בדיוק אותו הדבר..
  </p>

            </div>

            <button
              className={styles.ctaButton}
              onClick={handleFormNavigation}
            >
              <span className={styles.buttonIcon}>💬</span>
              בואי נתחיל את הדרך שלך לחופש, ביטחון, והגשמה
            </button>
          </div>
        </div>
      </section>

      {/* Form Overlay */}
      {isFormOpen && (
        <div className={styles.formOverlay} onClick={closeForm}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>בואי נתחיל את הדרך שלך</h3>
              <button className={styles.formCloseButton} onClick={closeForm}>
                <FaTimes />
              </button>
            </div>
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="fullName">שם מלא</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                  placeholder="השם המלא שלך"
                  disabled={isSubmitting || submitted}
                  ref={fullNameRef}
                />
                {errors.fullName && <p className={styles.errorText}>{errors.fullName}</p>}
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phone">מספר טלפון</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  placeholder="050-0000000"
                  disabled={isSubmitting || submitted}
                  ref={phoneRef}
                />
                {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="reason">סיבת הפנייה</label>
                <textarea
                  id="reason"
                  name="reason"
                  rows="4"
                  className={`${styles.textarea} ${errors.reason ? styles.inputError : ''}`}
                  placeholder="ספרי לי קצת על עצמך ומה מעניין אותך"
                  disabled={isSubmitting || submitted}
                  ref={reasonRef}
                />
                {errors.reason && <p className={styles.errorText}>{errors.reason}</p>}
              </div>
              
              <button 
                type="submit" 
                className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''} ${submitted ? styles.submitted : ''}`}
                disabled={isSubmitting || submitted}
              >
                {isSubmitting ? 'שולח...' : submitted ? 'נשלח בהצלחה!' : 'אוראל, בואי נדבר!'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AboutMe