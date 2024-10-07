import {create} from 'zustand'

type NewProductSchema={
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void
}

export const useNewProduct =create<NewProductSchema>((set)=>{
    return {
        isOpen:false,
        onOpen:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
    }
})