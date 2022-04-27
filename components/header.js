import Image from "next/image"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import HeaderLink from "./HeaderLink"
import GroupIcon from "@mui/icons-material/Group"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import ChatIcon from "@mui/icons-material/Chat"
import NotificationsIcon from "@mui/icons-material/Notifications"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined"
import { Avatar } from "@mui/material"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { signOut, useSession } from "next-auth/react"

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
}
function Header() {
  const { data: session } = useSession()

  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme, theme } = useTheme()
  // accessing theme after mounting
  useEffect(() => {
    setMounted(true)
    console.log(theme)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
      {/* left side */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1200px-LinkedIn_Logo.svg.png"
          layout="fill"
          width={200}
        />
        <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="search"
            className="hidden md:inline-flex bg-transparent focus:outline-none 
            placeholder-black/70 black:placeholder-white/70 flex-grow"
          />
        </div>
      </div>
      {/* right */}
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="Network" feed hidden />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink
          Icon={Avatar}
          text={session?.user?.name.split(" ")[0]}
          src={session?.user?.image}
          feed
          avatar
          hidden
        />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />
        {/* toggle for dark mode */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              resolvedTheme === "light" ? "justify-end" : "justify-start"
            }`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="absolute left-0">🌜</span>
            <motion.div
              className="w-5 h-5 bg-white rounded-full z-40"
              layout
              transition={spring}
            ></motion.div>
            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
