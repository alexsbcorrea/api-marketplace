import { Request, Response, NextFunction } from "express";

export default async function GetSource(req: Request, res: Response) {
  res.json({ message: "Rota Raiz" });
  return;
}
