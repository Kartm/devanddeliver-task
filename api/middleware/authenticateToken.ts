import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "SECRET", (err, decoded) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;

    next();
  });
}
