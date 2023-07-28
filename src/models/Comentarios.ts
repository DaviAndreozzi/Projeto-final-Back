export interface ComentariosDB {
  id: string,
  creator_id: string,
  comentarios: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string
}

export interface ComentariosDBCreatorcomentarios {
  id: string,
  creator_id: string,
  comentarios: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
  creator_comentarios: string,
}

export interface ComentariosModel {
  id: string,
  comentarios: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
  creator: {
    id: string,
    comentarios: string
  }
}


export interface LikeDislikeDB {
  user_id: string,
  comentarios_id: string,
  like: number
}

export enum Comentarios_Like {
  ALREADY_LIKED = "ALREADY LIKED",
  ALREADY_DISLIKE = "ALERADY DISLIKE"
}

export class Comentarios {
  constructor(
    private id: string,
    private comentarios: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorId: string,
    private creatorcomentarios: string
  ) { }

  public getId(): string {
    return this.id
  }

  public getcomentarios(): string {
    return this.comentarios
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

  public getCreatorComentarios(): string {
    return this.creatorcomentarios
  }

  public setId(value: string): void {
    this.id = value
  }

  public setComentarios(value: string): void {
    this.comentarios = value
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

  public setCreatorComentarios(value: string): void {
    this.creatorcomentarios = value
  }

  public toDBModel(): ComentariosDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      comentarios: this.comentarios,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }

  public toBusinessModel(): ComentariosModel {
    return {
      id: this.id,
      comentarios: this.comentarios,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      creator: {
        id: this.creatorId,
        comentarios: this.creatorcomentarios
      }
    }
  }

}