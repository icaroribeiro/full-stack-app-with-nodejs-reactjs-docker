import { navbarItems } from '../constants'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navbarItems.map((item) => {
          return (
            <li className="nav-item">
              <Link to={item.url}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
