import React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const PizzaDescription: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    structure: string;
  }>();
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
        alert("Problem in pizza request!");
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
      <div className="pizza-full">
        <img src={pizza.imageUrl} alt="pizza" />
        <h2>
          {pizza.title} {pizza.price}$
        </h2>
        <h3>Structure:</h3>
        <p>{pizza.structure}</p>
        <Link to="/react-pizza" className="button button--outline">
          <span>Return back</span>
        </Link>
      </div>
    </div>
  );
};

export default PizzaDescription;
