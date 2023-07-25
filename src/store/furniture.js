import { atom } from "recoil";

export const roomFurnitureState = atom({
    key: "roomFurnitureState",
    default: {
        nextId: 1,
        list: [],
        initialList: []
    }
})

export const saveLoading = atom({
    key: "saveLoading",
    default: false
})