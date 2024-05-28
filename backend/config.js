import 'dotenv/config'

export const PORT = 5555;
export const mongoDBURL =  "mongodb+srv://"+process.env.MONGO_NAME+":"+process.env.MONGO_PASSWORD+"@blogdb.4p8kao9.mongodb.net/blogs-collection?retryWrites=true&w=majority&appName=BlogDB";