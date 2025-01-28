import { Collection } from "mongodb";
import { Dinosaur, DinosaurModel } from "./types.ts";
import { fromModelToDinosaur } from "./utils.ts";
import { ObjectId } from "mongodb";

export const resolvers = {
    Query: {
        dinosaurs: async (_root:unknown, _args:unknown, context: { DinosaurCollection: Collection<DinosaurModel>}): Promise<Dinosaur[] | null> => {
            const DinosaursDB = await context.DinosaurCollection.find().toArray();
            if(DinosaursDB.length===0) return null;

            const Dinosaurs = DinosaursDB.map((dm:DinosaurModel) => {
                return fromModelToDinosaur(dm);
            });

            return Dinosaurs;
        },
        dinosaur: async (_root:unknown, args:{id:string}, context: { DinosaurCollection: Collection<DinosaurModel>}): Promise<Dinosaur | null> => {
            const DinosaurDbById = await context.DinosaurCollection.findOne({_id: new ObjectId(args.id)});
            if(!DinosaurDbById) return null;

            const DinosaurById = fromModelToDinosaur(DinosaurDbById);
            return DinosaurById;
        },
    },

    Mutation: {
        addDinosaur: async (_root:unknown, args: {name:string, type:string}, context: {DinosaurCollection: Collection<DinosaurModel>}): Promise<Dinosaur | null> => {

            const { name,type } = args;

            const { insertedId } = await context.DinosaurCollection.insertOne({
                name,
                type,
            });

            const Dinosaur = fromModelToDinosaur({
                _id: insertedId,
                name,
                type
            });

            return Dinosaur;
        },

        deleteDinosaur: async (_root:unknown, args:{id:string}, context: {DinosaurCollection: Collection<DinosaurModel>}): Promise<Dinosaur | null> => {

            const dinosaurDB = await context.DinosaurCollection.findOneAndDelete({
                _id: new ObjectId(args.id),
            });

            if(!dinosaurDB) return null;

            const Dinosaur = fromModelToDinosaur(dinosaurDB);

            return Dinosaur;
        }
    },
}