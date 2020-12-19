import { Link } from "@reach/router";
import React from "react";

const Header = ({ leagueName }) => {
  return (
    <header className="header">
      <div
        className="header__leagues"
        role="button"
        tabIndex="0"
        onFocus={(e) => {
          e.target.children[1] &&
            e.target.children[1].classList.toggle("dropdown--active");
        }}
      >
        <div id="selected">
          <span>{leagueName}</span>
          <i className="fas fa-caret-down"></i>
        </div>
        <div className="dropdown">
          <Link to="/premierleague/matches" className="dropdown__item">
            Premier League
          </Link>
          <Link to="/laliga/matches" className="dropdown__item">
            La Liga
          </Link>
          <Link to="/bundesliga/matches" className="dropdown__item">
            Bundesliga
          </Link>
          <Link to="/seriea/matches" className="dropdown__item">
            Serie A
          </Link>
          <Link to="/ligueun/matches" className="dropdown__item">
            Ligue 1
          </Link>
        </div>
      </div>
      <span id="author">
        by{" "}
        <a href="https://rahuldahal.com.np" target="_blank" rel="noreferrer">
          Rahul Dahal
        </a>
        <a href="https://twitter.com/raahuldaahal">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://github.com/rahuldahal">
          <i className="fab fa-github"></i>
        </a>
      </span>
    </header>
  );
};

export default Header;