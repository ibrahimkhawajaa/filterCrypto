import { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [currency, setCurrency] = useState([]);
  useEffect(() => {
    axios
      .get("https://openapiv1.coinstats.app/coins", {
        headers: {
          "X-API-KEY": "awUVG3rdXFrVuzTaQtw6E67pCWJVrHHU7ZiS1jCV31M=",
        },
      })
      .then((res) => setCurrency(res.data.result))
      .catch((err) => console.log(err));
  }, []);
  const Submit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form className="w-auto m-auto p-10" onSubmit={Submit}>
        <label
          for="search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => setInput(e.target.value)}
            id="search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <div class="relative overflow-x-scroll w-[70%] m-auto cursor-pointer ">
        <table class=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Rank
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Symbol
              </th>
              <th scope="col" class="px-6 py-3">
                Market Cap
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Available
              </th>
              <th scope="col" class="px-6 py-3">
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {currency
              .filter((val) => {
                return val.name.toLowerCase().includes(input.toLowerCase());
              })
              .map((val) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {val.rank}
                    </th>
                    <td class="px-3 py-6 object-fit w-auto text-center ">
                      <a href={val.websiteUrl} target="_blank" >
                        {" "}
                        <img src={val.icon} alt="" />
                        <p>{val.name}</p>
                      </a>
                    </td>
                    <td class="px-5 py-4">{val.symbol}</td>
                    <td class="px-6 py-4">{val.marketCap}</td>
                    <td class="px-6 py-4">{val.price}</td>
                    <td class="px-6 py-4">{val.availableSupply}</td>
                    <td class="px-6 py-4">{val.volume}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
