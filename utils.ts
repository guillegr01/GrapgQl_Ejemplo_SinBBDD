import { Dinosaur, DinosaurModel } from "./types.ts";

export const fromModelToDinosaur = (dm:DinosaurModel) : Dinosaur => {
    return {
        id: dm._id!.toString(),
        name: dm.name,
        type: dm.type
    }
}