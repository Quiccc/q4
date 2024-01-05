import styles from "./header.module.css";

// Header component. Simple header with a logo, title and some text.
export default function Header() {
  return (
    <div className={`${styles.header} ${"navbar-fixed-top"} ${"d-flex flex-column"}`}>
      <img className={`${styles.headerLogo} ${"mx-auto mt-5 mb-5"}`} src="logo.jpg" />
      <h1 className={`${styles.headerText} ${"navbar-fixed-top mb-5 text-wrap text-center mx-auto"}`}>Simple User Manager Powered by Go & Next.js</h1>
    <h2 className={`${styles.headerText} ${"navbar-fixed-top mb-5 text-wrap text-center mx-auto"}`} style={{ fontSize: '2rem' }}>Perform CRUD operations through a Next.js front-end by sending requests to a REST API.</h2>
    </div>
  );
}
