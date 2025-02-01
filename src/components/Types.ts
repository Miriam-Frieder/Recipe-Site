
export type User={
    id?:number,
    firstName?: String,
    lastName?: String,
    email:String,
    password?: String,
    address?:String,
    phone?:String
}

export type Recipe = {
    id?:number,
    title: string,
    description: string,
    ingredients:string[],
    instructions:string,
    authorId:number,
    image?:string,

}

export type RecipeFormType=Omit<Recipe,'id'|'authorId'|'img'>


