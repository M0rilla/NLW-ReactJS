import { useTheme } from "../../hooks/useTheme"

import './styles.scss'

export function Theme() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <>
      <div className="btn-container">
        <div onClick={toggleTheme} className={`toggle-btn ${theme === 'dark' ? 'active' : ''}`}>
          <div className="inner-circle"></div>
        </div>
	      {/* <input onClick={toggleTheme} className="theme-btn" type="checkbox" id="toggle"/>	 
	      <label htmlFor="toggle"></label> */}
      </div>
    </>
  )};