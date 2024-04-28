import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={classes.navbar}>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navItem
        }
        end
      >
        <ion-icon name="home-outline"></ion-icon>
        Dashboard
      </NavLink>
      <NavLink
        to="/user"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navItem
        }
      >
        <ion-icon name="person-circle-outline"></ion-icon>
        Người dùng
      </NavLink>
      <NavLink
        to="/category"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navItem
        }
      >
        <ion-icon name="layers-outline"></ion-icon>
        Danh mục
      </NavLink>
      <NavLink
        to="/song"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navItem
        }
      >
        <ion-icon name="play-circle-outline"></ion-icon>
        Bài Hát
      </NavLink>
      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navItem
        }
      >
        <ion-icon name="images-outline"></ion-icon>
        New Song
      </NavLink>
    </div>
  );
}
export default Navbar;
