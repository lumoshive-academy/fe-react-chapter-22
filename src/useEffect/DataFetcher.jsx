import React, { useState, useEffect } from "react";

export default function DataFetcher() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Array kosong berarti efek ini hanya dijalankan sekali

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
