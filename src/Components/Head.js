import React from 'react'
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import { useTheme } from "../utils/theme-context";
const Head = () => {
    const { theme, toggleTheme } = useTheme();
  return (
    <div className=' mx-8 mb-7 md:my-3 md:mx-4 fixed  top-0 right-0'>
          <div className="dark_mode relative left-30">
        <input
          className="  dark_mode_input"
          type="checkbox"
          id="darkmode-toggle"
          onChange={toggleTheme}
          checked={theme == "dark"}
        />
        <label className="dark_mode_label " htmlFor="darkmode-toggle">
          <Sun />
          <Moon   />
        </label>
      </div>
      </div>
  )
}

export default Head