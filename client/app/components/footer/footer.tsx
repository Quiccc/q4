import styles from './footer.module.css';
export default function Footer() {
    return (
        <div className={`${styles.footer} ${"navbar fixed-bottom"}`} style={{height:'150px'}}></div>
    )
}