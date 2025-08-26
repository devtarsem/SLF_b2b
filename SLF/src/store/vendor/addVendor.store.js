import {create} from 'zustand'
import axios from 'axios'
import Swal from 'sweetalert2'


const addVendorStore = create(
    (set,get)=>({
        isLoadingVendor : false,
        addVendorToDB : async(obj)=>{
            set({isLoadingVendor : true})
            axios({
                method : 'POST',
                url : "http://127.0.0.1:3003/api/v1/b2b_vendor/add-vendor",
                data : {
                    data : obj
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    localStorage.setItem("SLMVendors", JSON.stringify(res.data.data.vendors))
                    set({isLoadingVendor : false})
                    Swal.fire({
                        title: "Added!",
                        text: "Your vendor is added sucessfully.",
                        icon: "success"
                    });
                }
            })
        }
    })
)

export default addVendorStore