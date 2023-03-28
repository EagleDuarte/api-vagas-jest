import { UserModel } from "./user.model";

export class CandidateModel extends UserModel {
  constructor(
    nome: string,
    username: string,
    senha: string
  ) {
    super(nome, username, senha, 'C');
  }
}