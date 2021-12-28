import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";
export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();
  const auth = await authorization(req, res);

  const { title, content } = req.body;
  const { id } = req.query;
  const updated = await db("posts").where({ id }).update({ title, content });
  res.status(200);
  res.json({ message: "updated", data: updated });
}
