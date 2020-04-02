import React from "react";
import { withRouter } from "react-router-dom";
import logout from "../../logic/logout";
import "./NavBar.sass";

function SearchCrypto({ handleSearch, history, user: { username } }) {
  const handleClick = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".navLinks");
    const navButtons = document.querySelectorAll(".navLinks li");

    // console.log('this is:', this);
    nav.classList.toggle("nav-active");

    navButtons.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinksFade 0.5s ease forwards ${index / 7 +
          0.5}s`;
      }
    });
    burger.classList.toggle("toggle");
  };

  const handleOnSubmit = event => {
    event.preventDefault();

    const query = event.target.query.value;

    if (query === "") return;

    handleSearch(query);
    // console.log(query)
  };

  return (
    <div className="nav">
      <link
        href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
        rel="stylesheet"
      ></link>
      <div className="logo">
        <h4>CRYPTO-STATE</h4>
      </div>

      <form className="nav-Search" onSubmit={handleOnSubmit}>
        <input type="text" name="query" placeholder="criteria" />
        <button type="submit">Search</button>
      </form>

      <ul className="navLinks">
        {!username && (
          <>
            <li>
              <span onClick={() => history.push("/login")}>Login</span>
            </li>
            <li>
              <span onClick={() => history.push("/register")}>register</span>
            </li>
          </>
        )}

        {username && (
          <>
            <li>
              <span onClick={() => history.push("/state")}>State</span>
            </li>

            <li>
              <span onClick={() => history.push("/news")}>News</span>
            </li>

            <li>
              <span className="" onClick={logout}>
                Logout
              </span>
            </li>
          </>
        )}
      </ul>

      <div className="burger" onClick={handleClick}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </div>
  );
}

export default withRouter(SearchCrypto);
