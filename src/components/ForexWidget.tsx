"use client";
import React, { useEffect, useState } from "react";
import MapChart from "./mapComponent/shared/map/Map";
import Drawer from "@/components/Drawer";
import NewsFeed from "./NewsFeed";
import DiversifiedProgressBar from "@/components/DiversifiedProgressBar";
import DashboardTiles, { CurrencyData } from "@/components/DashboardTiles";
import MainWidgetPosition from "./mainWidget/MainWidgetPosition";
import { Subscription } from "@/model/subscription.type";
import { getExchangeRateBetweenCurrencies } from "@/service/exchangeRateApiRead.service";
import { Account } from "@/model/account.type";

const defaultProducts: Array<CurrencyData> = [
  {
    currency: "USD",
    rate: 1.12,
    previousRate: 1.11,
    recommendationScore: 3,
    liked: true,
    change: 0.12,
    balance: 11000.5,
  },
  {
    currency: "CHF",
    rate: 0.93,
    previousRate: 0.9,
    recommendationScore: 5,
    liked: true,
    change: 0.03,
    balance: 31500.0,
  },
  {
    currency: "GBP",
    rate: 0.79,
    previousRate: 0.8,
    recommendationScore: 3,
    liked: true,
    change: 0.12,
    balance: 22500.75,
  },
  {
    currency: "EUR",
    rate: 7.7,
    previousRate: 7.77,
    recommendationScore: 1,
    liked: false,
    change: 0.07,
    balance: 43000.0,
  },
  {
    currency: "PLN",
    rate: 4.3,
    previousRate: 4.31,
    recommendationScore: 3,
    liked: false,
    change: 0.01,
    balance: null,
  },
  {
    currency: "AUD",
    rate: 1.61,
    previousRate: 1.62,
    recommendationScore: 3,
    liked: false,
    change: 0.01,
    balance: 5800.0,
  },
];

function ForexWidget() {
  const [open, setOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[] | []>([]);

  const [products, setProducts] = useState<CurrencyData[] | []>(
    defaultProducts
  );

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const setLikedProduct = (currency: string) => {
    const newProducts = [...products].map((value) => {
      return { ...value };
    });
    const product = newProducts.find((value) => value.currency === currency);

    if (product) {
      product.liked = !product.liked;
    }
    setProducts(newProducts);
  };

  const syncRates = async () => {
    // const responses = await Promise.all());
    const updatedProducts = [];
    for (const prod of products) {
      if (prod.currency === "EUR") {
        continue;
      }
      const product = { ...prod };
      const response = await getExchangeRateBetweenCurrencies(
        "EUR",
        prod.currency
      );
      product.rate = response as number;
      updatedProducts.push(product);
    }
    setProducts(updatedProducts);
  };

  const accounts: Account[] = [
    ...products,
    {
      currency: "EUR",
      rate: 7.7,
      previousRate: 7.77,
      recommendationScore: 1,
      liked: false,
      change: 0.07,
      balance: 43000.0,
    },
  ]
    .filter((value) => value.balance)
    .map((poduct) => {
      return {
        currency: poduct.currency,
        balance: poduct.balance as number,
        iban: "",
      };
    });

  useEffect(() => {
    syncRates();
  }, []);

  return (
    <>
      <div
        className="relative cursor-pointer sm:min-w-full sm:w-auto md:min-w-fit p-6 bg-white rounded-lg shadow-md md:w-3/6  hover:shadow-lg hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-105"
        onClick={toggleDrawer}
      >
        <MapChart />
        <div className="flex justify-start items-center mb-4">
          <div className="text-xl font-bold">Foreign exchange</div>
          <div className="flex items-center space-x-2 ml-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              />
            </svg>
            <div className="flex items-center justify-center w-6 h-6 bg-yellow-400 text-black font-bold text-sm rounded-full">
              3
            </div>
          </div>
          <div className="ml-auto">
            <div className="ml-auto relative group">
              <div className="absolute right-full mr-2 hidden group-hover:block w-max bg-gray-700 text-white text-sm rounded py-2 px-4 shadow-lg">
                Score indicator is not a investment advice. It is a price <br />
                indicator based on previous purchases of a given currency in{" "}
                <br />
                relation to current and historical exchange rates.
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="border-b mb-4"></div>
        <div className="space-y-4">
          {products
            .filter((value) => value.liked)
            .map((value, position) => {
              return (
                <>
                  <MainWidgetPosition
                    key={value.currency}
                    score={value.recommendationScore}
                    valueChange={value.rate - value.previousRate}
                    comparedCurrency={value.currency}
                    currencyValue={value.rate}
                    currencyAccountBalance={value.balance?.toFixed(2) ?? 0}
                  />
                  {position !== products.length - 1 && (
                    <div className="border-b" />
                  )}
                </>
              );
            })}
        </div>
      </div>
      {/* Drawer z konfiguracją */}
      <Drawer open={open} handleToggle={toggleDrawer} width={"50%"}>
        <DiversifiedProgressBar accounts={accounts} />
        <DashboardTiles
          accounts={products}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
          setLikedProduct={setLikedProduct}
        />
        <NewsFeed />
        {/*<DiversifiedProgressBar2/>*/}
        {/*<DashboardTiles2/>*/}
        {/*<ForexTable/>*/}
        {/*<DonutChart/>*/}
      </Drawer>
    </>
  );
}

export default ForexWidget;
