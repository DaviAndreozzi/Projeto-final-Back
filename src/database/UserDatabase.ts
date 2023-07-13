import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
  public static TABLE_USERS = "users"
  // criando um usuario
  
  public insertUser = async (userDB: UserDB): Promise<void> => {
    console.log(userDB);
    
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .insert(userDB)      
  }
  // logando em um usario

  public async findUserByEmail(
    email: string
  ): Promise<UserDB | undefined> {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ email })

    return userDB
  }
}