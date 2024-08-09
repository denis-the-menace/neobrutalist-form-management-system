import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LanguageSwitchButton from "./LanguageSwitchButton";
import ThemeSwitchButton from "./ThemeSwitchButton";
import UserDropdownMenu from "./UserDropdownMenu";

export default function Navbar() {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="bg-primary-light font-bold tracking-wider flex justify-center items-center gap-8 px-4 py-2 border-primary-dark border-b-2">
      <img src="obss_logo.png" alt="obss_logo" className="h-10" />
      <LanguageSwitchButton />
      <nav>
        <div className="flex flex-row items-center">
          <ul className="text-primary-dark flex flex-row items-center gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "underline decoration-2"
                    : "hover:underline decoration-2"
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
                    isActive
                      ? "underline decoration-2"
                      : "hover:underline decoration-2"
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
                    isActive
                      ? "underline decoration-2"
                      : "hover:underline decoration-2"
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
                      isActive
                        ? "underline decoration-2"
                        : "hover:underline decoration-2"
                    }
                  >
                    {t("navbar.users")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                      isActive
                        ? "underline decoration-2"
                        : "hover:underline decoration-2"
                    }
                  >
                    {t("navbar.reports")}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <ThemeSwitchButton />
      {userInfo && <UserDropdownMenu />}
    </header>
  );
}
