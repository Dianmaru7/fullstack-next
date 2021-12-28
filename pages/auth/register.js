import jsCookie from "js-cookie";
import Router from "next/router";
import React, { useEffect, useState } from "react";

function Register() {
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    }).then((res) => {
      if (!res.ok) return setStatus("error" + res.status);
      setStatus("success");

      return res.json();
    });
    Router.push("/auth/login");
  }
  function handleField(e) {
    const name = e.target.getAttribute("name");
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }
  useEffect(() => {
    // middleware authorized
    const token = jsCookie.get("token");
    if (token) return Router.push("/posts");
  }, []);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("normal");
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          onChange={handleField}
          value={fields.email}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          name="password"
          onChange={handleField}
          value={fields.password}
          placeholder="Password"
        />
        <br />

        <button type="submit">Register</button>
      </form>
      <div>{status}</div>
    </div>
  );
}

export default Register;
