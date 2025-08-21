
import Bonus from "../components/bonuses/Bonus"
import Button from "../components/button/Button"
import CoursesDrawer from "../components/Sillabuses/Sillabuses"
import styles from "./FifthScreen.module.css"
const FifthScreen=()=>{


    return <>
    <div className={styles.title}>השינוי המשמעותי שעברתי גרם לי להבין</div>
    <div className={styles.description}>שמספיקה החלטה אחת אמיצה <strong>כדי לשנות חיים שלמים</strong> ואם אני שיניתי את החיים שלי מקצה לקצה</div>
      <div className={styles.title}>אז גם את יכולה!</div>
<div className={styles.description}>וזו הסיבה שהכנתי כמה מסלולים כדי לסלול את הדרך שלך לעולם הביוטי בצורה שהכי מתאימה לך, לחצי על כל קורס כדי לפתוח את הפירוט המלא עליו </div>
    <CoursesDrawer/>
    <div className={styles.description}>ולא משנה באיזה מסלול תבחרי ללכת איתי</div>
    <div className={styles.title}>כל הקורסים כוללים:</div>
    <Bonus />
<Button text="לחצי כאן לבירור לגבי הקורסים"/>
    </>
}
export default FifthScreen