import React, { useState, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Mengatur interval untuk memperbarui count setiap detik
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Fungsi cleanup untuk membersihkan interval saat komponen di-unmount
    return () => {
      clearInterval(intervalId);
      console.log("Timer dibersihkan");
    };
  }, []); // Array dependency kosong berarti efek ini hanya dijalankan saat komponen di-mount dan di-unmount

  return (
    <div>
      <h1>Timer: {count} detik</h1>
    </div>
  );
}

function App() {
  const [showTimer, setShowTimer] = useState(true);

  const toggleWindowSize = () => {
    setShowTimer(!showTimer);
  };

  return (
    <div>
      <h1>Contoh Unmount Komponen</h1>
      <button onClick={toggleWindowSize}>
        {showTimer ? "Hide" : "Show"} Timer
      </button>
      {showTimer && <Timer />}
    </div>
  );
}

export default App;
