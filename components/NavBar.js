import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <div>
      <Link href="/posts">Posts</Link>
      <span> - </span>
      <Link href="/posts/create">Create New Post</Link> <span> - </span>
      <Link href="/auth/logout">Logout</Link>
    </div>
  );
}

export default NavBar;
