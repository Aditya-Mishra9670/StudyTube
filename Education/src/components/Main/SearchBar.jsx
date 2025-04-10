import { X } from 'lucide-react'
import React from 'react'

const SearchBar = ({ isOpen, isClose }) => {
  return (
    <div
      className={`fixed top-[69px] left-0 right-0 mx-auto  w-full ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      } transition-all duration-300  bg-base-100/90  items-start rounded-b-lg p-2 z-50`}
    >
      <input
        type="text"
        className="w-full  border-2 border-base-300 rounded-full px-4 py-2 text-white placeholder-white focus:outline-none"
        placeholder="Search..."
      />
      <X className='m-2' onClick={isClose}/>
    </div>
  )
}

export default SearchBar
