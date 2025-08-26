import {create} from 'zustand'
import axios from 'axios'
import {jsPDF} from 'jsPDF'
import autoTable from "jspdf-autotable";
import export_excel from '../../class/excelExport';


const manageVendorStore = create(
    (set, get)=>({
        Vendors : [],
        start : 0,
        end : 10,
        particular_update_vendorID :'',
        particularvendor : {},
        updatePanelStatus : false,
        isLoadingvendor : false,
        selectedVendors : [],

        selectVendors : async(id)=>{
            set({selectedVendors : [...get().selectedVendors, id]})
        },

        deletevendors : async(list)=>{
            set({isLoadingvendor : true})
            axios({
                method : 'POST',
                url : 'https://demandbackend.onrender.com/api/v1/b2b_vendor/delete-vendor',
                data : {
                    list
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    localStorage.setItem("SLMVendors", JSON.stringify(res.data.data.vendors))
                    set({selectedVendors : [], Vendors : res.data.data.vendors.slice(get().start, get().end), isLoadingvendor : false})
                }
            })
        },

        openUpdatePanelVendo : async()=>{
            set({updatePanelStatus : true})
        }
        ,
        closeUpdatePanelVendo : async()=>{
            set({updatePanelStatus : false, particular_update_vendorID : ''})
        }
        ,

        updatingVendor : async(obj)=>{
            set({particularvendor : obj,  particular_update_vendorID : obj._id})
            
        },

        FinalUpdateToDB : async(obj)=>{
            set({isLoadingvendor : true})
            axios({
                method : 'POST',
                url : "https://demandbackend.onrender.com/api/v1/b2b_vendor/update-vendor",
                data : {
                    data : obj
                }
            }).then(res=>{
                if(res.data.status=='success'){
                    let vendors = JSON.parse(localStorage.getItem("SLMVendors"))
                    vendors.forEach(el=>{
                        if(el._id == obj._id){
                            el.name = obj.name,
                            el.phone = obj.phone
                            el.catagory = obj.catagory
                            el.payable = obj.payable
                            el.receiable = obj.receiable
                            el.address = obj.address
                        }
                    })

                    localStorage.setItem("SLMVendors", JSON.stringify(vendors))
                    set({updatePanelStatus : false,particular_update_vendorID : '', isLoadingvendor : false, Vendors : vendors.slice(get().start, get().end)})
                }
            })
        }
        ,

        nextPaginationVendors : async()=>{
            let vendors = JSON.parse(localStorage.getItem("SLMVendors")).slice(get().start+10, get().end+10)
            set({start : get().start+10, end : get().end+10, Vendors : vendors})
        },
        prevPaginationVendors : async()=>{
            let vendors = JSON.parse(localStorage.getItem("SLMVendors")).slice(get().start-10>0 ? get().start-10 : 0, get().end-10 >0 ? get().end-10 : 10)
            set({start : get().start-10>0 ? get().start-10 : 0, end : get().end-10 >0 ? get().end-10 : 10, Vendors : vendors})
        },
        fetchVendors: async()=>{
            if(localStorage.getItem('SLMVendors')){
                let vendors = JSON.parse(localStorage.getItem("SLMVendors")).slice(get().start, get().end)
                set({Vendors : vendors.slice(get().start, get().end)})
            }else{
                axios({
                    method : "GET",
                    url : "https://demandbackend.onrender.com/api/v1/b2b_vendor/vendors",
                    
                }).then(res=>{
                    if(res.data.status == 'success'){
                        localStorage.setItem("SLMVendors", JSON.stringify(res.data.data.vendors))
                        set({Vendors : res.data.data.vendors.slice(get().start, get().end)})
                    }
                })
            }
        }

        ,

        searchVendors : async(start,end, str)=>{
            let nonChnageList = JSON.parse(localStorage.getItem("SLMVendors")).slice(start,end);
            nonChnageList = nonChnageList.filter(el=>{
                if(el.name.toLowerCase().includes(str.toLowerCase())){
                    return el
                }
            })
            if(str.trim()==''){
                set({Vendors : JSON.parse(localStorage.getItem("SLMVendors")).slice(start,end)})
              }
            set({Vendors : nonChnageList})
        }

        ,
        sortVendorList : async(sortingProperty)=>{
            if(sortingProperty == 'Receiables'){
                set({Vendors : get().Vendors.sort((a,b)=>  a.receiable - b.receiable )})
            }else if(sortingProperty == 'Payables'){
                set({Vendors : get().Vendors.sort((a,b)=>  a.payable - b.payable )})
            }
        }

        ,

        DownLoadVendorList : async()=>{
            let list = JSON.parse(localStorage.getItem("SLMVendors"));
            const tableBody = list.map((item,index)=>[
                index+1,
                item.name,
                item.address,
                item.phone,
                item.catagory,
                item.receiable,
                item.payable
            ])

            const doc = new jsPDF();
            let pagewidth = doc.internal.pageSize.getWidth();
            let margin = 14;
            let y = 20;

            doc.setFontSize(18)
            doc.setFont("helvetica", "normal")
            doc.text("Vendors report", pagewidth/2, y, {align : "center"})
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
            
            doc.text(`Note* : -: All values are in INR`, 14, y);
            y += 10;
            doc.line(14, y, 200, y); // divider
            y += 8;


            autoTable(doc, {
                startY : y,
                head : [["#", "Vendor name", "Address", "Phone", "Catagory", "Receiable", "Payable"]],
                body : tableBody,
                theme: "striped",
                headStyles: { fillColor: [0, 102, 203], textColor: 255 },
                styles: { fontSize: 10 },
                columnStyles: {
                    5: { halign: "center" },
                    6: { halign: "right" },
                    7: { halign: "right" },
                }
            })

            doc.save("Vendors.pdf")
        }

        ,

        export_vendors_to_excel : async()=>{
            let list = JSON.parse(localStorage.getItem("SLMVendors"));
            const excel = new export_excel()
            excel.handleExport(list, 'Vendors')
        }
    })
)

export default manageVendorStore