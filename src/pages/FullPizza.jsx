import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://64eee824219b3e2873c39a29.mockapi.io/items/" + id,
        );
        setPizza(data);
      } catch (error) {
        alert("Fetching pizza problem!");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return "Loading...";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} $</h4>
    </div>
  );
};

export default FullPizza;
