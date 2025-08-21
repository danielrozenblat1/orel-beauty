// CoursesDrawer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, Clock, Users, Award, BookOpen, 
  Sparkles, Heart, Star, Calendar, ArrowDown, Plus, Minus,
  Target, Shield, CheckCircle, Trophy, Building, Brush,
  Palette, Scissors, Camera, Eye, PenTool, Wand2, Focus,
  Lightbulb, TrendingUp, Activity, Flower2, UserCheck,
  Search, Settings, FileText, PhoneCall, Handshake,
  Monitor, ShoppingCart, Megaphone, BarChart3, DollarSign,
  Smartphone, MessageCircle, Map, PlayCircle, X, Brain,
  Zap, Gauge, AlertTriangle
} from 'lucide-react';
import styles from './Sillabuses.module.css';

const CoursesDrawer = () => {
  // שינוי: כל הקורסים סגורים כברירת מחדל
  const [expandedCourses, setExpandedCourses] = useState({});

  // מצב הטופס
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    reason: ''
  });

  // רפרנסים לשדות הטופס
  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const reasonRef = useRef(null);

  // Server settings - התאם לפי הצורך
  const serverUrl = "https://dynamic-server-dfc88e1f1c54.herokuapp.com/leads/newLead";
  const reciver = "orelhen123@gmail.com"; // התאם למייל של אוראל

  // ניקוי גלילה כשהקומפוננטה נהרסת
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    };
  }, []);

  // האזנה למקש Escape לסגירת הטופס
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isFormOpen) {
        closeForm();
      }
    };

    if (isFormOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isFormOpen]);

  const toggleCourse = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const openForm = (courseTitle) => {
    setSelectedCourse(courseTitle);
    setIsFormOpen(true);
    setErrors({
      fullName: '',
      phone: '',
      reason: ''
    });
    setSubmitted(false);
    
    // מנע גלילה ברקע
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  };

  const closeForm = () => {
    setIsFormOpen(false);
    
    // החזר גלילה ברקע
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
    
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
      email: "", // Not required in this form but included in the API structure
      reason: `${reason} | קורס נבחר: ${selectedCourse}`, // הוספתי את הקורס הנבחר לסיבת הפנייה
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

  const courses = [
    {
      id: 'beginners-gel',
      title: 'קורס מתחילות פרימיום מניקור לק ג׳ל',
      subtitle: '4 מפגשים | פרונטלי | תרגול על מודליסטית',
      sessions: [
        {
          number: 1,
          title: 'תיאוריה בסיסית: יסודות + תרגול חיזוקי ציפורניים',
          content: [
            { text: 'מבנה אנטומי של הציפורן והכרת כלים מקצועיים: סכנת פציעות, סטריליזציה וזיהום', icon: <Shield className={styles.contentIcon} /> },
            { text: 'הכרת לקוחות טיפוסיים בהתמודדות ראשונית עם תסכול, פחדים וטעויות', icon: <UserCheck className={styles.contentIcon} /> },
            { text: 'הכנת הציפורן לפני מריחת לק – שיוף, חיטוי, הכנת מבנה נכון', icon: <Settings className={styles.contentIcon} /> },
            { text: 'מריחת בסיס + בונדר + בניית מבנה אנטומי', icon: <Building className={styles.contentIcon} /> },
            { text: 'מריחת צבע + טופ – שילוב קישוטים ויצירתיות', icon: <Palette className={styles.contentIcon} /> }
          ]
        },
        {
          number: 2,
          title: 'עיצוב צרפתי + קישוטים גאומטריים (ללא מכחול)',
          content: [
            { text: 'חידוד קווים עם חיזוקי ג\'ל', icon: <PenTool className={styles.contentIcon} /> },
            { text: 'חידוד הצורה של הציפורן', icon: <Focus className={styles.contentIcon} /> },
            { text: 'תרגול על מודליסטית', icon: <Activity className={styles.contentIcon} /> }
          ]
        },
        {
          number: 3,
          title: 'תרגול קווים ומריחת ג\'ל',
          content: [
            { text: 'עבודה עם ג\'לים סמיכים שונים', icon: <Brush className={styles.contentIcon} /> },
            { text: 'חיזוק קווים ומבנה בסיסי', icon: <TrendingUp className={styles.contentIcon} /> },
            { text: 'תרגול על מודליסטית', icon: <Activity className={styles.contentIcon} /> }
          ]
        },
        {
          number: 4,
          title: 'תיאוריה עסקית – ניהול תהליך עבודה + שיווק וסיום',
          content: [
            { text: 'תרגול לק ג\'ל מלא ומריחת ג\'ל בצורה מקצועית', icon: <Wand2 className={styles.contentIcon} /> },
            { text: 'שילוב פרנץ\', צבע, קישוטים וגימור', icon: <Sparkles className={styles.contentIcon} /> },
            { text: 'טיפים להתנהלות מול לקוחה', icon: <MessageCircle className={styles.contentIcon} /> },
            { text: 'תעודות סיום', icon: <Award className={styles.contentIcon} /> },
            { text: 'תרגול על מודליסטית', icon: <Activity className={styles.contentIcon} /> }
          ]
        }
      ]
    },
    {
      id: 'level-up',
      title: 'קורס העלאת רמה',
      subtitle: 'מפגש אחד | פרונטלי | תרגול על מודליסטית',
      
      sessions: [
        {
          number: '01',
          title: 'תיאוריה מקצועית',
          content: [
            { text: 'מבנה הציפורן והבנת האנטומיה - איך לעבוד נכון בלי לגרום לנזקים', icon: <Shield className={styles.contentIcon} /> },
            { text: 'אבחון סוגי ציפורניים והבנת נקודות תורפה אצל לקוחות', icon: <Brain className={styles.contentIcon} /> },
            { text: 'שכבות הציפורן הנכונה להחזקה מקסימלית של ג\'ל', icon: <Building className={styles.contentIcon} /> },
            { text: 'סיבות לפטריות אצל לקוחות ושמירה על סטריליות', icon: <AlertTriangle className={styles.contentIcon} /> },
            { text: 'סף כאב של לקוחות', icon: <Gauge className={styles.contentIcon} /> },
            { text: 'ההבדל בין מבנה אנטומי למבנה בנייה ואיך למנוע מהן', icon: <Search className={styles.contentIcon} /> }
          ]
        },
        {
          number: '01',
          title: 'עבודה מעשית',
          content: [
            { text: 'בניית מבנה אנטומי נכון - ליצירת עבודה עמידה ואסתטית', icon: <Building className={styles.contentIcon} /> },
            { text: 'מריחה לק ג\'ל מושלמת - ללא נזילות, כולל צבע קרוב לקיוטיקולה', icon: <Brush className={styles.contentIcon} /> },
            { text: 'שיוף מקצועי - עבודה מהירה ונקייה בלי לפגוע בציפורן הטבעית', icon: <Focus className={styles.contentIcon} /> },
            { text: 'פתרון תקלות נפוצות: התרוממות, שברים וציפויים שלא מחזיק', icon: <Settings className={styles.contentIcon} /> },
            { text: 'תרגול מעשי מלא על מודליסטית עם פידבק אישי', icon: <Activity className={styles.contentIcon} /> }
          ]
        }
      ]
    },
    {
      id: 'pedicure',
      title: 'קורס פדיקור קוסמטי',
      subtitle: '2 מפגשים | פרונטלי | תרגול על מודליסטית',
      sessions: [
        {
          number: 1,
          title: 'מפגש ראשון עיוני',
          content: [
            { text: 'אנטומיה בסיסית – הבנת מבנה כף הרגל', icon: <BookOpen className={styles.contentIcon} /> },
            { text: 'טווחי בעיות בכף הרגל', icon: <Search className={styles.contentIcon} /> },
            { text: 'מכשור מקצועי – תיאוריה', icon: <Settings className={styles.contentIcon} /> },
            { text: 'תיאוריה סטריליזציה – כלי עבודה', icon: <Shield className={styles.contentIcon} /> },
            { text: 'פתולוגיות שכיחות', icon: <Eye className={styles.contentIcon} /> }
          ]
        },
        {
          number: 2,
          title: 'תרגול פדיקור קוסמטי מלא (כולל עבודה עם מכשיר)',
          content: [
            { text: 'תרגול עיוני ויישום של פתולוגיות', icon: <Activity className={styles.contentIcon} /> },
            { text: 'שיוף עור יבש וקרני (כולל קריות רגליים)', icon: <Scissors className={styles.contentIcon} /> },
            { text: 'חיטוי והכנת כף הרגל', icon: <Shield className={styles.contentIcon} /> },
            { text: 'טיפול בציפורניים: גזירה, שיוף, ניקוי קפלים', icon: <PenTool className={styles.contentIcon} /> },
            { text: 'טיפול בעור: שיוף, פילינג, קרם, מסכה', icon: <Flower2 className={styles.contentIcon} /> },
            { text: 'תרגול על מודליסטית', icon: <Activity className={styles.contentIcon} /> }
          ]
        }
      ]
    },
    {
      id: 'gel-building',
      title: 'קורס השתלמות בנייה בג\'ל',
      subtitle: '2 מפגשים | פרונטלי | תרגול על מודליסטית',
      sessions: [
        {
          number: 1,
          title: 'תיאוריה מקצועית ותרגול מעשי',
          content: [
            { text: 'היכרות עם שיטת הטפסים הפופולרית בג\'ל', icon: <BookOpen className={styles.contentIcon} /> },
            { text: 'התאמת טופס לגודל הציפורן ובניית מבנה אנטומי', icon: <Target className={styles.contentIcon} /> },
            { text: 'עבודה עם ג\'לים שונים', icon: <Palette className={styles.contentIcon} /> },
            { text: 'פתרון תקלות ותיקונים נפוצים', icon: <Settings className={styles.contentIcon} /> },
            { text: 'הכנה נכונה של הציפורן לבנייה חדשה', icon: <PlayCircle className={styles.contentIcon} /> },
            { text: 'עבודה בג\'ל בנייה להנחת תשתית', icon: <Building className={styles.contentIcon} /> },
            { text: 'שיוף מדויק לבניית מבנה אדריכלי לפי תקן', icon: <Focus className={styles.contentIcon} /> },
            { text: 'עבודה עם תבניות מקצועיות', icon: <FileText className={styles.contentIcon} /> },
            { text: 'תרגול מבנים כמו: שבר עמוק / שבר קל', icon: <Activity className={styles.contentIcon} /> }
          ]
        },
        {
          number: 2,
          title: 'תיאוריה מתקדמת ותרגול מעשי',
          content: [
            { text: 'מתי יש צורך בחידוש ולא בבנייה', icon: <Lightbulb className={styles.contentIcon} /> },
            { text: 'הכנה לבנייה חוזרת, תיקון/השלמת שברים לפני הסרה', icon: <Settings className={styles.contentIcon} /> },
            { text: 'הסרה נכונה של חומר קיים', icon: <Scissors className={styles.contentIcon} /> },
            { text: 'בנייה מחדש בטפסים פתוחים – שלב אחרי שלב', icon: <Map className={styles.contentIcon} /> },
            { text: 'עבודה על 5–10 ציפורניים עם תכנון קו מבנה', icon: <PenTool className={styles.contentIcon} /> },
            { text: 'שיוף ועיצוב מדויק של הציפורן', icon: <Focus className={styles.contentIcon} /> },
            { text: 'פתרונות לתקלות נפוצות: שני ציפורניים, קו שבור, נשר / מתקלף / עקום / עובי לא אחיד / קימור שגוי / טיפס לא תואם', icon: <Search className={styles.contentIcon} /> }
          ]
        }
      ]
    },
    {
      id: 'advanced-gel',
      title: 'קורס השתלמות מורחבת מניקור לק ג\'ל',
      subtitle: '2 מפגשים | פרונטלי | תרגול על מודליסטית',
      sessions: [
        {
          number: 1,
          title: 'דיוק, ניקיון וחזרה מקיפה',
          content: [
            { text: 'ניהול תהליך עבודה שלם – איך מתחילים ומה סדר הפעולות הנכון', icon: <Map className={styles.contentIcon} /> },
            { text: 'תרגול חוזר על מבנה אנטומי', icon: <Building className={styles.contentIcon} /> },
            { text: 'סידור גורם – עיצוב צורה מחדש', icon: <Wand2 className={styles.contentIcon} /> },
            { text: 'הסרת ג\'ל וניקוי יסודי', icon: <Scissors className={styles.contentIcon} /> },
            { text: 'תרגול חיזוקי ג\'ל / מבנה אנטומי מדויק', icon: <Focus className={styles.contentIcon} /> },
            { text: 'בניית פרנץ\' בסיסי – שילוב קווים דקים וקפה', icon: <PenTool className={styles.contentIcon} /> },
            { text: 'מריחת ג\'ל גאומטרי', icon: <Palette className={styles.contentIcon} /> }
          ]
        },
        {
          number: 2,
          title: 'תרגול מריחה אומנותית מתקדם',
          content: [
            { text: 'בניית מריחה אומנותית מדויקת – שייכת ללקוחה ואיפה נכון למקם צבע', icon: <Brush className={styles.contentIcon} /> },
            { text: 'פתרון תקלות חוזרות בשיוף או בעיות עומק', icon: <Settings className={styles.contentIcon} /> },
            { text: 'מריחת צבע על ציפורן טבעית לפי גוון עור הלקוחה', icon: <Eye className={styles.contentIcon} /> },
            { text: 'סידור צבעים קונטרסטיים', icon: <Palette className={styles.contentIcon} /> },
            { text: 'עבודה לפי קו חיוך', icon: <Heart className={styles.contentIcon} /> },
            { text: 'תרגול עם לקוחות – סימולציות', icon: <Users className={styles.contentIcon} /> }
          ]
        }
      ]
    }
  ];

  const courseIncludes = [
    'תרגול מעשי על מודליסטיות לאורך כל הקורס',
    'תעודת השתתפות יוקרתית בסיום הקורס',
    'ליווי מקצועי גם לאחר הקורס לשאלות והתייעצות',
    'דגש על דיוק, ניקיון, מהירות ואסתטיקה',
    'מענה על טעויות נפוצות ושיפור ביטחון בעבודה'
  ];

  return (
 <>
      <div className={styles.wrapper}>
        <div className={styles.coursesContainer}>
          {courses.map((course, index) => (
            <div key={course.id} className={styles.courseCard}>
              <div 
                className={styles.courseHeader}
                onClick={() => toggleCourse(course.id)}
              >
                <div className={styles.courseHeaderContent}>
                  <h3 className={styles.courseTitle}>
                    {course.title}
                  </h3>
                  <p className={styles.courseSubtitle}>
                    {course.subtitle}
                  </p>
                  {course.description && (
                    <p className={styles.courseDescription}>
                      {course.description}
                    </p>
                  )}
                </div>
                
                <div className={`${styles.expandIcon} ${expandedCourses[course.id] ? styles.expandIconRotated : ''}`}>
                  <ChevronDown className={styles.chevronIcon} />
                </div>
              </div>

              <div className={`${styles.courseContent} ${expandedCourses[course.id] ? styles.courseContentExpanded : ''}`}>
                <div className={styles.courseContentInner}>
                  <div className={styles.sessionsContainer}>
                    {course.sessions.map((session) => (
                      <div key={session.number} className={styles.sessionCard}>
                        <div className={styles.sessionHeader}>
                          <div className={styles.sessionNumber}>
                            {session.number.toString().padStart(2, '0')}
                          </div>
                          <h4 className={styles.sessionTitle}>
                            {session.title}
                          </h4>
                        </div>
                        
                        <div className={styles.sessionContent}>
                          {session.content.map((item, idx) => (
                            <div key={idx} className={styles.contentItem}>
                              <div className={styles.contentIconWrapper}>
                                {item.icon}
                              </div>
                              <span className={styles.contentText}>
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.courseIncludesSection}>
                    <h4 className={styles.includesTitle}>
                      <Star className={styles.includesIcon} />
                      הקורס כולל:
                    </h4>
                    <div className={styles.includesList}>
                      {courseIncludes.map((item, idx) => (
                        <div key={idx} className={styles.includesItem}>
                          <CheckCircle className={styles.includesItemIcon} />
                          <span className={styles.includesText}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.registrationButtonContainer}>
                    <button 
                      className={styles.registrationButton}
                      onClick={() => openForm(course.title)}
                    >
                      <span className={styles.registrationText}>
                        אוראל, רוצה להירשם לקורס הזה!
                      </span>
                      <div className={styles.registrationIconWrapper}>
                        <ArrowDown className={styles.registrationIcon} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* טופס צף */}
      {isFormOpen && (
        <div className={styles.formOverlay} onClick={closeForm}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>בואי נדבר לגבי {selectedCourse}</h2>
              <button className={styles.formCloseButton} onClick={closeForm}>
                <X />
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
                  placeholder="ספרי לי קצת על עצמך ומה מעניין אותך בקורס"
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
  );
};

export default CoursesDrawer;