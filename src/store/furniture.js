import { atom } from "recoil";

export const roomFurnitureState = atom({
    key: "roomFurnitureState",
    default: {
        nextId: 1,
        list: [],
        initialList: []
    }
})