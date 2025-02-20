import { OptionalId } from "mongodb";

export type Dinosaur = {
    id: string,
    name: string,
    type: string
}

export type DinosaurModel = OptionalId<{
    name: string,
    type: string
}>;