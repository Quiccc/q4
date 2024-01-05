import styles from './footer.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <div className="navbar-fixed-bottom d-inline-flex justify-content-center w-100 p-1" style={{ height: '150px', background:'#212529'}}>
      <img className="me-5 mt-3 mb-3 bg-secondary p-2 rounded" src="logo.jpg" />
      <div className="vr mt-1 mb-1" style={{ color: '#f5f5f5' }}></div>
      <div className="d-flex flex-column ms-5">
        <div className="my-auto mt-5">
          <div className='d-flex justify-content-between ms-4 me-4 mb-3'>
            <a href='#' style={{ color: '#f5f5f5' }}>
              <GitHubIcon />
            </a>
            <a href='https://www.linkedin.com/in/skagan4slan/' style={{ color: '#f5f5f5' }}>
              <LinkedInIcon />
            </a>
          </div>
          <p className={`${styles.footerText} ${'text-center'}`} style={{ color: '#f9f9f9', fontFamily:'Arial, Helvetica, sans-serif'}}>
            User Manager - 2024
          </p>
        </div>
      </div>
    </div>
  );
}
