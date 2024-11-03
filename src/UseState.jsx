import React, { useState } from "react";

function UserProfile() {
  // Menginisialisasi state 'user' dengan objek default { name: '', age: 0 }
  const [user, setUser] = useState({ name: "", age: 0 });

  const updateName = () => {
    // Memperbarui properti 'name' dalam objek 'user' menjadi 'John'
    setUser((prevUser) => ({ ...prevUser, name: "John" }));
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={updateName}>Update Name to John</button>
    </div>
  );
}

export default UserProfile;
