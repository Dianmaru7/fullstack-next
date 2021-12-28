import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import db from "../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;
  const checkUser = await db("users").where({ email }).first();
  if (!checkUser) return res.status(401).end();
  const checkPassword = await bcrypt.compare(password, checkUser.password);
  if (!checkPassword) return res.status(401).end();
  const token = jsonwebtoken.sign(
    { id: checkUser.id, email: checkUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.status(200);
  res.json({
    message: "logged",
    token,
  });
}
