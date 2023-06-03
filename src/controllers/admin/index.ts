import { Request, Response, NextFunction } from "express";
import prismaClient from "../../db/prismaClient";

export default class AdminController {
  static async createAdmin(req: Request, res: Response) {
    res.json({ message: "Novo Admin" });
    return;
  }

  static async getAdmin(req: Request, res: Response) {
    res.json({ message: "Obter Admin" });
    return;
  }

  static async updateAdmin(req: Request, res: Response) {
    res.json({ message: "Atualizar Admin" });
    return;
  }

  static async deleteAdmin(req: Request, res: Response) {
    res.json({ message: "Remover Admin" });
    return;
  }

  static async createPermission(req: Request, res: Response) {
    res.json({ message: "Adicionar Permissão" });
    return;
  }

  static async getPermission(req: Request, res: Response) {
    res.json({ message: "Adicionar Permissão" });
    return;
  }

  static async updatePermission(req: Request, res: Response) {
    res.json({ message: "Adicionar Permissão" });
    return;
  }

  static async deletePermission(req: Request, res: Response) {
    res.json({ message: "Adicionar Permissão" });
    return;
  }

  static async createColaborator(req: Request, res: Response) {
    res.json({ message: "Adicionar Colaborador" });
    return;
  }

  static async getColaborator(req: Request, res: Response) {
    res.json({ message: "Adicionar Colaborador" });
    return;
  }

  static async updateColaborator(req: Request, res: Response) {
    res.json({ message: "Adicionar Colaborador" });
    return;
  }

  static async deleteColaborator(req: Request, res: Response) {
    res.json({ message: "Adicionar Colaborador" });
    return;
  }

  static async configPermissionColaborator(req: Request, res: Response) {
    res.json({ message: "Configurar Permissões do Colaborador" });
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
