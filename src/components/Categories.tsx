import React from "react";

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

type CategoriesProps = {
  categoryValue: number;
  onChangeCategory: (index: number) => void;
};
const Categories: React.FC<CategoriesProps> = ({
  categoryValue,
  onChangeCategory,
}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={category}
              onClick={() => onChangeCategory(index)}
              className={categoryValue === index ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
