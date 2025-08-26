import {create} from 'zustand'
import axios from 'axios' 
import jsPDF from 'jsPDF'
import autoTable from "jspdf-autotable";
import export_excel from '../../class/excelExport';


const returnStore = create(
    (set, get)=>({
        return_orders : [],
        startDate : '',
        endDate : '',
        isLoading : false,
        settingStartDate : async(date)=>{
            set({startDate : date})
        },
        settingEndDate : async(date)=>{
            set({endDate : date})
        },
        fetchReturns : async()=>{
            set({isLoading : true})
            axios({
                method : "POST",
                url : "http://127.0.0.1:3003/api/v1/b2b_order/returns",
                data : {
                    
                     
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    set({isLoading : false, return_orders : res.data.data.returns})
                    console.log(res.data.data.returns)
                    localStorage.setItem("SLFreturns", JSON.stringify(res.data.data.returns))
                }
            })
        }
        ,
        cachingReturns : async()=>{
            if(localStorage.getItem("SLFreturns")){
                let returns = JSON.parse(localStorage.getItem("SLFreturns"))
                set({return_orders : returns})
            }else{
                set({return_orders : get().return_orders})

            }
        }

        ,

        InitiateRefund : async(paymentId, amount, order_id, sku_id)=>{
            console.log(paymentId)
            axios({
                method : "POST",
                url : "http://127.0.0.1:3003/api/v1/b2b_order/initiate-returns",
                data : {
                    paymentId,
                    amount,
                    order_id,
                    sku_id
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    get().fetchReturns()
                }
            })
        }

        ,
        DownloadReturnList : async()=>{
            let returns = JSON.parse(localStorage.getItem("SLFreturns"))
            let tablebody = returns.map((order,index)=> [
                index+1,
                order.item.id,
                order.item.name,
                order.item.price,
                order.item.color,
                order.item.count,
                order.item.size,
                order.razorpay_payment_id,
                (order.item.count*order.item.price + (order.item.count*order.item.price)*0.18).toFixed(2),
                order.item.return ? "Pending" : "Refunded",
                order.item.refund
            ])

            const doc = new jsPDF({
                orientation: "landscape",   // <-- yahan set karo
                unit: "mm",
                format: "a4"
            });
            let pagewidth = doc.internal.pageSize.getWidth();
            let margin = 14;
            let y = 20;

            doc.setFontSize(18)
            doc.setFont("helvetica", "normal")
            doc.text("Overall report", pagewidth/2, y, {align : "center"})
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
            doc.line(margin, y, pagewidth-margin,y)// divider
            y += 8;


            autoTable(doc, {
                startY : y,
                head : [["#", "SKU ID", "Name", "Price","Color",  "Quantity","Size", "Payment_id", "Amount refundable", "Return status", "Refund status"]],
                body : tablebody,
                theme: "grid",
                headStyles: { fillColor: [0, 102, 203], textColor: 255 },
                styles: { fontSize: 10 },
                columnStyles: {
                    5: { halign: "center" },
                    6: { halign: "right" },
                    7: { halign: "right" },
                }
            })

            doc.save("Returns_report.pdf")
        }

        ,

        export_retun_as_excel : async()=>{
            let arr = []
            let returns = JSON.parse(localStorage.getItem("SLFreturns"))
            returns.forEach(el=>{
                arr.push({
                    sku : el.item.id,
                    name : el.item.name,
                    price : el.item.price,
                    color : el.item.color,
                    Quantity : el.item.count,
                    size : el.item.size,
                    payment_id : el.razorpay_payment_id,
                    Amount_refundable : (el.item.count*el.item.price + (el.item.count*el.item.price)*0.18).toFixed(2),
                    return : el.item.return,
                    refund : el.item.refund,
                    order_id : el.order_id,
                    refund_id : el.item.refund_id
                })
            })
            const excel = new export_excel()
            excel.handleExport(arr, 'Returns')
        }
    })
)

export default returnStore