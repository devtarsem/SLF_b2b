import {create} from 'zustand'
import axios from 'axios' 
import jsPDF from 'jsPDF'
import autoTable from "jspdf-autotable";

const ongoingStore = create(
    (set, get)=>({
        orders : [],
        start_date : '',
        end_date : '',
        isLoadingOrders : false,
        startPage : 0,
        endPage : 5,
        detail_order : {},
        sku_open : false,
        SKU : [],

        openSKUPanel : async()=>{
            set({sku_open : true})
        },

        closeSKUPanel : async()=>{
            set({sku_open : false})
        },

        nextOnPagination : async()=>{
            let orders = JSON.parse(localStorage.getItem("SKMOrders")).orders
            set({startPage : get().startPage+5, endPage : get().endPage +5,  orders : orders.slice(get().startPage+5 , get().endPage+5)})
        }
        ,
        prevOnpagination : async()=>{
            let orders = JSON.parse(localStorage.getItem("SKMOrders")).orders
            set({startPage : get().startPage-5>0 ? get().startPage-5 : 0, endPage : get().endPage-5>0 ? get().endPage-5 : 5 ,  orders : orders.slice(get().startPage-5>0 ? get().startPage-5:0 , get().endPage-5>0 ? get().endPage-5 : 5)})
        }
        ,

        fetchOrders : async(start, end)=>{
            set({isLoadingOrders : true})
            axios({
                method : "POST",
                url : "http://127.0.0.1:3003/api/v1/b2b_order/orders",
                data : {
                    start , end
                }
            }).then(res=>{
                if(res.data.status=='success'){
                    set({orders : res.data.data.orders.slice(get().startPage, get().endPage), isLoadingOrders : false})
                    console.log("we are here")
                    console.log(res.data.data.orders)
                    localStorage.setItem("SKMOrders", JSON.stringify({
                        start : start,
                        end : end,
                        orders : res.data.data.orders
                    }))
                }
            })
        }

        ,

        cacheOrders : async()=>{
            if(localStorage.getItem("SKMOrders")){
                const data = JSON.parse(localStorage.getItem("SKMOrders"))
                console.log(data)
                set({orders : data.orders.slice(get().startPage, get().endPage), start_date : data.start, end_date : data.end})
            }else{
                set({orders : [], start_date :'', end_date : ''})
            }
        }
        ,

        fetchingParticular_order : async(id)=>{

            let Orders = JSON.parse(localStorage.getItem("SKMOrders")).orders
            Orders = Orders.filter(el=>{
                if(el._id == id){
                    return el
                }
            })
            console.log(Orders)
            set({detail_order : Orders[0]})
        }

        ,

        changing_order_status : async(status,id)=>{
            set({isLoadingOrders : true})
            let data = {}

            let {start,end} = JSON.parse(localStorage.getItem("SKMOrders"))

            if(status == 'success' || status=='pending'){
                data = {
                    type : 'payment',
                    status : status
                }
            }else if(status == 'Not dispatched' || status=='Dispatched'){
                data = {
                    type : 'transit',
                    status : status
                }
            }else if(status == 'Not delivered' || status=='Delivered' || status=='out of delivery'){
                data = {
                    type : 'delivery',
                    status : status
                }
            }else if(status == 'persist' || status=='cancelled'){
                data = {
                    type : 'cancel',
                    status : status
                }
            }else if(status == 'sended' || status=='not send'){
                data = {
                    type : 'vendor',
                    status : status
                }
            }else if(status == 'no return' || status=='return'){
                data = {
                    type : 'return',
                    status : status
                }
            }else if(status == 'accepted' || status=='refund'){
                data = {
                    type : 'refund',
                    status : status
                }
            }


            axios({
                method : 'POST',
                url : 'http://127.0.0.1:3003/api/v1/b2b_order/status-change',
                data : {
                   data ,
                   start,
                   end,
                   id
                }
            }).then(res=>{
                if(res.data.status=='success'){
                    set({isLoadingOrders : false, orders : res.data.data.orders.slice(get().start, get().end), isLoadingOrders : false})
                    localStorage.setItem("SKMOrders", JSON.stringify({
                        start : start,
                        end : end,
                        orders : res.data.data.orders
                    }))
                    get().fetchingParticular_order(id)
                }
            })
        }

        ,

        searchOrder : async(start,end, str)=>{
            let nonChnageList = JSON.parse(localStorage.getItem("SKMOrders")).orders.slice(start,end);
            nonChnageList = nonChnageList.filter(el=>{
                if(el.user_id.includes(str)){
                    return el
                }
            })
            if(str.trim()==''){
                set({orders : JSON.parse(localStorage.getItem("SKMOrders")).orders.slice(start,end)})
              }
            set({orders : nonChnageList})
        }

        ,
        sortOrderList : async(sortingProperty)=>{
            if(sortingProperty == 'Items'){
                set({orders : get().orders.sort((a,b)=>  a.order_items.length - b.order_items.length )})
            }else if(sortingProperty == 'payment'){
                set({orders : get().orders.sort((a,b)=>  a.total_bill - b.total_bill )})
            }
        }

        ,

        SKUFetching : async(list)=>{
            axios({
                method : "POST",
                url : "http://127.0.0.1:3003/api/v1/b2b_order/sku-fetch",
                data : {
                    list
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    set({SKU : res.data.data.SKU})
                }
            })
        }
        ,
        InvoiceGeneration : async(items, gross, tax, totalbill, customerName, customerPhone, customerAddress )=>{
            const tableBody = items.map((item, index) => [
                index + 1,                  // Sr No
                item.name,                  // Product Name
                item.brand,                 // Brand
                item.color,                 // Color
                item.size,                  // Size
                item.count,                 // Qty
                item.price.toFixed(2),      // Price
                (item.price * item.count).toFixed(2), // Total
            ]);
            const doc = new jsPDF();
            let pageWidth = doc.internal.pageSize.getWidth();
            let margin = 14;
            let y = 20;

            doc.setFontSize(18);
            doc.setFont("helvetica", "normal");
            doc.text("INVOICE", pageWidth / 2, y, { align: "center" });
            y += 4;
            doc.setLineWidth(0.5);
            doc.line(margin, y, pageWidth - margin, y); // underline
            y += 10;

            // --- Company Details ---
            doc.setFontSize(12);
            doc.text("Company Name: Skylite Fashions Pvt. Ltd.", 14, y);
            y += 6;
            doc.text("GSTIN: 29ABCDE1234F2Z5", 14, y);
            y += 6;
            doc.text("Invoice No: INV-001", 14, y);
            y += 6;
            doc.text("Date: 23-08-2025", 14, y);
            y += 6;
            doc.text("Address: Bathinda, Punjab", 14, y);

            y += 10;
            doc.line(14, y, 200, y); // divider
            y += 8;

            // --- Customer Details ---
            doc.setFontSize(11);
            doc.text(`Customer Name: ${customerName}`, 14, y);
            y += 6;
            doc.text(`Phone: ${customerPhone}`, 14, y);
            y += 6;
            doc.text(`Address: ${customerAddress}`, 14, y);

            y += 10;
            doc.line(14, y, 200, y); // divider
            y += 8;

            autoTable(doc, {
                startY: y,
                head: [["#", "Product", "Brand", "Color", "Size", "Qty", "Price", "Total"]],
                body: tableBody,
                theme: "grid",
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
                styles: { fontSize: 10 },
                columnStyles: {
                    5: { halign: "center" },
                    6: { halign: "right" },
                    7: { halign: "right" },
                }
            });
              // --- Totals ---
            let finalY = doc.lastAutoTable.finalY + 10;
            let boxWidth = 70;
            let boxX = pageWidth - margin - boxWidth;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);

            // Subtotal
            doc.text("Subtotal:", boxX, finalY, { align: "left" });
            doc.text(`₹${gross.toFixed(2)}/-`, pageWidth - margin, finalY, { align: "right" });
            finalY += 6;

            // Tax
            doc.text("Tax (18%):", boxX, finalY, { align: "left" });
            doc.text(`₹${tax.toFixed(2)}/-`, pageWidth - margin, finalY, { align: "right" });
            finalY += 6;

            // Grand Total (bold)
            doc.setFont("helvetica", "bold");
            doc.text("Grand Total:", boxX, finalY, { align: "left" });
            doc.text(`₹${totalbill.toFixed(2)}/-`, pageWidth - margin, finalY, { align: "right" });

            // --- Footer ---
            finalY += 20;
            doc.setFont("helvetica", "italic");
            doc.setFontSize(10);
            doc.text("Customer Signature", margin, finalY);
            doc.text("Authorized Signatory", pageWidth - margin, finalY, { align: "right" });
                        doc.save("invoice.pdf");
            
        }
    })
)

export default ongoingStore