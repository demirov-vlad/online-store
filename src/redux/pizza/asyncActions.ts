import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchParams, Pizza } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], FetchParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://64eee824219b3e2873c39a29.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
    );
    return data;
  },
);
