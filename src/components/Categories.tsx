import React from "react";

type CategoriesProps = {
  categoryValue: number;
  onChangeCategory: any;
};
const Categories: React.FC<CategoriesProps> = ({
  categoryValue,
  onChangeCategory,
}) => {
  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

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
