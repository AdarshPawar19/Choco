import {create} from 'zustand'

type NewDeliveryPersonSchema={
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void
}

export const useNewDeliveryPerson =create<NewDeliveryPersonSchema>((set)=>{
    return {
        isOpen:false,//initialState
        onOpen:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
    }
})