import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface MetaData {
  userId: number;
}

export interface RequestWithMetaData extends Request, MetaData {}

export default function authenticateToken(
  req: RequestWithMetaData,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "SECRET", (err, decoded: MetaData) => {
    console.log(err);
    if (err) return res.sendStatus(403);

    req.userId = decoded.userId;

    next();
  });
}
