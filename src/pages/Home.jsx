import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "popular",
    sortProp: "rating",
  });

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProp.replace("-", "");
    const order = sortType.sortProp.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    fetch(
      `https://64eee824219b3e2873c39a29.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((response) => response.json())
      .then((array) => {
        setItems(array);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryValue={categoryId}
          onChangeCategory={(index) => setCategoryId(index)}
        />
        <Sort
          sortValue={sortType}
          onChangeSort={(index) => setSortType(index)}
        />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((object) => <PizzaBlock key={object.id} {...object} />)}
      </div>
    </div>
  );
};
