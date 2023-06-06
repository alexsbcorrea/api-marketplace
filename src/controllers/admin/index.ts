import e, { Request, Response, NextFunction } from "express";
import prismaClient from "../../db/prismaClient";
import "dotenv/config";

import { GenerateToken } from "../../middlewares/TokenController";
import { cp } from "fs";

const typeforToken: String = "admin";

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

    if (!firstname) {
      return res.status(422).json({
        message: "O Nome é obrigatório.",
      });
    }

    if (!lastname) {
      return res.status(422).json({
        message: "O Sobrenome é obrigatório.",
      });
    }

    if (!cpf) {
      return res.status(422).json({
        message: "O CPF é obrigatório.",
      });
    }

    if (!email) {
      return res.status(422).json({
        message: "O E-mail é obrigatório.",
      });
    }

    if (!password) {
      return res.status(422).json({
        message: "A Senha é obrigatória.",
      });
    }

    if (!confirmPassword) {
      return res.status(422).json({
        message: "A Confirmação de Senha é obrigatória.",
      });
    }

    if (password != confirmPassword) {
      return res.status(422).json({
        message: "A Senha e a Confirmação de Senha não correspondem.",
      });
    }

    //Validations
    const checkEmail = await prismaClient.admin.findFirst({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(422).json({
        message: "E-mail inválido, forneça outro e-mail para continuar",
      });
    }

    try {
      const newAdmin = await prismaClient.admin.create({
        data: {
          firstname,
          lastname,
          cpf,
          phone,
          email,
          password,
        },
      });

      const payloadToken = {
        id: newAdmin.id,
        firstname: newAdmin.firstname,
        email: newAdmin.email,
      };

      const token = await GenerateToken(typeforToken, payloadToken, req, res);

      return res.status(201).json({
        message: "Cadastro realizado com sucesso.",
        firstname: newAdmin.firstname,
        lastname: newAdmin.lastname,
        email: newAdmin.email,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro no Servidor, tente novamente mais tarde.",
      });
    }
  }
  static async loginAdmin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: "O E-mail é obrigatório",
      });
    }

    if (!password) {
      return res.status(422).json({
        message: "A Senha é obrigatória",
      });
    }

    const checkUser = await prismaClient.admin.findFirst({ where: { email } });

    if (!checkUser) {
      return res.status(404).json({
        message: "Usuário inexistente.",
      });
    }

    if (password == checkUser?.password) {
      const payloadToken = {
        id: checkUser.id,
        firstname: checkUser.firstname,
        email: checkUser.email,
      };

      const token = await GenerateToken(typeforToken, payloadToken, req, res);

      return res.status(200).json({
        message: "Login realizado com sucesso.",
        firstname: checkUser.firstname,
        lastname: checkUser.lastname,
        email: checkUser.email,
        token: token,
      });
    } else {
      return res.status(422).json({
        message: "Usuário ou Senha inválida.",
      });
    }
  }
  static async getAdmin(req: Request, res: Response) {
    const id = req.userID;

    if (id) {
      const user = await prismaClient.admin.findUnique({
        where: { id: Number(id) },
      });
      return res.json({ user });
    } else {
      return res.json({ message: "Sem ID" });
    }
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
