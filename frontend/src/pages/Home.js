import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("https://registartion-backend.fly.dev/home", async (req, res) => {
      setCount(res.data.counts);
    });
  });

  const increaseNumber = () => {
    axios
      .put("https://registartion-backend.fly.dev/home", async (req, res) => {})
      .then(() => {
        axios
          .get(
            "https://registartion-backend.fly.dev/home",
            async (req, res) => {
              setCount(res.data.counts);
            }
          )
          .then(() => {
            console.log("Value Increased");
          });
      });
  };

  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          increaseNumber();
        }}
      >
        Increase
      </button>
    </div>
  );
}

export default Home;
