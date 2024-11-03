# React Hooks: useState

Dalam React, `useState` adalah salah satu Hook yang sering digunakan untuk mengelola *state* dalam komponen fungsi. Contoh di bawah ini menunjukkan penggunaan `useState` untuk membuat komponen `Counter` dan `UserProfile` yang interaktif.

## Contoh 1: Counter

Komponen `Counter` menggunakan `useState` untuk mengelola jumlah klik yang dilakukan pengguna.

### Kode

```javascript
import React, { useState } from 'react';

export default function Counter() {
  // Menginisialisasi state 'count' dengan nilai awal 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* Ketika tombol diklik, fungsi setCount akan memperbarui nilai count */}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```
### Penjelasan
- useState(0): Menginisialisasi state count dengan nilai awal 0.
- count: Variabel state yang menyimpan nilai dari jumlah klik.
- setCount: Fungsi untuk memperbarui nilai count.
- Ketika tombol "Click me" ditekan, fungsi setCount akan memanggil count + 1, sehingga count bertambah satu setiap kali tombol diklik.
#### Hasil
Komponen ini akan menampilkan jumlah klik yang dilakukan pengguna. Setiap kali tombol diklik, nilai count akan bertambah satu, dan tampilan akan diperbarui secara otomatis.


# React Hook: useEffect

`useEffect` adalah Hook yang memungkinkan kita melakukan efek samping (seperti pengambilan data atau pengaturan interval) di dalam komponen fungsi React. Efek samping ini dapat dilakukan pada berbagai siklus hidup komponen: setiap kali render, hanya saat pertama kali render (mount), atau ketika dependensi tertentu berubah.

## Penjelasan Dasar

```javascript
useEffect(() => {
  // Logika efek samping di sini

  return () => {
    // Cleanup efek samping jika diperlukan
  };
}, [dependency1, dependency2, ...]); // Menjalankan efek hanya ketika dependensi berubah
```
### Variasi useEffect
1. Efek yang berjalan setiap kali render:
```javascript
useEffect(() => {
  // Akan berjalan setiap kali komponen dirender
});
```
2. Efek yang hanya berjalan sekali (saat komponen di-mount):
```javascript
useEffect(() => {
  // Hanya berjalan sekali saat komponen di-mount
}, []);
```
3. Efek yang bergantung pada nilai tertentu:
```javascript
useEffect(() => {
  // Akan berjalan setiap kali 'count' berubah
}, [count]);
```
## Contoh 1: DataFetcher
Komponen DataFetcher menggunakan useEffect untuk mengambil data dari API eksternal saat komponen di-mount.
```javascript
import React, { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Array kosong berarti efek ini hanya dijalankan sekali

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```
### Penjelasan
- useEffect(() => { ... }, []): Efek ini akan dijalankan sekali saat komponen pertama kali di-mount karena array dependency kosong [].
- fetch: Melakukan pengambilan data dari URL yang diberikan.
- setData: Memperbarui state data dengan hasil pengambilan data.
- Jika terjadi error saat pengambilan data, pesan error akan dicetak ke konsol.
Komponen ini menampilkan data yang diambil dalam daftar yang dirender secara dinamis.
## Contoh 2: Timer
Komponen Timer menggunakan useEffect untuk mengatur interval yang memperbarui nilai count setiap detik. Contoh ini juga menunjukkan cara membersihkan efek ketika komponen di-unmount.
```javascript
import React, { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Mengatur interval untuk memperbarui count setiap detik
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    // Fungsi cleanup untuk membersihkan interval saat komponen di-unmount
    return () => {
      clearInterval(intervalId);
      console.log('Timer dibersihkan');
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
        {showTimer ? 'Hide' : 'Show'} Timer
      </button>
      {showTimer && <Timer />}
    </div>
  );
}

export default App;
```
### Penjelasan
- useEffect(() => { ... }, []): Efek ini diatur untuk dijalankan sekali saat komponen Timer di-mount, lalu membersihkan interval saat komponen di-unmount.
- Interval: Menggunakan setInterval untuk menambah count setiap detik.
- Cleanup: clearInterval(intervalId) di dalam fungsi return untuk menghentikan interval saat komponen di-unmount.
- App adalah komponen utama yang memungkinkan kita untuk menampilkan atau menyembunyikan komponen Timer menggunakan tombol. Ketika Timer disembunyikan, efek samping (interval) akan dibersihkan.

