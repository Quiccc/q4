import styles from './header.module.css';

export default function Header(){
    return (
    <div className={`${styles.header} ${"navbar-fixed-top"}`} style={{height:'300px'}}></div>
    )
}