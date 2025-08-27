import {create} from 'zustand'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./../../firebase";

const addProductStore = create(
    (set,get)=>({
        isLoadingProduct : false,
        addProductsToDB : async(obj)=>{
            set({isLoadingProduct : true})
            let images = obj.images;

            // Storing to firebase
            const urls = []
            for(const file of images){
                const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
                const task = await uploadBytesResumable(storageRef, file);
                const url = await getDownloadURL(task.ref);
                urls.push(url);
            }

            obj.images = urls;

            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/b2b/add-products",
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