import { Request, Response, NextFunction } from "express";
import prismaClient from "../../db/prismaClient";

export default class ColaboratorController {
  static async getColaborator(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async updateColaborator(req: Request, res: Response) {
    res.json({ message: "Atualizar Perfil Colab" });
    return;
  }

  static async createTypeStore(req: Request, res: Response) {
    res.json({ message: "Atualizar Perfil Colab" });
    return;
  }

  static async createSpecialitieStore(req: Request, res: Response) {
    res.json({ message: "Atualizar Perfil Colab" });
    return;
  }
}
