import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import CoinsDisplay from "../components/CoinsDisplay";

const productionUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

const allProductQuery = () => {
  return {
    queryKey: ["products"],
    queryFn: async () => {
      const resp = await axios.get(productionUrl);
      return resp.data;
    },
  };
};

export const loader = (queryClient) => async () => {
  try {
    const response = await queryClient.fetchQuery(
      allProductQuery().queryKey,
      allProductQuery().queryFn
    );

    return { products: response };
  } catch (error) {
    console.log(error);
  }
};

const Products = () => {
  const { products } = useLoaderData();
  const [value, setValue] = useState("");
  const [filteredCoins, setFilteredCoins] = useState();
  useEffect(() => {
    const searchCoins = products.filter((coin) =>
      coin.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCoins(searchCoins);
  }, [value]);
  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  const finalCoins = filteredCoins || products;
  return (
    <>
      <h1 className="header">Welcome to base - crypto tracker</h1>
      <div className="form">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          name="search"
          id="search"
          value={value}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="products">
        <CoinsDisplay finalCoins={finalCoins} />
      </div>
    </>
  );
};

export default Products;
