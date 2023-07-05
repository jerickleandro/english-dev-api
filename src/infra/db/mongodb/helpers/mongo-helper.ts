import { Db, MongoClient, MongoClientOptions } from "mongodb";


export const MongoHelper = {
    connection: null as MongoClient,
    async connect (uri: string): Promise<void> {
        this.connection = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as MongoClientOptions);
    },
    async disconnect (): Promise<void> {
        await this.connection.close()
    }
}