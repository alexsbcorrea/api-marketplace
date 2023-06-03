import { Request, Response, NextFunction } from "express";
import prismaClient from "../../db/prismaClient";

export default class ColaboratorController {
  static async createClient(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async getClient(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async updateClient(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async removeClient(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async createOrder(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async createAvaliation(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async addFavoriteStore(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }
}
