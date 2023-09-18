import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";
import { selectPizzaData } from "../redux/pizza/selectors";
import { FetchParams } from "../redux/pizza/types";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  const onChangePage = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProp.replace("-", "");
    const order = sort.sortProp.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  // if params were changed and first render passed
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProp: sort.sortProp,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProp, searchValue, currentPage, navigate]);

  // if first render occurred, checking URL params and saving them to Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1),
      ) as unknown as FetchParams;
      const sort = sortList.find((obj) => obj.sortProp === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  // if first render occurred, fetch pizzas
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProp, searchValue, currentPage]);

  const pizzas = items.map((object: any) => (
    <PizzaBlock key={object.id} {...object} />
  ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryValue={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Sorry, error on the page <span>😕</span>
          </h2>
          <p>
            Unfortunately, there is a problem with pizzas fetching. <br />
            Please try again later.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
