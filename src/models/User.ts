export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

export interface TokenPayload {
  id: string,
  apelido: string,
  role: USER_ROLES
}

export interface UserDB {
  id: string,
  apelido: string,
  email: string,
  password: string,
  role: USER_ROLES,
  created_at: string
}

export interface UserModel {
  id: string,
  apelido: string,
  email: string,
  role: USER_ROLES,
  createdAT: string
}

export class User {
  constructor(
    private id: string,
    private apelido: string,
    private email: string,
    private password: string,
    private role: USER_ROLES,
    private createdAT:string
  ) { }

  public getId():string{
    return this.id
  }

  public getApelido():string{
    return this.apelido
  }

  public getEmail():string{
    return this.email
  }

  public getPassword():string{
    return this.password
  }
  public getRole():USER_ROLES {
    return this.role
  }

  public getCreatedAt(): string {
    return this.createdAT
  }

  public setId(value: string): void {
    this.id = value
  }

  public setApelido(value: string): void {
    this.apelido = value
  }

  public setEmail(value: string): void {
    this.email = value
  }

  public setPassword(value: string): void {
    this.password = value
  }

  public setRole(value: USER_ROLES): void {
    this.role = value
  }

  public setCreatedAt(value: string): void {
    this.createdAT = value
  }

  public toDBModel(): UserDB {
    return {
      id: this.id,
      apelido: this.apelido,
      email: this.email,
      password: this.password,
      role: this.role,
      created_at: this.createdAT
    }
  }

  public toBusinessModel(): UserModel {
    return {
      id: this.id,
      apelido: this.apelido,
      email: this.email,
      role: this.role,
      createdAT: this.createdAT
    }
  }
}

  