import { Request, Response, NextFunction } from "express";

export default async function GetSource(req: Request, res: Response) {
  return res.status(200).json({ message: "Rota Raiz" });
}
