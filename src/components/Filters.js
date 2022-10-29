import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: {
      text,
      categories,
      companies,
      colors,
      minPrice,
      maxPrice,
      price,
      shipping,
    },
    updateFilters,
    clearFilters,
    allProducts,
  } = useFilterContext();

  const allCategories = getUniqueValues(allProducts, "category");
  const allCompanies = getUniqueValues(allProducts, "company");
  const allColors = getUniqueValues(allProducts, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Search Text */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              value={text}
              onChange={updateFilters}
              placeholder="Search Products"
              className="search-input"
            />
          </div>
          {/* End of Search Text */}
          {/* Product Category */}
          <div className="form-control">
            <h5>Categories</h5>
            {allCategories.map((category, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  name="categories"
                  onClick={updateFilters}
                  className={
                    categories === category.toLowerCase() ? "active" : null
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>
          {/* Product Category */}
          {/* Company */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              name="companies"
              className="company"
              value={companies}
              onChange={updateFilters}
            >
              {allCompanies.map((company, index) => {
                return (
                  <option value={company} key={index}>
                    {company}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Company */}
          {/* Color */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {allColors.map((color, index) => {
                if (color === "all") {
                  return (
                    <button
                      name="colors"
                      onClick={updateFilters}
                      data-colors="ll"
                      className={`${
                        colors === "all" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      all
                    </button>
                  );
                }

                return (
                  <button
                    type="button"
                    key={index}
                    name="colors"
                    style={{ background: color }}
                    className={
                      colors === color ? "color-btn active" : "color-btn"
                    }
                    data-colors={color}
                    onClick={updateFilters}
                  >
                    {colors === color ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* End of Color */}
          {/* Price */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={updateFilters}
            />
          </div>
          {/* End of Price */}
          {/* Shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">Free Shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
          {/* End of Shipping */}
        </form>
        <button className="clear-btn" type="button" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
