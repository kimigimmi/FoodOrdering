import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";
import "../styles/Navbar.css";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    await dispatch(logout());
  };

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand">FoodOrdering</Link>

        <button
          className="nav__burger"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>

        <nav className={`nav__links ${open ? "is-open" : ""}`}>
          <NavLink to="/" end className="nav__link">Home</NavLink>
          <NavLink to="/menu" className="nav__link">Menu</NavLink>
          <NavLink to="/about" className="nav__link">About</NavLink>
          <NavLink to="/comments" className="nav__link">Comments</NavLink>
        </nav>

        <div className="nav__auth">
          {user ? (
            <>
              <span className="nav__user">{user.email}</span>
              <button className="nav__btn" onClick={onLogout}>Sign out</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav__btn nav__btn--ghost">Sign in</NavLink>
              <NavLink to="/register" className="nav__btn">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
