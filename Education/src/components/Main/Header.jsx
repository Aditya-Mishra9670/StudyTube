import { Bell, Lock, Menu, Search, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar, MenuC } from "../index";
import { useAuthStore } from "../../store/useAuthStore";

const Header = () => {
  const {user} = useAuthStore();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="navbar fixed top-0 z-40 w-full bg-base-100/70 backdrop-blur-xl shadow-lg">
      <div className="navbar-start">
        <div
          tabIndex={0}
          role="button"
          className=" btn btn-ghost btn-circle  ml-5"
        >
          <Link to="/" className="absolute">
            <img
              src="./Logo.png"
              alt="Logo"
              className="size-20 object-cover"
            />
          </Link>
        </div>
      </div>

      <div className="navbar-end flex items-center gap-4">
        <button
          className="btn btn-sm gap-2 transition-colors"
          onClick={() => {
            setShowSearchBar(!showSearchBar);
            setOpenMenu(false);
          }}
        >
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Search</span>
        </button>

        {user && (
          <Link
            to="/notifications"
            className="btn btn-sm gap-2 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="hidden sm:inline">Notifications</span>
          </Link>
        )}

        {user ? (
          <button
            className="btn btn-sm gap-2 transition-colors"
            onClick={() => {
              setOpenMenu(!openMenu);
              setShowSearchBar(false);
            }}
          >
            {!openMenu && <Menu className="w-5 h-5" />}
            {openMenu && <X className="w-5 h-5" />}
            <span className="hidden sm:inline">Menu</span>
          </button>
        ) : (
          <Link to="/login" className="btn btn-sm gap-2 transition-colors">
            <Lock className="w-5 h-5" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        )}
      </div>

      {user && <MenuC isOpen={openMenu} isClose={() => setOpenMenu(false)} />}
      <SearchBar
        isOpen={showSearchBar}
        isClose={() => setShowSearchBar(false)}
      />
    </div>
  );
};

export default Header;
