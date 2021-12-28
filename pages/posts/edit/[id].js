import jsCookie from "js-cookie";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";

function Edit() {
  useEffect(() => {
    // middleware unauthorized
    const token = jsCookie.get("token");
    if (!token) return Router.push("/auth/login");

    // get posts
    fetch("/api/posts/" + Router.query.id, {
      headers: {
        Authorization: `Bearer ${jsCookie.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFields(data.data));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch("/api/posts/update/" + Router.query.id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jsCookie.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    if (!res.ok) return setStatus("Failed");
    setStatus("Successfully");
    Router.push("/posts");
  }
  function handleField(e) {
    const name = e.target.getAttribute("name");
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }
  const [status, setStatus] = useState("normal");
  const [fields, setFields] = useState({
    title: "",
    content: "",
  });
  return (
    <div>
      <h1>Edit post</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleField}
          value={fields.title}
          type="text"
          name="title"
          placeholder="title"
        />
        <br />
        <textarea
          onChange={handleField}
          value={fields.content}
          type="text"
          name="content"
          placeholder="content"
        />
        <br />
        <button type="submit">Update Post</button>
      </form>
      <div>{status}</div>
      <Link href="/posts">Back to Posts</Link>
    </div>
  );
}

export default Edit;
