export interface PostagemDB {
  id: string,
  creator_id: string,
  conteudo: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string
}

export interface PostagemDBCreatorConteudo {
  id: string,
  creator_id: string,
  conteudo: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
  creator_conteudo: string,
}

export interface PostagemModel {
  id: string,
  conteudo: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
  creator: {
    id: string,
    conteudo: string
  }
}


export interface LikeDislikeDB {
  user_id: string,
  post_id: string,
  like: number
}

export enum Postagem_Like {
  ALREADY_LIKED = "ALREADY LIKED",
  ALREADY_DISLIKE = "ALERADY DISLIKE"
}

export class Postagem {
  constructor(
    private id: string,
    private conteudo: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorId: string,
    private creatorconteudo: string
  ) { }

  public getId(): string {
    return this.id
  }

  public getonteudoDaPostagem(): string {
    return this.conteudo
  }

  public getLikes(): number {
    return this.likes
  }

  public getDislikes(): number {
    return this.dislikes
  }

  public getCreateAt(): string {
    return this.createdAt
  }

  public getUpdatedAT(): string {
    return this.updatedAt
  }

  public getCreatorId(): string {
    return this.creatorId
  }

  public getCreatorconteudo(): string {
    return this.creatorconteudo
  }

  public setId(value: string): void {
    this.id = value
  }

  public setconteudo(value: string): void {
    this.conteudo = value
  }

  public setLikes(value: number): void {
    this.likes = value
  }

  public addLike = (): void => {
    this.likes++
  }

  public removeLike = () => {
    this.likes--
  }

  public setDislikes(value: number): void {
    this.dislikes = value
  }

  public addDislike = (): void => {
    this.dislikes++
  }

  public removeDislike = (): void => {
    this.dislikes--
  }

  public setCreatedAt(value: string): void {
    this.createdAt = value
  }

  public setUpdatedAt(value: string): void {
    this.updatedAt = value
  }

  public setCreatorId(value: string): void {
    this.creatorId = value
  }

  public setCreatorconteudo(value: string): void {
    this.creatorconteudo = value
  }

  public toDBModel(): PostagemDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      conteudo: this.conteudo,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }

  public toBusinessModel(): PostagemModel {
    return {
      id: this.id,
      conteudo: this.conteudo,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      creator: {
        id: this.creatorId,
        conteudo: this.creatorconteudo
      }
    }
  }

}