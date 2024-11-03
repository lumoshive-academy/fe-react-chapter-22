import React, { useContext, useState, createContext } from "react";

// 1. Membuat konteks untuk nama pengguna
const UserContext = createContext();

const Greeting = () => {
  // 2. Menggunakan useContext untuk mengakses dan mengubah nama dari konteks
  const { name, setName } = useContext(UserContext);

  const changeName = () => {
    // Mengubah nama pengguna
    setName("Budi");
  };

  return (
    <div>
      <h1>Halo, {name}!</h1>
      <p>Selamat datang di aplikasi kami.</p>
      <button onClick={changeName}>Ubah Nama</button>
    </div>
  );
};

const App = () => {
  // 3. Menggunakan useState untuk mengelola nilai konteks
  const [name, setName] = useState("Andi");

  return (
    <UserContext.Provider value={{ name, setName }}>
      <Greeting />
    </UserContext.Provider>
  );
};

export default App;
