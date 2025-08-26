import {create} from 'zustand';
import axios from 'axios'
import Swal from 'sweetalert2'
const authStore = create(
    (set,get)=>({
        AuthNeeded : true,
        isLaoding : false,
        checkAuth : async()=>{
            if(localStorage.getItem("SLMAdminAuth")){
                set({AuthNeeded : false})
            }else{
                set({AuthNeeded : true})
            }
        }
        ,
        openAccount : async(phone, role,password)=>{
            set({isLaoding : true})
            axios({
                method : 'POST',
                url : "https://demandbackend.onrender.com/api/v1/b2b_auth/open-acc",
                data : {
                    phone,
                    role,
                    password
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    localStorage.setItem('SLMAdminAuth', JSON.stringify(res.data.data.user))
                    set({AuthNeeded : false, isLaoding : false})
                }
            })
        }

        ,

        LoginAccount : async(phone,password)=>{
            set({isLaoding : true})
            axios({
                method : 'POST',
                url : "https://demandbackend.onrender.com/api/v1/b2b_auth/login-acc",
                data : {
                    phone,
                    password
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    localStorage.setItem('SLMAdminAuth', JSON.stringify(res.data.data.user))
                    set({AuthNeeded : false, isLaoding : false})
                }else{
                    console.log(res.data.data.msg)
                }
            })
        }
    })
)

export default authStore