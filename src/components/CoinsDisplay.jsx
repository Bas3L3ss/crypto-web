import React from "react";
import Coin from "./Coin";

const CoinsDisplay = ({ finalCoins }) => {
  if (finalCoins.length < 1) {
    return (
      <div className="coinContainer">
        <div className="coinRow">
          <h1>Cannot find</h1>
        </div>
      </div>
    );
  }
  return (
    <>
      {finalCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            id={coin.id}
            icon={coin.image}
            coinName={coin.name}
            coinSymbol={coin.symbol}
            price={coin.current_price}
            marketCap={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </>
  );
};

export default CoinsDisplay;
