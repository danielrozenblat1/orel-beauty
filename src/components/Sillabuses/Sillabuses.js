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
          title: 'עיוני בלבד: יסודות + התחלה מקצועית',
          content: [
            { text: 'לימוד מעמיק על מבנה העור וסוגי בעיות: כוססת, נשריות, פטריות, שטוחות ועוד', icon: <Shield className={styles.contentIcon} /> },
            { text: 'היכרות עם מחלות ציפורניים והבדלים חשובים לטיפול בטוח ומקצועי', icon: <UserCheck className={styles.contentIcon} /> },
            { text: 'היכרות עם כל סוגי הראשים למכשיר שיוף - שימושים לפי צורך', icon: <Settings className={styles.contentIcon} /> },
            { text: 'סטריליזציה, חיטוי והיגיינה בטיפולים', icon: <Building className={styles.contentIcon} /> },
                  { text: 'ציוד חובה לעבודה נכונה', icon: <Building className={styles.contentIcon} /> },
            { text: 'פתיחת עסק פטור - שלבים פרקטיים להתחלה', icon: <Palette className={styles.contentIcon} /> }
          ]
        },
        {
          number: 2,
          title: 'מניקור יבש + מריחת ג׳ל ללא מבנה אנטומי',
          content: [
            { text: 'עבודה בטוחה עם מכונת שיוף', icon: <PenTool className={styles.contentIcon} /> },
            { text: 'הסרה נכונה של חומר הג׳ל', icon: <Focus className={styles.contentIcon} /> },
            { text: 'הכנת הציפורן ללא הג׳ל', icon: <Activity className={styles.contentIcon} /> },
               { text: 'תרגול מניקור יבש מלא על מודליסטית', icon: <Building className={styles.contentIcon} /> },
                  { text: 'תרגול מריחה מדוייקת ללא תיקון מבנה', icon: <Building className={styles.contentIcon} /> },
                     { text: 'התרגול מתבצע על מודליסטית', icon: <Building className={styles.contentIcon} /> },
            
          ]
        },
        {
          number: 3,
          title: 'התחלת תיקון מבנה אנטומי',
          content: [
            { text: 'מהו מניקור אנטומי ולמה הוא חשוב', icon: <Brush className={styles.contentIcon} /> },
            { text: 'שלבים ראשוניים בבניית מבנה בג׳ל', icon: <TrendingUp className={styles.contentIcon} /> },
                        { text: 'התאמה לסוגי ציפורניים שונים', icon: <TrendingUp className={styles.contentIcon} /> },
                                        { text: 'תרגול תיקון מבנה בסיסי', icon: <Activity className={styles.contentIcon} /> },
            { text: 'תרגול על מודליסטית', icon: <Activity className={styles.contentIcon} /> },

          ]
        },
        {
          number: 4,
          title: 'תיאוריה עסקית - ניהול תהליך עבודה + שיווק וסיום',
          content: [
            { text: 'תרגול מבנה מלא ומריחת צבע מקצועית', icon: <Wand2 className={styles.contentIcon} /> },
            { text: 'עיצובי ציפורניים : שקד עיגול ומרובע', icon: <Sparkles className={styles.contentIcon} /> },
            { text: 'השלמת הציפורן', icon: <MessageCircle className={styles.contentIcon} /> },
                      { text: 'צילום עבודות בצורה שיווקית', icon: <MessageCircle className={styles.contentIcon} /> },
            { text: 'חלוקת תעודות', icon: <Award className={styles.contentIcon} /> },
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
        { text: 'אבחון סוגי ציפורניים ובעיות נפוצות אצל לקוחות', icon: <Brain className={styles.contentIcon} /> },
        { text: 'עקרונות עבודה נכונה להחזקה מקסימלית של הג׳ל', icon: <Building className={styles.contentIcon} /> },
        { text: 'ניהול זמן נכון מול לקוחות ושמירה על סף סטרס נמוך', icon: <Gauge className={styles.contentIcon} /> },
        { text: 'טעויות נפוצות במריחה ובבניית מבנה - ואיך להימנע מהן', icon: <Search className={styles.contentIcon} /> }
      ]
    },
    {
      number: '02',
      title: 'עבודה מעשית',
      content: [
        { text: 'בניית מבנה אנטומי נכון - ליצירת עבודה עמידה ואסתטית', icon: <Building className={styles.contentIcon} /> },
        { text: 'מריחת לק ג׳ל מושלמת - ללא נזילות, כולל צביעה קרובה לקוטיקולה', icon: <Brush className={styles.contentIcon} /> },
        { text: 'שיוף מקצועי - עבודה מהירה ונקייה בלי לפגוע בציפורן הטבעית', icon: <Focus className={styles.contentIcon} /> },
        { text: 'פתרון בעיות נפוצות: התרוממות, שבירה וציפורניים חלשות', icon: <Settings className={styles.contentIcon} /> },
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
          title: 'מפגש ראשון עיוני + מעשי',
          content: [
            { text: 'הכנת העמדה - ציוד, כלים, חיטוי וארגון', icon: <BookOpen className={styles.contentIcon} /> },
            { text: 'הכנת כף הרגל - השרייה, חיטוי ובחירת החומרים הנכונים', icon: <Search className={styles.contentIcon} /> },
            { text: 'סידור עור - טיפול בעור קשה/סדקים קלים', icon: <Settings className={styles.contentIcon} /> },
            { text: 'הכנת הציפורן - מניקור לציפורניי הרגליים , שיוף ונקוי עדין של הקוטיקולה', icon: <Shield className={styles.contentIcon} /> },
            { text: 'עיסוי קצר לשיפור חווית הלקוחה', icon: <Eye className={styles.contentIcon} /> }
          ]
        },
        {
          number: 2,
          title: 'מפגש שני - מעשי מתקדם',
          content: [
            { text: 'פתיחה וניקוי מתקדם של הקוטיקולה', icon: <Activity className={styles.contentIcon} /> },
            { text: 'טיפול מדוייק בעור קשה ועקשן (עקב/כרית כף הרגל)', icon: <Scissors className={styles.contentIcon} /> },
            { text: 'עור מגורה ואדמומי - מה עושים ומה לא', icon: <Shield className={styles.contentIcon} /> },
            { text: 'טכניקת מריחה מדוייקת של לק ג׳ל', icon: <PenTool className={styles.contentIcon} /> },
            { text: 'שימוש באביזרים יעודיים להסרת עור (פצירות מקצועיות , כף פדיקור, חומרים מרככים)', icon: <Flower2 className={styles.contentIcon} /> },
          
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
      { text: 'הכרות עם שיטת הטיפסים ההפוכים ככלי תיקון מדויק', icon: <BookOpen className={styles.contentIcon} /> },
      { text: 'התאמת טיפס לגודל הציפורן ושמירה על צורתה', icon: <Target className={styles.contentIcon} /> },
      { text: 'יתרונות וחסרונות השיטה מול טכניקות אחרות', icon: <Palette className={styles.contentIcon} /> },
      { text: 'זיהוי סוגי שברים והתמודדות עם כל אחד', icon: <Settings className={styles.contentIcon} /> },
      { text: 'מתי בוחרים לתקן ומתי לבנות לבניית ציפורן חדש', icon: <PlayCircle className={styles.contentIcon} /> },
      { text: 'הכנה נכונה של הציפורן לבנייה חדשה', icon: <Building className={styles.contentIcon} /> },
      { text: 'בנייה בטיפס והנחה מקצועית', icon: <Focus className={styles.contentIcon} /> },
      { text: 'עבודה נקייה למניעת התרוממות או נזילות החומר', icon: <FileText className={styles.contentIcon} /> },
      { text: 'שיוף צורה וגימור הציפורן במבנה אדריכלי לפי תקני עבודה של טכנאית מקצועית', icon: <Activity className={styles.contentIcon} /> },
      { text: 'תרגול מצבי קצה: שבר עמוק / שבר צידי', icon: <AlertTriangle className={styles.contentIcon} /> }
    ]
        },
        {
          number: 2,
          title: 'תיאוריה מתקדמת ותרגול מעשי',
      content: [
  { text: 'מתי יש צורך בחידוש ולא במילוי', icon: <Lightbulb className={styles.contentIcon} /> },
  { text: 'שילוב נכון של הסרה חלקית/מלאה לפני בנייה חוזרת', icon: <Settings className={styles.contentIcon} /> },
  { text: 'התאמה של אורך, קימור וצורת ציפורן אחידה', icon: <PenTool className={styles.contentIcon} /> },
  { text: 'טיפים לעבודה מהירה מבלי לפגוע באיכות', icon: <TrendingUp className={styles.contentIcon} /> },
  { text: 'שמירה על היגיינה מקצועית בעת העבודה וטיפול בהתרוממויות', icon: <Shield className={styles.contentIcon} /> },
  { text: 'הסרה נכונה של חומר קיים', icon: <Scissors className={styles.contentIcon} /> },
  { text: 'בנייה מחדש בטיפסים הפוכים - שלב אחר שלב', icon: <Map className={styles.contentIcon} /> },
  { text: 'עבודה על 5-10 ציפורניים עם תכנון מבנה', icon: <Focus className={styles.contentIcon} /> },
  { text: 'שיוף ועיצוב מדויק של הציפורן', icon: <Focus className={styles.contentIcon} /> },
  { text: 'פתרונות לבעיות נפוצות: שינוי מבנה קיים כגון נשרי / מקפצה / עובי לא אחיד / קימור שגוי / טיפס לא תואם', icon: <Search className={styles.contentIcon} /> }
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
          title: 'דיוק, תיקונים והכנה מתקדמת',
          content: [
            { text: 'ניתוח טעויות נפוצות של מתחילות ואיך מתקנים אותן', icon: <Map className={styles.contentIcon} /> },
            { text: 'עבודה נכונה עם מכונת שיוף', icon: <Building className={styles.contentIcon} /> },
            { text: 'סידור עור מניקור נקי ולא פולשני', icon: <Wand2 className={styles.contentIcon} /> },
            { text: 'הכנת הציפורן- ניקוי, קיצור ועיבוד נכון לקליטת החומר', icon: <Scissors className={styles.contentIcon} /> },
            { text: 'הסרת חומר ישן מבלי לפגוע בציפורן', icon: <Focus className={styles.contentIcon} /> },
            { text: 'יצירת מבנה אנטומי בסיסי - איזון נכון של גובה צורה ונפח', icon: <PenTool className={styles.contentIcon} /> },
            { text: 'תרגול מבנה אליפטי', icon: <Palette className={styles.contentIcon} /> }
          ]
        },
        {
          number: 2,
          title: 'תרגול מריחה אומנותית מתקדם',
          content: [
            { text: 'יצירת מבנה אנטומי מדויק - שמירה על סימטריה וגובה נכון', icon: <Brush className={styles.contentIcon} /> },
            { text: 'שיפור מהירות העבודה ושמירה על רמת גימור גבוהה', icon: <Settings className={styles.contentIcon} /> },
            { text: 'תרגול עבודה מלאה מההכנה ועד לגימור הסופי על מודליסטית', icon: <Eye className={styles.contentIcon} /> },
            { text: 'התמודדות עם בעיות : כוססות, ציפורניים נשריות, אי סימטריה', icon: <Palette className={styles.contentIcon} /> },
            { text: 'טיפים מקצועיים להתנהלות מול לקוחה - שירות, צילום העבודה, תמחור', icon: <Heart className={styles.contentIcon} /> },
        
          ]
        }
      ]
    }
  ];

  const courseIncludes = [
  'תרגול מעשי לאורך הקורס',
    'תעודת השתתפות יוקרתית בסיום הקורס',
    'ליווי מקצועי גם לאחר הקורס לשאלות והתייעצות',
    'דגש על דיוק, ניקיון מהירות ואסתטיקה',
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