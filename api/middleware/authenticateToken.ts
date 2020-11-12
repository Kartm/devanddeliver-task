import express, { Request } from "express";
import jwt from "jsonwebtoken";

export interface RequestWithMetaData extends Request {
  userId: number;
}

export default function authenticateToken(
  req: RequestWithMetaData,
  res: express.Response,
  next
) {
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
