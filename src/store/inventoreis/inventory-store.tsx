import {create} from 'zustand'

type NewInventoriesState={
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void
}

export const useNewInventorieState =create<NewInventoriesState>((set)=>{
    return {
        isOpen:false,//initialState
        onOpen:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
    }
})