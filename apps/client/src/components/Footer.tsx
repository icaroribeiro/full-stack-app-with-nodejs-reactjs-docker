import '../styles/Footer.css'

function Footer() {
  return (
    <footer>
      <div className="footer-div">
        <p className="copyright">
          © {new Date().getFullYear()} My Take-Home Assignment. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
