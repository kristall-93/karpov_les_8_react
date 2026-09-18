import React from 'react';

export const MainArticle = ({ title, image, description, category, source }) => {
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