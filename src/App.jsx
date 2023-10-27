import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((e) => console.log(e));
  }, []);

  let formHandler = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let user = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        let newUser = [...users, data];
        setUsers(newUser);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Phone Users</h1>
      <form onSubmit={formHandler}>
        <input
          type="text"
          className="border border-black"
          name="name"
          placeholder="Your name"
        />
        <br />
        <br />
        <input
          type="email"
          className="border border-black"
          name="email"
          placeholder="Your email"
        />
        <br />
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>

      <div>
        {users.map((u) => (
          <>
            <p>{`Name: ${u.name} Email: ${u.email}`}</p>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
