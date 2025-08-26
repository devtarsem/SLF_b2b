import {create} from 'zustand'
import axios from 'axios'

const poStore = create(
    (set, get)=>({
        Vendors : [],
        Products : [],
        poItems : [],
        bill : 0,
        fetchVendors: async()=>{
            if(localStorage.getItem('SLMVendors')){
                let vendors = JSON.parse(localStorage.getItem("SLMVendors"))
                set({Vendors : vendors})
            }else{
                axios({
                    method : "GET",
                    url : "http://127.0.0.1:3003/api/v1/b2b_vendor/vendors",
                    
                }).then(res=>{
                    if(res.data.status == 'success'){
                        localStorage.setItem("SLMVendors", JSON.stringify(res.data.data.vendors))
                        set({Vendors : res.data.data.vendors})
                    }
                })
            }
        }
        ,
        fetchingProducts : async()=>{
            
            if(localStorage.getItem("SLMProds")){

                set({Products : JSON.parse(localStorage.getItem("SLMProds"))})
            }else{
                axios({
                    method : "GET",
                    url : "http://127.0.0.1:3003/api/v1/b2b/products",
                }).then(res=>{
                    if(res.data.status=='success'){
                        localStorage.setItem("SLMProds", JSON.stringify(res.data.data.products))
                        set({Products : res.data.data.products})
                    }
                })
            }
        }

        ,

        addingPoItems : async(item, cp, units)=>{
            console.log(JSON.parse(item))
            let itemP = JSON.parse(item)
            itemP.cp = cp
            itemP.units = units
            
            set({ poItems : [...get().poItems, itemP]})
            
            let billItems = get().poItems
            let sum = 0
            billItems.forEach(el=>{
                sum += Number(el.units*el.cp)
            })
            sum = sum + sum*0.18
            set({bill : sum})
        }
        ,
        generatePODB : async(vendor, sku, bill, tax)=>{
            console.log(vendor)
            axios({
                method : "POST",
                url : "http://127.0.0.1:3003/api/v1/b2b_po/PO",
                data : {
                    vendor,
                    sku,
                    bill,
                    tax
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    set({poItems : [], bill : 0})
                }
            })
        }
    })
)

export default poStore