import e, { Request, Response, NextFunction } from "express";
import prismaClient from "../../db/prismaClient";

import { GenerateToken } from "../../middlewares/TokenController";

const typeforToken: string = "colab";

export default class ColaboratorController {
  static async loginColaborator(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "O E-mail é obrigatório." });
    }

    if (!password) {
      return res.status(422).json({ message: "A Senha é obrigatória." });
    }

    const checkColab = await prismaClient.colaborator.findFirst({
      where: { email: email },
    });

    if (!checkColab) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (password == checkColab.password) {
      const payloadToken = {
        id: checkColab.id,
        firstname: checkColab.firstname,
        email: checkColab.email,
      };

      const token = await GenerateToken(typeforToken, payloadToken, req, res);

      return res.status(200).json({
        message: "Login realizado com sucesso.",
        firstname: checkColab.firstname,
        lastname: checkColab.lasttname,
        email: checkColab.email,
        token: token,
      });
    } else {
      return res.status(422).json({ message: "Usuário ou Senha incorreto(s)." });
    }
  }
  static async getColaborator(req: Request, res: Response) {
    const id_colab = req.userID;

    const colaborator = await prismaClient.colaborator.findFirst({
      where: { id: Number(id_colab) },
      select: {
        id: true,
        firstname: true,
        lasttname: true,
        cpf: true,
        rg: true,
        org_emitter: true,
        phone: true,
        email: true,
        password: false,
        id_admin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!colaborator) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    return res.status(200).json({ colaborator });
  }
  static async updateColaboratorProfile(req: Request, res: Response) {
    const id_colab = req.userID;
    const { firstname, lasttname, cpf, rg, org_emitter, phone } = req.body;

    if (!firstname) {
      return res.status(422).json({ message: "O Primeiro Nome é obrigatório." });
    }

    if (!lasttname) {
      return res.status(422).json({ message: "O Último Nome é obrigatório." });
    }

    if (!cpf) {
      return res.status(422).json({ message: "O CPF é obrigatório." });
    }

    if (!rg) {
      return res.status(422).json({ message: "O RG é obrigatório." });
    }

    if (!org_emitter) {
      return res.status(422).json({ message: "O Orgão Emissor é obrigatório." });
    }

    if (!phone) {
      return res.status(422).json({ message: "O Telefone é obrigatório." });
    }

    try {
      const updateColab = await prismaClient.colaborator.update({
        where: { id: Number(id_colab) },
        data: {
          firstname,
          lasttname,
          cpf,
          rg,
          org_emitter,
          phone,
        },
      });
      return res.status(200).json({ message: "Cadastro atualizado com sucesso." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async updateColaboratorPassword(req: Request, res: Response) {
    const id_colab = req.userID;
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

    const checkColab = await prismaClient.colaborator.findUnique({
      where: { id: Number(id_colab) },
    });

    if (!checkColab) {
      return res.status(404).json({ message: "Colaborador não encontrado." });
    }

    if (currentPassword != checkColab.password) {
      return res.status(422).json({ message: "A Senha Atual está incorreta." });
    }

    if (newPassword != confirmPassword) {
      return res.status(422).json({ message: "A Nova Senha e a Confirmação não correspondem." });
    }

    try {
      const updateColab = await prismaClient.colaborator.update({
        where: { id: Number(id_colab) },
        data: {
          password: String(newPassword),
        },
      });
      return res.status(200).json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
}
