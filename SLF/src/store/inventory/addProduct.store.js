import {create} from 'zustand'
import axios from 'axios'
import Swal from 'sweetalert2'

const addProductStore = create(
    (set,get)=>({
        isLoadingProduct : false,
        addProductsToDB : async(obj)=>{
            set({isLoadingProduct : true})
            axios({
                method : "POST",
                url : "http://127.0.0.1:3003/api/v1/b2b/add-products",
                data : {
                    data : obj
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    set({isLoadingProduct : false})
                    console.log(res.data)
                    localStorage.setItem("SLMProds", JSON.stringify(res.data.data.products))
                    
                    Swal.fire({
                        title: "Congratulations!",
                        text: "Your product is added.",
                        icon: "success"
                    });
                }
            })
        }
    })
)

export default addProductStore;