import { Request, Response, NextFunction } from "express";
import prismaClient from "../../db/prismaClient";
import "dotenv/config";

import { GenerateToken } from "../../middlewares/TokenController";
import { prependListener } from "process";

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
        message: "Usuário não encontrado.",
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

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json({ user });
  }
  static async updateAdminProfile(req: Request, res: Response) {
    const id = req.userID;
    const { firstname, lastname, cpf, phone, email } = req.body;

    const checkUser = await prismaClient.admin.findFirst({
      where: { id: Number(id) },
    });
    if (!checkUser) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

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
      return res.status(200).json({
        message: "Cadastro atualizado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro no Servidor, tente novamente mais tarde.",
      });
    }
  }
  static async updateAdminPassword(req: Request, res: Response) {
    const id = req.userID;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const checkUser = await prismaClient.admin.findFirst({
      where: { id: Number(id) },
    });
    if (!checkUser) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    if (currentPassword != checkUser?.password) {
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

    const checkUser = await prismaClient.admin.findFirst({
      where: { id: Number(id) },
    });
    if (!checkUser) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

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
    const id = req.userID;
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(422)
        .json({ message: "O Nome da Permissão é obrigatório" });
    }

    try {
      const newPermission = await prismaClient.permission.create({
        data: {
          name,
          description,
          id_admin: Number(id),
        },
      });
      return res.status(201).json({ message: "Permissão criada com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async getPermission(req: Request, res: Response) {
    const id = req.userID;
    const id_permission = req.params.id;

    if (!id_permission) {
      return res
        .status(422)
        .json({ message: "O ID da Permissão é obrigatório." });
    }

    const permission = await prismaClient.permission.findUnique({
      where: { id: Number(id_permission) },
    });

    if (!permission) {
      return res.status(404).json({ message: "Permissão não encontrada." });
    }

    return res.status(200).json({ permission });
  }
  static async updatePermission(req: Request, res: Response) {
    const id = req.userID;
    const id_permission = req.params.id;

    const { name, description } = req.body;

    if (!name) {
      return res
        .status(422)
        .json({ message: "O Nome da Permissão é obrigatório." });
    }

    const permissionCheck = await prismaClient.permission.findUnique({
      where: { id: Number(id_permission) },
    });

    if (!permissionCheck) {
      return res.status(404).json({ message: "Permissão não encontrada." });
    }

    try {
      const updatePermission = await prismaClient.permission.update({
        where: { id: Number(id_permission) },
        data: {
          name,
          description,
        },
      });
      return res
        .status(200)
        .json({ message: "Permissão Atualizada com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async deletePermission(req: Request, res: Response) {
    const id = req.userID;
    const id_permission = req.params.id;

    const permissionCheck = await prismaClient.permission.findUnique({
      where: { id: Number(id_permission) },
    });

    if (!permissionCheck) {
      return res.status(404).json({ message: "Permissão não encontrada." });
    }

    try {
      const permission = await prismaClient.permission.delete({
        where: { id: Number(id_permission) },
      });
      return res
        .status(200)
        .json({ message: "Permissão Removida com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor. Tente novamente mais tarde." });
    }
  }
  static async getAllPermissions(req: Request, res: Response) {
    const allpermissions = await prismaClient.permission.findMany({
      orderBy: [{ name: "asc" }],
    });

    if (allpermissions.length == 0) {
      return res
        .status(404)
        .json({ message: "Nenhum Permissão foi encontrada." });
    }

    res.status(200).json({ allpermissions });
  }
  static async getMyPermission(req: Request, res: Response) {
    const id = req.userID;

    const mypermissions = await prismaClient.permission.findMany({
      where: { id_admin: Number(id) },
      orderBy: [{ name: "asc" }],
    });

    if (mypermissions.length == 0) {
      return res
        .status(404)
        .json({ message: "Nenhum Permissão foi encontrada." });
    }

    res.status(200).json({ mypermissions });
  }
  static async createColaborator(req: Request, res: Response) {
    const id = req.userID;
    const {
      firstname,
      lasttname,
      cpf,
      rg,
      org_emitter,
      phone,
      email,
      password,
    } = req.body;

    if (!firstname) {
      return res
        .status(422)
        .json({ message: "O Primeiro Nome é obrigatório." });
    }

    if (!lasttname) {
      return res
        .status(422)
        .json({ message: "O Primeiro Nome é obrigatório." });
    }

    if (!cpf) {
      return res
        .status(422)
        .json({ message: "O Primeiro Nome é obrigatório." });
    }

    if (!rg) {
      return res
        .status(422)
        .json({ message: "O Primeiro Nome é obrigatório." });
    }

    if (!org_emitter) {
      return res
        .status(422)
        .json({ message: "O Primeiro Nome é obrigatório." });
    }

    if (!phone) {
      return res
        .status(422)
        .json({ message: "O Primeiro Nome é obrigatório." });
    }

    if (!email) {
      return res
        .status(422)
        .json({ message: "O Primeiro Nome é obrigatório." });
    }

    const checkEmail = await prismaClient.colaborator.findFirst({
      where: { email: email },
    });

    if (checkEmail) {
      return res.status(422).json({
        message: "E-mail inválido, insira outro e-mail para continuar.",
      });
    }

    try {
      const newColab = await prismaClient.colaborator.create({
        data: {
          firstname,
          lasttname,
          cpf,
          rg,
          org_emitter,
          phone,
          email,
          password,
          id_admin: Number(id),
        },
      });
      return res.status(201).json({ message: "Cadastro criado com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async getColaborator(req: Request, res: Response) {
    const id = req.userID;
    const id_colab = req.params.id;

    if (!id_colab) {
      return res
        .status(422)
        .json({ message: "O ID do Colaborador é obrigatório." });
    }

    const colaborator = await prismaClient.colaborator.findUnique({
      where: { id: Number(id_colab) },
      select: {
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
      return res.status(404).json({ message: "Colaborador não encontrado." });
    }

    return res.status(200).json({ colaborator });
  }
  static async updateColaborator(req: Request, res: Response) {
    const id_colab = req.params.id;
    const { firstname, lasttname, cpf, rg, org_emitter, phone } = req.body;

    if (!id_colab) {
      return res
        .status(422)
        .json({ message: "O ID do Colaborador é obrigatório." });
    }

    const checkColab = await prismaClient.colaborator.findUnique({
      where: { id: Number(id_colab) },
    });

    if (!checkColab) {
      return res.status(404).json({ message: "Colaborador não encontrado." });
    }

    if (!firstname) {
      return res
        .status(422)
        .json({ message: "O Primeiro Nome é obrigatório." });
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
      return res
        .status(422)
        .json({ message: "O Orgão Emissor é obrigatório." });
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
      return res
        .status(200)
        .json({ message: "Cadastro atualizado com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async updateColaboratorPassword(req: Request, res: Response) {
    const id_colab = req.params.id;
    const { password, newPassword, confirmPassword } = req.body;

    if (!id_colab) {
      return res
        .status(422)
        .json({ message: "O ID do Colaborador é obrigatório." });
    }

    if (!password) {
      return res.status(422).json({ message: "A Senha Atual é obrigatória." });
    }

    if (!newPassword) {
      return res.status(422).json({ message: "A Nova Senha é obrigatória." });
    }

    if (!confirmPassword) {
      return res
        .status(422)
        .json({ message: "A Confirmação de Senha é obrigatória." });
    }

    const checkColab = await prismaClient.colaborator.findUnique({
      where: { id: Number(id_colab) },
    });

    if (!checkColab) {
      return res.status(404).json({ message: "Colaborador não encontrado." });
    }

    if (password != checkColab.password) {
      return res.status(422).json({ message: "A Senha Atual está incorreta." });
    }

    if (newPassword != confirmPassword) {
      return res
        .status(422)
        .json({ message: "A Nova Senha e a Confirmação não correspondem." });
    }

    try {
      const updateColab = await prismaClient.colaborator.update({
        where: { id: Number(id_colab) },
        data: {
          password,
        },
      });
      return res.status(200).json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async deleteColaborator(req: Request, res: Response) {
    const id = req.userID;
    const id_colab = req.params.id;

    if (!id_colab) {
      return res
        .status(422)
        .json({ message: "O ID do Colaborador é obrigatório." });
    }

    const checkColab = await prismaClient.colaborator.findUnique({
      where: { id: Number(id_colab) },
    });

    if (!checkColab) {
      return res.status(404).json({ message: "Colaborador não encontrado." });
    }

    try {
      const colaborator = await prismaClient.colaborator.delete({
        where: {
          id: Number(id_colab),
        },
      });
      return res
        .status(200)
        .json({ message: "Colaborador excluído com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async configPermissionColaborator(req: Request, res: Response) {
    const id = req.userID;
    const { id_colaborator, id_permission } = req.body;

    if (!id_colaborator) {
      return res.status(422).json({
        message:
          "O ID do Colaborador é obrigatório para adicionar uma Permissão.",
      });
    }

    if (!id_permission) {
      return res.status(422).json({
        message:
          "O ID da Permissão é obrigatório para vincular ao Colaborador.",
      });
    }

    try {
      const addPermission = await prismaClient.colaborator_Permission.create({
        data: {
          id_colaborator,
          id_permission,
        },
      });
      return res
        .status(200)
        .json({ message: "Permissão adicionada com sucesso." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async createTypeStore(req: Request, res: Response) {
    const id = req.userID;

    const { name, image } = req.body;

    if (!name) {
      return res
        .status(422)
        .json({ message: "O Nome do Tipo de Estabelecimento é obrigatório." });
    }

    try {
      const newType = await prismaClient.typeStore.create({
        data: {
          name,
          image,
          id_admin: Number(id),
        },
      });
      return res
        .status(201)
        .json({ message: "Tipo de Estabelecimento criado com sucesso." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async getTypeStore(req: Request, res: Response) {
    const id = req.userID;
    const id_type = req.params.id;

    if (!id_type) {
      return res
        .status(422)
        .json({ message: "O ID do Tipo de Estabelecimento é obrigatório." });
    }

    const type = await prismaClient.typeStore.findUnique({
      where: {
        id: Number(id_type),
      },
    });

    if (!type) {
      return res
        .status(404)
        .json({ message: "Tipo de Estabelecimento não encontrado." });
    }

    return res.status(200).json({ type });
  }
  static async updateTypeStore(req: Request, res: Response) {
    const id = req.userID;
    const id_type = req.params.id;
    const { name, image } = req.body;

    if (!id_type) {
      return res
        .status(422)
        .json({ message: "O ID do Tipo de Estabelecimento é obrigatório." });
    }

    if (!name) {
      return res
        .status(422)
        .json({ message: "O Nome do Tipo de Estabelecimento é obrigatório." });
    }

    const type = await prismaClient.typeStore.findUnique({
      where: {
        id: Number(id_type),
      },
    });

    if (!type) {
      return res
        .status(404)
        .json({ message: "Tipo de Estabelecimento não encontrado." });
    }

    try {
      const updateType = await prismaClient.typeStore.update({
        where: { id: Number(id_type) },
        data: {
          name,
          image,
        },
      });
      return res
        .status(200)
        .json({ message: "Tipo de Estabelecimento atualizado com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async deleteTypeStore(req: Request, res: Response) {
    const id = req.userID;
    const id_type = req.params.id;

    if (!id_type) {
      return res
        .status(422)
        .json({ message: "O ID do Tipo de Estabelecimento é obrigatório." });
    }

    const type = await prismaClient.typeStore.findUnique({
      where: {
        id: Number(id_type),
      },
    });

    if (!type) {
      return res
        .status(404)
        .json({ message: "Tipo de Estabelecimento não encontrado." });
    }

    try {
      const deleteType = await prismaClient.typeStore.delete({
        where: {
          id: Number(id_type),
        },
      });
      return res
        .status(200)
        .json({ message: "Tipo de Estabelecimento excluído com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async getAllTypeStore(req: Request, res: Response) {
    const id = req.userID;

    const types = await prismaClient.typeStore.findMany({
      orderBy: [{ name: "asc" }],
    });

    if (types.length == 0) {
      return res
        .status(404)
        .json({ message: "Nenhum Tipo de Estabelecimento disponível." });
    }

    return res.status(200).json({ types });
  }
  static async getMyTypeStore(req: Request, res: Response) {
    const id = req.userID;

    const types = await prismaClient.typeStore.findMany({
      where: { id_admin: Number(id) },
      orderBy: [{ name: "asc" }],
    });

    if (types.length == 0) {
      return res
        .status(404)
        .json({ message: "Nenhum Tipo de Estabelecimento disponível." });
    }

    return res.status(200).json({ types });
  }
  static async createSpecialitieStore(req: Request, res: Response) {
    const id = req.userID;
    return res.status(200).json({ message: "Adicionar Permissão" });
  }
  static async getPermissionTest(req: Request, res: Response) {
    const id = req.userID;
    const id_colab = 1;

    const teste = await prismaClient.colaborator.findUnique({
      where: { id: id_colab },
      include: {
        permission_colaborator: {
          include: {
            permission: true,
          },
        },
      },
    });

    return res.status(200).json({ teste });
  }
}
