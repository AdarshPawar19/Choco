import {create} from 'zustand'

type NewWareHouseSchema={
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void
}

export const useNewWareHouse =create<NewWareHouseSchema>((set)=>{
    return {
        isOpen:false,//initialState
        onOpen:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
    }
})