## Kesimpulan
useEffect adalah Hook yang sangat berguna untuk mengelola efek samping di React. Dengan menggunakan array dependency, kita dapat mengontrol kapan efek akan dijalankan:
- Tanpa array dependency ([]), efek berjalan setiap kali render.
- Dengan array kosong [], efek hanya berjalan sekali saat komponen di-mount.
- Dengan dependensi tertentu, efek hanya berjalan ketika nilai dalam array berubah.
Penting untuk selalu menambahkan fungsi cleanup (jika diperlukan) di dalam return untuk membersihkan efek ketika komponen di-unmount, seperti yang ditunjukkan pada contoh Timer

# React Hook: useContext

`useContext` adalah Hook yang memungkinkan komponen untuk mengakses nilai dari sebuah konteks tanpa harus mengirimnya melalui *props* di setiap tingkat komponen. Ini sangat berguna ketika ada data yang perlu diakses di banyak komponen, seperti data pengguna atau pengaturan aplikasi.

## Contoh 1: Konteks Sederhana untuk Nama Pengguna

Dalam contoh ini, kita membuat konteks `UserContext` untuk menyimpan nama pengguna, dan komponen `Greeting` menggunakan `useContext` untuk mengakses nilai konteks tersebut.

### Kode

```javascript
import React, { useContext, createContext } from "react";

// 1. Membuat konteks untuk nama pengguna
const UserContext = createContext();

const Greeting = () => {
  // 2. Menggunakan useContext untuk mengakses nama dari konteks
  const name = useContext(UserContext);

  return (
    <div>
      <h1>Halo, {name}!</h1>
      <p>Selamat datang di aplikasi kami.</p>
    </div>
  );
};

const App = () => {
  // 3. Menyediakan nilai nama yang akan digunakan oleh komponen
  const userName = "Andi";

  return (
    <UserContext.Provider value={userName}>
      <Greeting />
    </UserContext.Provider>
  );
};

export default App;
```

### Penjelasan
- createContext: UserContext dibuat menggunakan createContext untuk menyimpan nama pengguna.
- UserContext.Provider: App menyediakan nilai userName ("Andi") untuk semua komponen yang berada di dalam UserContext.Provider.
- useContext: Di dalam komponen Greeting, kita menggunakan useContext(UserContext) untuk mengakses nilai name langsung dari konteks.
Hasilnya, komponen Greeting akan menampilkan "Halo, Andi!" tanpa perlu menerima nilai name sebagai prop.

## Contoh 2: Konteks dengan Nilai yang Dapat Diubah
Pada contoh ini, kita memperluas konteks agar dapat memperbarui nilai name. Kita menambahkan fungsi setName menggunakan useState, sehingga pengguna dapat mengubah namanya dengan mengklik tombol.
```javascriptimport React, { useContext, useState, createContext } from "react";

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
```
### Penjelasan
- useState: App menggunakan useState untuk mengelola state name dan menyediakan setName sebagai fungsi untuk mengubah nama.
- UserContext.Provider: Nilai konteks yang diberikan adalah objek { name, setName }, sehingga komponen lain dapat mengakses name dan setName.
- changeName: Dalam komponen Greeting, fungsi changeName dipanggil saat tombol "Ubah Nama" ditekan, yang akan mengubah name menjadi "Budi".
Komponen ini memungkinkan perubahan nama dinamis. Ketika tombol ditekan, nilai nama akan berubah dari "Andi" menjadi "Budi" dan tampilan akan diperbarui.

### Kesimpulan
useContext adalah cara efektif untuk berbagi data antar komponen tanpa harus menggunakan props drilling (mengirim props ke beberapa tingkat komponen). Pada contoh di atas, UserContext memungkinkan kita untuk:
- Menyediakan nilai nama pengguna (name).
- Mengubah nilai nama secara dinamis melalui setName.
Dengan menggunakan UserContext.Provider, kita dapat memastikan bahwa setiap komponen di dalamnya dapat mengakses dan memperbarui data yang dibutuhkan dari konteks secara langsung.