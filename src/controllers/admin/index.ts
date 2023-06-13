import { Request, Response, NextFunction } from "express";
import prismaClient from "../../db/prismaClient";
import "dotenv/config";

import { GenerateToken } from "../../middlewares/TokenController";

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

    const user = await prismaClient.admin.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        cpf: true,
        phone: true,
        email: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(200).json({ user });
  }
  static async updateAdminProfile(req: Request, res: Response) {
    const id = req.userID;
    const { firstname, lastname, cpf, phone, email } = req.body;

    try {
      const updateuser = await prismaClient.admin.update({
        where: { id: Number(id) },
        data: {
          firstname,
          lastname,
          cpf,
          phone,
          email,
        },
      });
      res.status(200).json({
        message: "Cadastro atualizado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Erro no Servidor, tente novamente mais tarde.",
      });
    }
  }
  static async updateAdminPassword(req: Request, res: Response) {
    const id = req.userID;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const user = await prismaClient.admin.findUnique({
      where: { id: Number(id) },
    });

    if (currentPassword != user?.password) {
      return res.status(422).json({ message: "A Senha Atual está incorreta." });
    }

    if (newPassword != confirmPassword) {
      return res
        .status(422)
        .json({ message: "A Nova Senha e a Confirmação não correspondem." });
    }

    try {
      const updatePassword = await prismaClient.admin.update({
        where: { id: Number(id) },
        data: {
          password: newPassword,
        },
      });
      return res.status(200).json({ message: "Senha alterada com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async deleteAdmin(req: Request, res: Response) {
    const id = req.userID;

    try {
      const admin = await prismaClient.admin.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({
        message: "Conta de Administrador removida com sucesso.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro no Servidor, tente novamente mais tarde.",
      });
    }
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
