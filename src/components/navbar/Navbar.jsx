import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LanguageSwitchButton from "./LanguageSwitchButton";
import ThemeSwitchButton from "./ThemeSwitchButton";
import UserDropdownMenu from "./UserDropdownMenu";

export default function Navbar() {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary-light font-bold tracking-wider flex justify-center items-center px-4 py-2 border-primary-dark border-b-2">
      <div className="flex items-center gap-8">
        {theme === "light" ? (
          <img src="obss_logo_light.png" alt="obss_logo_light" className="h-10" />
        ) : (
          <img src="obss_logo_dark.png" alt="obss_logo_dark" className="h-10" />
        )}
        <LanguageSwitchButton />
      </div>
      <nav className="hidden lg:block">
        <ul className="text-primary-dark flex flex-row items-center gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline decoration-2" : "hover:underline decoration-2"
              }
              end
            >
              {t("navbar.home")}
            </NavLink>
          </li>
          {!userInfo && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "underline decoration-2" : "hover:underline decoration-2"
                }
              >
                {t("navbar.login")}
              </NavLink>
            </li>
          )}
          {userInfo && (
            <li>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  isActive ? "underline decoration-2" : "hover:underline decoration-2"
                }
              >
                {t("navbar.messages")}
              </NavLink>
            </li>
          )}
          {userInfo && userInfo.role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive ? "underline decoration-2" : "hover:underline decoration-2"
                  }
                >
                  {t("navbar.users")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports"
                  className={({ isActive }) =>
                    isActive ? "underline decoration-2" : "hover:underline decoration-2"
                  }
                >
                  {t("navbar.reports")}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <ThemeSwitchButton />
        {userInfo && <UserDropdownMenu />}
        <button
          className="lg:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6 text-primary-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="z-50 lg:hidden absolute top-16 left-0 right-0 bg-primary-light border-t border-primary-dark">
          <ul className="flex flex-col items-center gap-4 py-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "underline decoration-2" : "hover:underline decoration-2"
                }
                end
                onClick={toggleMenu}
              >
                {t("navbar.home")}
              </NavLink>
            </li>
            {!userInfo && (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "underline decoration-2" : "hover:underline decoration-2"
                  }
                  onClick={toggleMenu}
                >
                  {t("navbar.login")}
                </NavLink>
              </li>
            )}
            {userInfo && (
              <li>
                <NavLink
                  to="/messages"
                  className={({ isActive }) =>
                    isActive ? "underline decoration-2" : "hover:underline decoration-2"
                  }
                  onClick={toggleMenu}
                >
                  {t("navbar.messages")}
                </NavLink>
              </li>
            )}
            {userInfo && userInfo.role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      isActive ? "underline decoration-2" : "hover:underline decoration-2"
                    }
                    onClick={toggleMenu}
                  >
                    {t("navbar.users")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                      isActive ? "underline decoration-2" : "hover:underline decoration-2"
                    }
                    onClick={toggleMenu}
                  >
                    {t("navbar.reports")}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

