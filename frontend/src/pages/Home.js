import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://registartion-backend.fly.dev/home")
      .then((response) => {
        setCount(response.data.counts);
      })
      .catch((error) => {
        console.log("Error Fetching Data: ", error);
      });
  }, []);

  const increaseNumber = () => {
    axios
      .put("https://registartion-backend.fly.dev/home")
      .then(() => {
        axios
          .get("https://registartion-backend.fly.dev/home")
          .then((response) => {
            setCount(response.data.counts);
            console.log("Value Increased");
          })
          .catch((error) => {
            "Error fetcing updated data: ", error;
          });
      })
      .catch((error) => {
        "Error increasing data: ", error;
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
