import React from 'react';
import { categoryNames } from './utils.js';

export const Navigation = ({ onNavClick, currentCategory, className = "", placement="header" }) => {
  return (
    <nav className={`navigation grid navigation--${placement} ${className}`}>
      <a className="navigation__logo" data-href="index" href="#">
        <img
          className="navigation__image"
          src="./images/logo.svg"
          alt="Логотип"
        />
      </a>
      <ul className="navigation__list">
        {["index", "fashion", "tech", "politics", "sport"].map((item) => {
          return (
            <li className="navigation__item" key={item}>
              <a
                onClick={onNavClick}
                href="#"
                className={`navigation__link ${currentCategory === item ? "navigation__link--active" : ""}`}
                data-href={item}
              >
                {categoryNames[item]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};