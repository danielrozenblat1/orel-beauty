import styles from "./SecondScreen.module.css"
import nails from "../icons/wired-outline-1596-nails-hover-pinch (1).json"
import  IconTextComponent from "../components/can/Can"
import SmallBox from "../components/SmallBox/SmallBox"
import { BenefitsContainer } from "../components/benefitsHistalmut/BenefitHishtalmut"
import dictionary from "../icons/wired-outline-3140-book-open-hover-pinch.json"
import crowd from "../icons/wired-outline-273-three-female-avatars-hover-nodding.json"
const SecondScreen=()=>{
return <>

    <div className={styles.title}>בואי נדבר תכלס</div>
<div className={styles.description}>את כאן כי יש לך אהבה בלתי מוסברת לתחום הציפורניים ואולי גם שקלת בעבר להתחיל ללמוד את התחום ו..</div>
<BenefitsContainer/>
<div className={styles.title}>אבל עד היום זה תמיד התפספס.. כי</div>
<div className={styles.row}>

    <IconTextComponent
 text="לא ידעת אם את מספיק טובה כדי למלא יומן ולעסוק בתחום"
  icon={dictionary}
/>

    <IconTextComponent
  text="פחדת שהשוק תחרותי מדי ולא תצליחי להתבלט בו "
  icon={nails}
/>

    <IconTextComponent
   text="לא רצית ללמוד בקבוצה גדולה ולהבלע בין כולן"
  icon={crowd}
/>
</div>
<div className={styles.description}>ואני מבינה אותך כל כך טוב מסיבה אחת פשוטה</div>
<div className={styles.title}>הייתי בדיוק במקום שלך!</div>

</>


}
export default SecondScreen