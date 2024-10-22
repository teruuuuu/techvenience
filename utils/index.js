import { GENRE_ENUM } from "../const"

export const createDatabaseId = (genre) =>{
    let databaseId = 'bf3da636b9d84ab18f3ad0d242584468'//process.env.NEXT_PUBLIC_NOTION_AI_DATABASE_ID;
    if(genre){
      if(genre == GENRE_ENUM.GENRE1){
        databaseId = 'bf3da636b9d84ab18f3ad0d242584468'//process.env.NEXT_PUBLIC_NOTION_AI_DATABASE_ID;
      } else if (genre == GENRE_ENUM.GENRE2){
        databaseId = '4d56306f63f64a2da673e51f11f6a8e9'//process.env.NEXT_PUBLIC_NOTION_DESIGN_DATABASE_ID;
      } else if (genre == GENRE_ENUM.GENRE3){
        databaseId = 'c2721f6750654d7d84a10abab25c0e9c'//process.env.NEXT_PUBLIC_NOTION_TIME_DATABASE_ID;
      } else if (genre == GENRE_ENUM.GENRE4){
        databaseId = '301632c9a07c4b0d9e9138b4452b12be'//process.env.NEXT_PUBLIC_NOTION_TECH_DATABASE_ID;
      }
    }
    return databaseId
}