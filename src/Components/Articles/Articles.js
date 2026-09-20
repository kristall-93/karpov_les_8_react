import React from 'react';
import { categoryIds } from '../../utils.js';
import { MainArticle } from '../MainArticle/MainArticle.js';
import { SmallArticle } from '../SmallArticle/SmallArticle.js';
import './Articles.css';


export const Articles = ({articles, category}) => {  
  return (
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
  );
};