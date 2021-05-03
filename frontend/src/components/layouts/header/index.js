import Nav from "./nav"
import { isEmpty } from 'lodash'

const Header = ({ header, headerMenus }) => {

  if ( isEmpty(headerMenus)) {
    return null
  }
  console.warn('NAV headerMenus', headerMenus)

  return (
    <header>
      <Nav header={header} headerMenus={headerMenus}  />
    </header>
  )
}

export default Header