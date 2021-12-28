import jsCookie from "js-cookie";
import cookies from "next-cookies";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";

function Index(props) {
  const [posts, setPosts] = useState(props.posts);
  const [status, setStatus] = useState("");
  useEffect(() => {
    // middleware unauthorized
    const token = jsCookie.get("token");
    if (!token) return Router.push("/auth/login");
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/api/posts", {
      headers: {
        Authorization: `Bearer ${jsCookie.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ data }) => setPosts(data));
  }, [status]);
  async function handleDelete(e) {
    e.preventDefault();
    const result = confirm("apakah data mau dihapus?");
    if (!result) return false;
    const res = await fetch("/api/posts/delete/" + e.target.dataset.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jsCookie.get("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) return setStatus(Math.random());
  }
  return (
    <div>
      <h1>Posts</h1>
      <NavBar />
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div>
            <Link
              style={{ color: "blue", border: "1px solid red" }}
              href={`/posts/edit/${post.id}`}
            >
              Edit
            </Link>
            <button
              data-id={post.id}
              onClick={handleDelete}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </div>
          <hr />
        </div>
      ))}
      <Link href="/posts/create">Create New</Link>;
    </div>
  );
}

export default Index;

export async function getServerSideProps(ctx) {
  const posts = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Authorization: `Bearer ${cookies(ctx).token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return {
    props: { posts: posts.data },
  };
}
