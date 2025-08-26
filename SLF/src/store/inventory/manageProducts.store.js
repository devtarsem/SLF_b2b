import {create} from 'zustand';
import axios from 'axios'
import Swal from 'sweetalert2'
import {jsPDF} from 'jsPDF'
import autoTable from "jspdf-autotable";
import export_excel from '../../class/excelExport';


const productStore = create(
    (set,get)=>({
        products : [],
        start : 0,
        end : 20,
        particular_product : {},
        particular_ID : '',
        isLoadingManageProduct : false,
        stockUpdationPanel : false,
        setStockUpdatePanelOpen : ()=>{
            set({stockUpdationPanel : true})
        }
        ,
        setStockUpdatePanelFalse : ()=>{
            set({stockUpdationPanel : false})
        }
        ,
        openUpdatePanel : false,
        openingUpdatePanel : async()=>{
            set({openUpdatePanel : true})
        },
       closingUpdatePanel : async()=>{
            set({openUpdatePanel : false, particular_ID : ''})
        },
        fetchingProducts : async(start,end)=>{
            if(start < 0 || end < 0){
                start = 0
                end = 20
            }
            if(localStorage.getItem("SLMProds")){
 
                set({start :start,end :end, products : JSON.parse(localStorage.getItem("SLMProds")).slice(start,end) })
            }else{
                axios({
                    method : "GET",
                    url : "https://demandbackend.onrender.com/api/v1/b2b/products",
                }).then(res=>{
                    if(res.data.status=='success'){
                        localStorage.setItem("SLMProds", JSON.stringify(res.data.data.products))
                        set({products : res.data.data.products.slice(0,20)})
                    }
                })
            }
        }

        ,

        searchproducts : async(start,end, str)=>{
            let nonChnageList = JSON.parse(localStorage.getItem("SLMProds")).slice(start,end);
            nonChnageList = nonChnageList.filter(el=>{
                if(el.name.toLowerCase().includes(str.toLowerCase())){
                    return el
                }
            })
            if(str.trim()==''){
                set({products : JSON.parse(localStorage.getItem("SLMProds")).slice(start,end)})

            }
            set({products : nonChnageList})
        }

        ,

        sortProductList : async(sortingProperty)=>{
            if(sortingProperty == 'Price'){
                set({products : get().products.sort((a,b)=>  a.price - b.price )})
            }else if(sortingProperty == 'Stock'){
                set({products : get().products.sort((a,b)=>  a.stock - b.stock )})
            }else if(sortingProperty == 'Discount'){
                set({products : get().products.sort((a,b)=>  a.discount - b.discount )})
            }
        }

        ,

        SizeFIlterproducts : async(start,end, str)=>{
            let nonChnageList = JSON.parse(localStorage.getItem("SLMProds")).slice(start,end);
            nonChnageList = nonChnageList.filter(el=>{
                if(el.sizes.includes(str)){
                    return el
                }
            })
            if(str.trim()==''){
                set({products : JSON.parse(localStorage.getItem("SLMProds")).slice(start,end)})

            }
            set({products : nonChnageList})
        }

        ,

        particular_productFetch : async(id)=>{
            set({particular_ID : id})
            let list = get().products;
            for(let i = 0; i<list.length; i++){
                if(list[i]._id == id){
                    set({particular_product : list[i]})
                    break;
                }
            }

        }

        ,

        updateProduct : async(product)=>{
            set({isLoadingManageProduct : true})
            axios({
                method : 'POST',
                url : "https://demandbackend.onrender.com/api/v1/b2b/update-product",
                data : {
                    product
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    let list = JSON.parse(localStorage.getItem("SLMProds"))
                    list.forEach(el=>{
                        if(el._id == product._id){
                            el.name = product.name
                            el.description = product.description
                            el.brand = product.brand
                            el.price = product.price
                            el.discount = product.discount
                            // el.sizes = product.sizes.split(",")
                            // el.colors = product.colors
                            el.stock = product.stock
                            el.tags = product.tags
                            el.sku = product.sku
                            el.created_at = product.created_at
                            el.updated_at = product.updated_at
                        }
                    })
                    localStorage.setItem("SLMProds", JSON.stringify(list))
                    set({openUpdatePanel : false, particular_ID : '', isLoadingManageProduct : false})
                    set({products : JSON.parse(localStorage.getItem("SLMProds")).slice(get().start, get().end)})
                    Swal.fire({
                        title: "Updated!",
                        text: "Your product is updated sucessfully.",
                        icon: "success"
                    });
                }
            })
        }

        ,

        DeleteProductsFromDB : async(list)=>{
            set({isLoadingManageProduct : true})
            axios({
                method : 'POST',
                url : "https://demandbackend.onrender.com/api/v1/b2b/delete-products",
                data : {
                    list : list
                }
            }).then(res=>{
                if(res.data.status == 'success'){

                    localStorage.setItem("SLMProds", JSON.stringify(res.data.data.products))
                    set({products : res.data.data.products.slice(get().start, get().end) , isLoadingManageProduct : false})
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product is deleted sucessfully.",
                        icon: "success"
                    });
                }
            })
        }

        ,

        updateStocks : async(stock, sku_id)=>{
            set({isLoadingManageProduct : true})
            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/b2b/inventory-update",
                data : {
                    stock,
                    sku_id
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    localStorage.removeItem("SLMProds")
                    get().fetchingProducts(get().start, get().end)
                    set({stockUpdationPanel : false, isLoadingManageProduct : false})
                }
            })
        }
        ,

        DownLoadProductList : async()=>{
            let list = JSON.parse(localStorage.getItem("SLMProds"))
            const tableBody = list.map((item,index)=>[
                index+1,
                item.sku,
                item.name,
                item.stock.M,
                item.stock.S,
                item.stock.L,
                item.stock.XL,
                item.stock.XXL,
                item.price,
                item.colors,
                item.discount,

            ])

            const doc = new jsPDF();
            let pagewidth = doc.internal.pageSize.getWidth();
            let margin = 14;
            let y = 20;

            doc.setFontSize(18)
            doc.setFont("helvetica", "normal")
            doc.text("Inventory report", pagewidth/2, y, {align : "center"})
            y +=4;
            doc.setLineWidth(0.5);
            doc.line(margin, y, pagewidth-margin,y)
            y += 10;

            doc.setFontSize(12);
            doc.text("Company name : - Skylite Fashions Pvt. Ltd", 14, y)
            y += 6;
            doc.text("GSTIN: 29ABCDE1234F2Z5", 14, y);
            y += 6;
            doc.text("Address: Bathinda, Punjab", 14, y);
            y += 6;
            
            doc.text(`Note* : -: Price values are in INR`, 14, y);
            y += 10;
            doc.line(14, y, 200, y); // divider
            y += 8;


            autoTable(doc, {
                startY : y,
                head : [["#", "SKU", "Name", "M", "S", "L", "XL", "XXL", "Price", "Colors", "Discount"]],
                body : tableBody,
                theme: "grid",
                headStyles: { fillColor: [0, 102, 203], textColor: 255 },
                styles: { fontSize: 10 },
                columnStyles: {
                    5: { halign: "center" },
                    6: { halign: "right" },
                    7: { halign: "right" },
                }
            })

            doc.save("Inventory_report.pdf")

        }
        ,

        downloadInventory_as_excel : async()=>{
            let list = JSON.parse(localStorage.getItem("SLMProds"))
            const arr = list.map((item,index)=>{
                return  {
                    SKU_ID:item._id,
                    sku:item.sku,
                    name:item.name,
                    M : item.stock.M,
                    S:item.stock.S,
                    L:item.stock.L,
                    XL:item.stock.XL,
                    XXL:item.stock.XXL,
                    price:item.price,
                    color:item.colors.join(","),
                    tags:item.tags.join(","),
                    discount:item.discount,
                }
            })
            const excel = new export_excel()
            excel.handleExport(arr, 'Inventory_report')
        }

    })
)

export default productStore