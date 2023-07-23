import { atom } from "recoil";

export const roomFurnitureListState = atom({
    key: "roomFurnitureState",
    default: {
        nextId: 1,
        list: []
    }
})