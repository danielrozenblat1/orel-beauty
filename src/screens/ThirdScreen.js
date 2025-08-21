import Button from "../components/button/Button"
import Shorts from "../components/shorts/Shorts"
import styles from "./ThirdScreen.module.css"
const ThirdScreen=()=>{


    return <>
    <div className={styles.title}>איך הקורסים איתי נראים?</div>
    <div className={styles.description}>כל הקורסים בנויים בצורה שכל תלמידה שלי מקבלת יחס אינטימי, אני ממש לידך, צעד אחר צעד בכל שלב בדרך.. זה נראה ככה:</div>
    <Shorts/>
    <Button text="אוראל, בואי נדבר!"/>
    </>
}
export default ThirdScreen