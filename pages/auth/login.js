import jsCookie from "js-cookie";
import cookies from "next-cookies";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
// export async function getServerSideProps(ctx) {
//   const cookie = cookies(ctx);
//   if (cookie.token) {
//     return ctx.res
//       .writeHead(302, {
//         location: "/posts",
//       })
//       .end();
//   }
//   return { props: {} };
// }
function Login() {
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    }).then((res) => {
      if (!res.ok) {
        setStatus("error " + res.status);
        return {};
      }
      setStatus("success");
      return res.json();
    });
    jsCookie.set("token", res.token);
    Router.push("/posts");
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
      <h1>Login</h1>
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

        <button type="submit">Login</button>
      </form>
      <Link href="/auth/register">Register</Link>
      <div>{status}</div>
    </div>
  );
}

export default Login;
