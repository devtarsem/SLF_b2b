import {create} from 'zustand'
import axios from 'axios'
import Swal from 'sweetalert2'

const homeStore = create(
    (set,get)=>({
        isLoading : false,
        credentails : {},
        fetchingCredentials : async()=>{
            set({isLoading : true})
            axios({
                method : "GET",
                url : "http://127.0.0.1:3003/api/v1/b2b_auth/creds",
            }).then(res=>{
                if(res.data.status=='success'){
                    set({isLoading : false, credentails : res.data.data.creds})
                }
            })

        }
    })
)

export default homeStore