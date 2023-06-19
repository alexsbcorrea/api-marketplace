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
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!id_colab) {
      return res
        .status(422)
        .json({ message: "O ID do Colaborador é obrigatório." });
    }

    if (!currentPassword) {
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

    if (currentPassword != checkColab.password) {
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
          password: newPassword,
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
  static async getAllColaborators(req: Request, res: Response) {
    const id = req.userID;

    const colabs = await prismaClient.colaborator.findMany();

    if (colabs.length == 0) {
      return res
        .status(404)
        .json({ message: "Nenhum colaborador encontrado." });
    }

    return res.status(200).json({ allcolaborators: colabs });
  }
  static async getMyColaborators(req: Request, res: Response) {
    const id = req.userID;

    const mycolabs = await prismaClient.colaborator.findMany({
      where: { id_admin: Number(id) },
    });

    if (mycolabs.length == 0) {
      return res
        .status(404)
        .json({ message: "Nenhum colaborador encontrado." });
    }

    return res.status(200).json({ mycolaborators: mycolabs });
  }
  static async addPermissionColaborator(req: Request, res: Response) {
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
  static async removePermissionColaborator(req: Request, res: Response) {
    const id = req.userID;
    const { id_colaborator, id_permission } = req.body;

    if (!id_colaborator) {
      return res.status(422).json({
        message: "O ID do Colaborador é obrigatório para remover Permissão.",
      });
    }

    if (!id_permission) {
      return res.status(422).json({
        message:
          "O ID da Permissão é obrigatório para desvincular do Colaborador.",
      });
    }

    try {
      const removePermission =
        await prismaClient.colaborator_Permission.deleteMany({
          where: {
            id_colaborator,
            id_permission,
          },
        });
      return res
        .status(200)
        .json({ message: "Permissão excluída com sucesso." });
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
  static async updateTypeStoreName(req: Request, res: Response) {
    const id = req.userID;
    const id_type = req.params.id;
    const { name } = req.body;

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
  static async updateTypeStoreImage(req: Request, res: Response) {
    const id = req.userID;
    const id_type = req.params.id;

    let image = "png";

    console.log(req.file);

    if (req.file) {
      console.log(req.file);
      image = req.file.filename;
    }

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
      const updateType = await prismaClient.typeStore.update({
        where: { id: Number(id_type) },
        data: {
          image,
        },
      });
      return res.status(200).json({
        message: "Foto do Tipo de Estabelecimento atualizado com sucesso.",
      });
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

    return res.status(200).json({ alltypes: types });
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

    return res.status(200).json({ mytypes: types });
  }
  static async createSpecialitieStore(req: Request, res: Response) {
    const id = req.userID;
    const { name } = req.body;

    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    if (!name) {
      return res
        .status(422)
        .json({ message: "O Nome da Especialidade é obrigatório." });
    }

    try {
      const newspec = await prismaClient.specialitieStore.create({
        data: {
          name,
          image,
          id_admin: Number(id),
        },
      });
      return res
        .status(201)
        .json({ message: "Especialidade criada com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async getSpecialitieStore(req: Request, res: Response) {
    const id = req.userID;
    const id_spec = req.params.id;

    if (!id_spec) {
      return res
        .status(422)
        .json({ message: "O ID da Especialidade é obrigatório." });
    }

    const specialitie = await prismaClient.specialitieStore.findUnique({
      where: { id: Number(id_spec) },
    });

    if (!specialitie) {
      return res.status(404).json({ message: "Especialidade não encontrada." });
    }

    return res.status(200).json({ specialitie });
  }
  static async updateNameSpecialitieStore(req: Request, res: Response) {
    const id = req.userID;
    const id_spec = req.params.id;
    const { name } = req.body;

    if (!id_spec) {
      return res
        .status(422)
        .json({ message: "O ID da Especialidade é obrigatório." });
    }

    if (!name) {
      return res
        .status(422)
        .json({ message: "O Nome da Especialidade é obrigatório." });
    }

    const CheckSpec = await prismaClient.specialitieStore.findUnique({
      where: {
        id: Number(id_spec),
      },
    });

    if (!CheckSpec) {
      return res.status(404).json({ message: "Especialidade não encontrada." });
    }

    try {
      const updateSpec = await prismaClient.specialitieStore.update({
        where: { id: Number(id_spec) },
        data: {
          name,
        },
      });
      return res
        .status(200)
        .json({ message: "Especialidade atualizada com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async updateImageSpecialitieStore(req: Request, res: Response) {
    const id = req.userID;
    const id_spec = req.params.id;
    let image = "";

    if (!id_spec) {
      return res
        .status(422)
        .json({ message: "O ID da Especialidade é obrigatório." });
    }

    const CheckSpec = await prismaClient.specialitieStore.findUnique({
      where: {
        id: Number(id_spec),
      },
    });

    if (!CheckSpec) {
      return res.status(404).json({ message: "Especialidade não encontrada." });
    }

    if (req.file) {
      image = req.file.filename;
    }

    try {
      const updateSpec = await prismaClient.specialitieStore.update({
        where: { id: Number(id_spec) },
        data: {
          image,
        },
      });
      return res
        .status(200)
        .json({ message: "Foto da Especialidade atualizada com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async deleteSpecialitieStore(req: Request, res: Response) {
    const id = req.userID;
    const id_spec = req.params.id;

    if (!id_spec) {
      return res
        .status(422)
        .json({ message: "O ID da Especialidade é obrigatório." });
    }

    const CheckSpec = await prismaClient.specialitieStore.findUnique({
      where: {
        id: Number(id_spec),
      },
    });

    if (!CheckSpec) {
      return res.status(404).json({ message: "Especialidade não encontrada." });
    }

    try {
      const removeSpec = await prismaClient.specialitieStore.delete({
        where: { id: Number(id_spec) },
      });
      return res
        .status(200)
        .json({ message: "Especialidade excluída com sucesso." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async addPayment(req: Request, res: Response) {
    const id = req.userID;
    const { value, reference, date, id_store } = req.body;
    const id_admin = id;

    if (!value) {
      return res
        .status(422)
        .json({ message: "O Valor do Pagamento é obrigatório." });
    }
    if (!reference) {
      return res
        .status(422)
        .json({ message: "O Mês de Referência do Pagamento é obrigatório." });
    }
    if (!date) {
      return res
        .status(422)
        .json({ message: "A Data do Pagamento é obrigatória." });
    }
    if (!id_store) {
      return res.status(422).json({ message: "O ID da Loja é obrigatório." });
    }

    try {
      const newPayment = await prismaClient.paymentsforService.create({
        data: {
          value,
          reference,
          date,
          id_store,
          id_admin: Number(id_admin),
        },
      });
      return res
        .status(201)
        .json({ message: "Pagamento cadastrado com sucesso." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
  static async getPayment(req: Request, res: Response) {
    const id = req.userID;
    const id_pay = req.params.id;

    const payment = await prismaClient.paymentsforService.findUnique({
      where: { id: Number(id_pay) },
    });

    if (!payment) {
      return res.status(404).json({ message: "Pagamento não encontrado." });
    }

    return res.status(422).json({ payment });
  }
  static async updatePayment(req: Request, res: Response) {
    const id = req.userID;
    const id_pay = req.params.id;
    const { value, reference, date, id_store } = req.body;
    const id_admin = id;

    if (!value) {
      return res
        .status(422)
        .json({ message: "O Valor do Pagamento é obrigatório." });
    }
    if (!reference) {
      return res
        .status(422)
        .json({ message: "O Mês de Referência do Pagamento é obrigatório." });
    }
    if (!date) {
      return res
        .status(422)
        .json({ message: "A Data do Pagamento é obrigatória." });
    }
    if (!id_store) {
      return res.status(422).json({ message: "O ID da Loja é obrigatório." });
    }

    try {
      const newPayment = await prismaClient.paymentsforService.update({
        where: { id: Number(id_pay) },
        data: {
          value,
          reference,
          date,
          id_store,
          id_admin: Number(id_admin),
        },
      });
      return res
        .status(201)
        .json({ message: "Pagamento atualizado com sucesso." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente mais tarde." });
    }
  }
}
