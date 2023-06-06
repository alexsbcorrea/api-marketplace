import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

const adminSecret = process.env.ADMIN_SECRET || "secret";
const colabSecret = process.env.COLAB_SECRET || "secret";
const ownerSecret = process.env.OWNER_SECRET || "secret";
const clientSecret = process.env.CLIENT_SECRET || "secret";

export interface User {
  id: Number;
  firstname: String;
  email: String;
}

export interface JWTDecode {
  id: Number;
  firstname: String;
  email: String;
  iat: Number;
}

export async function GenerateToken(
  type: String,
  user: User,
  req: Request,
  res: Response
) {
  let token: string = "";
  if (type == "admin") {
    token = jwt.sign(
      { id: user.id, firstname: user.firstname, email: user.email },
      adminSecret
    );
  } else if (type == "colab") {
    token = jwt.sign(
      { id: user.id, firstname: user.firstname, email: user.email },
      colabSecret
    );
  } else if (type == "owner") {
    token = jwt.sign(
      { id: user.id, firstname: user.firstname, email: user.email },
      ownerSecret
    );
  } else if (type == "client") {
    token = jwt.sign(
      { id: user.id, firstname: user.firstname, email: user.email },
      clientSecret
    );
  }
  return token;
}

export function AdminTokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "NO_TOKEN" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, adminSecret) as unknown;
    const { id } = decoded as JWTDecode;
    req.userID = id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "INVALID_TOKEN" });
  }
}

export function ColabTokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "NO_TOKEN" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, colabSecret) as unknown;
    const { id } = decoded as JWTDecode;
    req.userID = id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "INVALID_TOKEN" });
  }
}

export function OwnerTokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "NO_TOKEN" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ownerSecret) as unknown;
    const { id } = decoded as JWTDecode;
    req.userID = id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "INVALID_TOKEN" });
  }
}

export function ClientTokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "NO_TOKEN" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, clientSecret) as unknown;
    const { id } = decoded as JWTDecode;
    req.userID = id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "INVALID_TOKEN" });
  }
}
