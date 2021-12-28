import jsCookie from "js-cookie";
import Router from "next/router";
import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    // middleware unauthorized
    const token = jsCookie.get("token");
    if (!token) return Router.push("/auth/login");
    jsCookie.remove("token");
    Router.replace("/auth/login");
  }, []);
  return <div></div>;
}

export default Logout;
