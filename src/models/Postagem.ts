export interface PostagemDB {
  id: string,
  creator_id: string,
  conteudoDaPostagem: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string
}

export interface PostagemDBCreatorconteudoDaPostagem {
  id: string,
  creator_id: string,
  conteudoDaPostagem: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
  creator_conteudoDaPostagem: string,
}

export interface PostagemModel {
  id: string,
  conteudoDaPostagem: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
  creator: {
    id: string,
    conteudoDaPostagem: string
  }
}


export interface LikeDislikeDB {
  user_id: string,
  postagens_id: string,
  like: number
}

export enum Postagem_Like {
  ALREADY_LIKED = "ALREADY LIKED",
  ALREADY_DISLIKE = "ALERADY DISLIKE"
}

export class Postagem {
  constructor(
    private id: string,
    private conteudoDaPostagem: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorId: string,
    private creatorconteudoDaPostagem: string
  ) { }

  public getId(): string {
    return this.id
  }

  public getonteudoDaPostagem(): string {
    return this.conteudoDaPostagem
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

  public getCreatorConteudoDaPostagem(): string {
    return this.creatorconteudoDaPostagem
  }

  public setId(value: string): void {
    this.id = value
  }

  public setConteudoDaPostagem(value: string): void {
    this.conteudoDaPostagem = value
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

  public setCreatorConteudoDaPostagem(value: string): void {
    this.creatorconteudoDaPostagem = value
  }

  public toDBModel(): PostagemDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      conteudoDaPostagem: this.conteudoDaPostagem,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }

  public toBusinessModel(): PostagemModel {
    return {
      id: this.id,
      conteudoDaPostagem: this.conteudoDaPostagem,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      creator: {
        id: this.creatorId,
        conteudoDaPostagem: this.creatorconteudoDaPostagem
      }
    }
  }

}