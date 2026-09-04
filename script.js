const categoryIds = {
  index: 5,
  fashion: 3,
  tech: 1,
  politics: 4,
  sport: 2,
};

const categoryNames = {
  index: "Главная",
  fashion: "Мода",
  tech: "Технологии",
  politics: "Политика",
  sport: "Спорт",
};

const MainArticle = ({ title, image, description, category, source }) => {
  return (
    <article className="main-article" key={title}>
      <div className="main-article__image-container">
        <img className="main-article__image" src={image} alt="Фото новости" />
      </div>
      <div className="main-article__content">
        <span className="article-category main-article__category">
          {category}
        </span>
        <h2 className="main-article__title">{title}</h2>
        <p className="main-article__text">{description}</p>
        <span className="article-source main-article__source">{source}</span>
      </div>
    </article>
  );
};

const SmallArticle = ({ title, date, source }) => {
  return (
    <article className="small-article">
      <h2 className="small-article__title">{title}</h2>
      <p className="small-article__caption">
        <span className="article-date small-article__date">
          {new Date(date).toLocaleDateString("ru-RU", {
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="article-source small-article__source">{source}</span>
      </p>
    </article>
  );
};

const Navigation = ({ onNavClick, currentCategory, className = "" }) => {
  return (
    <nav className={`navigation grid ${className}`}>
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

const App = () => {
  const [category, setCategory] = React.useState("index"); // стейт для текущей выбранной категории
  const [articles, setArticles] = React.useState({
    items: [],
    categories: [],
    sources: [],
  }); // стейт для хранения статей

  onNavClick = (e) => {
    e.preventDefault();

    setCategory(e.currentTarget.dataset.href);
  };

  React.useEffect(() => {
    fetch("./news.json")
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
            className="header__navigation"
            onNavClick={onNavClick}
            currentCategory={category}
          />
        </div>
      </header>
      <main className="main">
        <section className="articles">
          <div className="container grid">
            <section className="articles__big-column">
              {/* {articles.items.slice(0, 3).map((item) => { */}
              {articles.items
                .filter((item) => item.category_id === categoryIds[category])
                .map((item) => {
                  return (
                    <MainArticle
                      key={item.title}
                      title={item.title}
                      image={item.image}
                      description={item.description}
                      category={
                        articles.categories.find(
                          ({ id }) => item.category_id === id,
                        ).name
                      }
                      source={
                        articles.sources.find(
                          (source) => source.id === item.source_id,
                        ).name
                      }
                    />
                  );
                })}
            </section>
            <section className="articles__small-column">
              {/* {articles.items.slice(0, 3).map((item) => { */}
              {articles.items
                .filter((item) => item.category_id === categoryIds[category])
                .slice(0, 3)
                .map((item) => {
                  return (
                    <SmallArticle
                      key={item.title}
                      title={item.title}
                      date={item.date}
                      source={
                        articles.sources.find(
                          (source) => source.id === item.source_id,
                        ).name
                      }
                    />
                  );
                })}
            </section>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <Navigation
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

ReactDOM.render(<App />, document.getElementById("root"));
