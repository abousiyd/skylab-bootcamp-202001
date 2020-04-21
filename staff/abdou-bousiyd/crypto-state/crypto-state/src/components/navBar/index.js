import React from "react";
import { withRouter } from "react-router-dom";
import context from '../../logic/context';
import "./NavBar.sass";

function SearchCrypto({ handleSearch, history, user: { username } }) {
  const handleClick = () => {
    const burger = document.querySelector('.top-bar__burger')
    const nav = document.querySelector('.top-bar__links')
    const navButtons = document.querySelectorAll('.top-bar__links li')

    nav.classList.toggle("nav-active");

    navButtons.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinksFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }
    });
    burger.classList.toggle('top-bar__burger__item--toggle')
  };

  const handleOnSubmit = event => {
    event.preventDefault();

    const query = event.target.query.value;

    if (query === "") return;

    handleSearch(query);
  };

  return (
    <nav className="top-bar">
      <h4 className="top-bar__logo">CRYPTO-STATE</h4>

      <form className="top-bar__form" onSubmit={handleOnSubmit}>
        <input className="top-bar__form__input" type="text" name="query" placeholder="criteria" />
        <button className="top-bar__form__button" type="submit">Search</button>
      </form>

      <ul className="top-bar__links">
        {!username && (
          <>
            <li className="top-bar__links__item" onClick={() => history.push("/login")}>
              Login
            </li>
            <li className="top-bar__links__item" onClick={() => history.push("/register")}>
              register
            </li>
          </>
        )}

        {username && (
          <>
            <li className="top-bar__links__item" onClick={() => history.push("/state")}>
              State
            </li>

            <li className="top-bar__links__item"  onClick={() => history.push("/news")}>
              News
            </li>

            <li className="top-bar__links__item" onClick={() => history.push("/profile")}>
              Profile
            </li>

            <li className="top-bar__links__item" onClick={() => context.logout()}>
                Logout
            </li>
          </>
        )}
      </ul>
      
      <div className="top-bar__burger" onClick={handleClick}>
          <div className="top-bar__burger__item top-bar__burger__item--line1"></div>
          <div className="top-bar__burger__item top-bar__burger__item--line2"></div>
          <div className="top-bar__burger__item top-bar__burger__item--line3"></div>
      </div>
    </nav>
  );
}

export default withRouter(SearchCrypto);
