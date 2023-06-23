import { Request, Response, NextFunction } from "express";
import prismaClient from "../../db/prismaClient";

import { GenerateToken } from "../../middlewares/TokenController";
const typeforToken = "owner";

export default class ColaboratorController {
  static async createOwner(req: Request, res: Response) {
    const { firstname, lastname, cpf, rg, org_emitter, phone, email, password, confirmPassword } = req.body;

    const level: string = "owner";

    const errors = [];

    if (!firstname) {
      errors.push({ message: "O Nome é obrigatório." });
    }
    if (!lastname) {
      errors.push({ message: "O Sobrenome é obrigatório." });
    }
    if (!cpf) {
      errors.push({ message: "O CPF é obrigatório." });
    }
    if (!rg) {
      errors.push({ message: "O RG é obrigatório." });
    }
    if (!org_emitter) {
      errors.push({ message: "O Orgão Emissor é obrigatório." });
    }
    if (!email) {
      errors.push({ message: "O E-mail é obrigatório." });
    }
    if (!password) {
      errors.push({ message: "A Senha é obrigatória." });
    }
    if (!confirmPassword) {
      errors.push({ message: "A Confirmação de Senha é obrigatória." });
    }
    if (password && confirmPassword && password != confirmPassword) {
      errors.push({
        message: "A Senha e a Confirmação de Senha não correspondem.",
      });
    }

    if (errors.length > 0) {
      return res.status(422).json({
        message: "Por favor, preencha todos os campos obrigatório para concluir a sua solicitação.",
        errors: errors,
      });
    }

    try {
      const owner = await prismaClient.owner.create({
        data: {
          firstname,
          lastname,
          cpf,
          rg,
          org_emitter,
          phone,
          email,
          password,
          level,
        },
      });
      const payloadToken = {
        id: owner.id,
        firstname: owner.firstname,
        email: owner.email,
      };

      const token = await GenerateToken(typeforToken, payloadToken, req, res);

      return res.status(201).json({
        message: "Cadastro realizado com sucesso.",
        firstname: owner.firstname,
        lastname: owner.lastname,
        email: owner.email,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro no Servidor, tente novamente mais tarde.",
      });
    }
  }
  static async loginOwner(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: "Insira o E-mail.",
      });
    }

    if (!password) {
      return res.status(422).json({
        message: "Insira a Senha.",
      });
    }

    const checkOwner = await prismaClient.owner.findFirst({
      where: { email: email },
    });

    if (!checkOwner) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    if (password != checkOwner.password) {
      return res.status(422).json({
        message: "Usuário ou Senha incorreto(s).",
      });
    } else {
      const payloadToken = {
        id: checkOwner.id,
        firstname: checkOwner.firstname,
        email: checkOwner.email,
      };

      const token = await GenerateToken(typeforToken, payloadToken, req, res);

      return res.status(200).json({
        message: "Login realizado com sucesso.",
        firstname: checkOwner.firstname,
        lastname: checkOwner.lastname,
        email: checkOwner.email,
        token: token,
      });
    }
  }
  static async getOwner(req: Request, res: Response) {
    const id_owner = req.userID;

    const owner = await prismaClient.owner.findFirst({
      where: { id: Number(id_owner) },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        cpf: true,
        rg: true,
        org_emitter: true,
        phone: true,
        email: true,
        password: false,
        level: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!owner) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    return res.status(200).json({ owner });
  }
  static async updateProfileOwner(req: Request, res: Response) {
    const id_owner = req.userID;
    const { firstname, lastname, cpf, rg, org_emitter, phone } = req.body;
    const errors = [];

    if (!firstname) {
      errors.push({ message: "O Nome é obrigatório." });
    }
    if (!lastname) {
      errors.push({ message: "O Sobrenome é obrigatório." });
    }
    if (!cpf) {
      errors.push({ message: "O CPF é obrigatório." });
    }
    if (!rg) {
      errors.push({ message: "O RG é obrigatório." });
    }
    if (!org_emitter) {
      errors.push({ message: "O Orgão Emissor é obrigatório." });
    }

    if (errors.length > 0) {
      return res.status(422).json({
        message: "Por favor, preencha todos os campos obrigatório para concluir a sua solicitação.",
        errors: errors,
      });
    }

    try {
      const owner = await prismaClient.owner.update({
        where: { id: Number(id_owner) },
        data: {
          firstname,
          lastname,
          cpf,
          rg,
          org_emitter,
          phone,
        },
      });
      return res.status(200).json({ message: "Perfil atualizado com sucesso." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async changePasswordOwner(req: Request, res: Response) {
    const id_owner = req.userID;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword) {
      return res.status(422).json({ message: "A Senha Atual é obrigatória." });
    }
    if (!newPassword) {
      return res.status(422).json({ message: "A Nova Senha é obrigatória." });
    }
    if (!confirmPassword) {
      return res.status(422).json({ message: "A Confirmação de Senha é obrigatória." });
    }

    const checkOwner = await prismaClient.owner.findFirst({
      where: {
        id: Number(id_owner),
      },
    });

    if (!checkOwner) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    if (currentPassword != checkOwner.password) {
      return res.status(422).json({
        message: "A Senha Atual está incorreta.",
      });
    }

    if (newPassword != confirmPassword) {
      return res.status(422).json({
        message: "A Nova Senha e a Confirmação não correspondem.",
      });
    }

    try {
      const owner = await prismaClient.owner.update({
        where: { id: Number(id_owner) },
        data: {
          password: newPassword,
        },
      });
      return res.status(200).json({ message: "Senha alterada com sucesso." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async deleteOwner(req: Request, res: Response) {
    const id_owner = req.userID;

    const checkOwner = await prismaClient.owner.findFirst({
      where: { id: Number(id_owner) },
    });

    if (!checkOwner) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    try {
      const owner = await prismaClient.owner.delete({
        where: { id: Number(id_owner) },
      });
      return res.status(200).json({ message: "Conta de Proprietário excluída com sucesso." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async createColaborator(req: Request, res: Response) {
    const { firstname, lastname, cpf, rg, org_emitter, phone, email, password, confirmPassword } = req.body;

    const level: string = "colaborator";

    const errors = [];

    if (!firstname) {
      errors.push({ message: "O Nome é obrigatório." });
    }
    if (!lastname) {
      errors.push({ message: "O Sobrenome é obrigatório." });
    }
    if (!cpf) {
      errors.push({ message: "O CPF é obrigatório." });
    }
    if (!rg) {
      errors.push({ message: "O RG é obrigatório." });
    }
    if (!org_emitter) {
      errors.push({ message: "O Orgão Emissor é obrigatório." });
    }
    if (!email) {
      errors.push({ message: "O E-mail é obrigatório." });
    }
    if (!password) {
      errors.push({ message: "A Senha é obrigatória." });
    }
    if (!confirmPassword) {
      errors.push({ message: "A Confirmação de Senha é obrigatória." });
    }
    if (password != confirmPassword) {
      errors.push({
        message: "A Senha e a Confirmação de Senha não correspondem.",
      });
    }

    if (errors?.length > 0) {
      res.status(422).json({
        message: "Por favor, preencha todos os campos obrigatório para concluir a sua solicitação.",
        errors: errors,
      });
      return;
    }

    console.log("Falha no Fluxo");

    try {
      const owner = await prismaClient.owner.create({
        data: {
          firstname,
          lastname,
          cpf,
          rg,
          org_emitter,
          phone,
          email,
          password,
          level,
        },
      });

      return res.status(201).json({
        message: "Colaborador cadastrado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro no Servidor, tente novamente mais tarde.",
      });
    }
  }
  static async createStore(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }
  static async getStore(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }
  static async updateStore(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async deleteStore(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async createInternalCategorie(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async addToStoreInternalCategorie(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async getInternalCategorie(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async updateInternalCategorie(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async deleteInternalCategorie(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async createProduct(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async getProduct(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async updateProduct(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async deleteProduct(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async createPaymentMethod(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async getPaymentMethod(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async updatePaymentMethod(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }

  static async deletePaymentMethod(req: Request, res: Response) {
    res.json({ message: "Obter Perfil Colab" });
    return;
  }
}
