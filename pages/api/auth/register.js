import db from "../../../libs/db";
import bcrypt from "bcryptjs";
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const pass = bcrypt.hashSync(password, salt);
  const regitered = await db("users").insert({
    email,
    password: pass,
  });
  const user = await db("users").where({ id: regitered }).first();
  res.status(200);
  res.json({ message: "registered", data: user });
}
