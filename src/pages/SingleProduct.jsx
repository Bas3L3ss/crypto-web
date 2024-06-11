import axios from "axios";
import React from "react";
import { useLoaderData, useNavigation } from "react-router";
import { Link } from "react-router-dom";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      const resp = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      return resp;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const resp = await queryClient.fetchQuery(
      singleProductQuery(params.id).queryKey,
      singleProductQuery(params.id).queryFn
    );

    return { coin: resp.data };
  };

const SingleProduct = () => {
  const { coin } = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (!coin) {
    return (
      <div className="coinPage-Container">
        <div className="coinPage-Info">
          <h1>Please research more, we cannot find this type of crypto</h1>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="coinPage-Container">
        <div className="coinPage-Info">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="coinPage-Container">
      <div className="coinPage-Info">
        <h1>{coin.name}</h1>
        <img src={coin.image.large} alt="Icon" className="coinPage-Icon" />
        <div className="coinPage-Data">
          <div className="coinPage-Row">
            <h3 className="coinPage-RowHeader">Symbol:</h3>
            <h3 className="coinPage-RowData">{coin.symbol}</h3>
          </div>
          <div className="coinPage-Row">
            <h3 className="coinPage-RowHeader">Current Price:</h3>
            <h3 className="coinPage-RowData">
              $ {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
          </div>
          <div className="coinPage-Row">
            <h3 className="coinPage-RowHeader">Market Cap:</h3>
            <h3 className="coinPage-RowData">
              $ {coin.market_data.market_cap.usd.toLocaleString()}
            </h3>
          </div>
          <div className="coinPage-Row">
            <h3 className="coinPage-RowHeader">Total Volume:</h3>
            <h3 className="coinPage-RowData">
              $ {coin.market_data.total_volume.usd.toLocaleString()}
            </h3>
          </div>
          <div className="coinPage-Row">
            <h3 className="coinPage-RowHeader">24hr High:</h3>
            <h3 className="coinPage-RowData green">
              $ {coin.market_data.high_24h.usd.toLocaleString()}
            </h3>
          </div>
          <div className="coinPage-Row">
            <h3 className="coinPage-RowHeader">24hr Low:</h3>
            <h3 className="coinPage-RowData red">
              $ {coin.market_data.low_24h.usd.toLocaleString()}
            </h3>
          </div>
        </div>
        <Link to="/">
          <div className="coinPage-RouteButton">Go back</div>
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
