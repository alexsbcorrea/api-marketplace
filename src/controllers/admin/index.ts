import { Request, Response, NextFunction } from "express";
import prismaClient from "../../db/prismaClient";
import "dotenv/config";

import { GenerateToken } from "../../utils/TokenController";

export default class AdminController {
  static async createAdmin(req: Request, res: Response) {
    const {
      firstname,
      lastname,
      cpf,
      phone,
      email,
      confirmPassword,
      password,
    } = req.body;

    //Validations
    const user = {
      id: 1,
      firstname: "Alex",
      email: "alex.sandro_as@hotmail.com",
    };

    const token = GenerateToken("admin", user, req, res);

    const idd = req.userID;

    res.json({ token, idd });
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
