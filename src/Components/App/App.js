import React from 'react';
import { Navigation } from "../Navigation/Navigation.js";
import { Articles } from "../Articles/Articles.js";
import './App.css';
import news from '../../news.json'

export const App = () => {
  const [category, setCategory] = React.useState("index"); // стейт для текущей выбранной категории
  const [articles, setArticles] = React.useState({
    items: [],
    categories: [],
    sources: [],
  }); // стейт для хранения статей

  const onNavClick = (e) => {
    e.preventDefault();

    setCategory(e.currentTarget.dataset.href);
  };

  React.useEffect(() => {
    // fetch("./news.json")
    fetch(news)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setArticles(response);
      });
  }, [category]);

  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <Navigation
            placement="header"
            className="header__navigation"
            onNavClick={onNavClick}
            currentCategory={category}
          />
        </div>
      </header>
      <main className="main">
        <Articles articles={articles} category={category} />
      </main>
      <footer className="footer">
        <div className="container">
          <Navigation
            placement="footer"
            className="footer__navigation"
            onNavClick={onNavClick}
            currentCategory={category}
          />

          <div className="footer__column">
            <p className="footer__text">
              Сделано на Frontend курсе в{" "}
              <a
                href="https://karpov.courses/frontend"
                className="footer__link"
                target="_blank"
              >
                Спорт.Courses
              </a>
            </p>
            <p className="footer__copyright">© 2021</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
