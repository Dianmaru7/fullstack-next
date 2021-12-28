import jsonwebtoken from "jsonwebtoken";

export default function authorization(req, res) {
  return new Promise((resolve, reject) => {
    if (!req.headers.authorization) return res.status(405).end();
    const auth = req.headers.authorization.split(" ");
    if (auth[0] !== "Bearer") return res.status(401).end();
    return jsonwebtoken.verify(
      auth[1],
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) return res.status(401).end();
        return resolve(decoded);
      }
    );
  });
}
