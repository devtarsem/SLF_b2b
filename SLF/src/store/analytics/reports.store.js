import {create} from 'zustand';
import axios from 'axios'
import Swal from 'sweetalert2'
import jsPDF from 'jsPDF'
import export_excel from '../../class/excelExport';

import autoTable from "jspdf-autotable";

const reportStore = create(
    (set,get)=>({
        OverAllOrderList : [],
        financials : {},
        isLoading : false,
        overAllOrders : async(start, end)=>{
            set({isLoading : true})
            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/b2b_order/orders",
                data : {
                    start,end
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    let orders = res.data.data.orders;
                    let skuList = []
                    orders.forEach(item=>{
                        item.order_items.forEach(inner=>{
                            skuList.push({inner, date: item.created_at})
                        })
                    })
                    
                    set({OverAllOrderList : skuList, isLoading : false})

                    let sales = 0;

                    skuList.forEach(el=>{
                        sales += Number(el.inner.count)*Number(el.inner.price)
                    })

                    let expenses = JSON.parse(localStorage.getItem("expensesSLM"))
                    let cogs = 0;
                    let labour = 0;
                    let printing = 0;
                    let miss = 0;

                    skuList.forEach(el=>{
                        expenses.forEach(exp=>{
                            if(exp.size==el.inner.size){
                                cogs += (exp.COGS)*el.inner.count;
                                labour += (exp.Labour)*el.inner.count;
                                printing += (exp.Printing)*el.inner.count;
                                miss += (exp.Miscellaneous)*el.inner.count;
                            }
                        })
                    })

                    let gross_margin = sales - cogs;

                    let financials = {
                        Sales : sales,
                        COGS : cogs,
                        Labour : labour,
                        Printing : printing,
                        Miscellaneous : miss,
                        Gross_Margins : gross_margin,
                        Profits : sales - cogs - labour- printing - miss
                    }
                    console.log(financials)

                    set({financials : financials})

                }
            })
        }

        ,

        generateOverallReportPDF : async(list, financials, start, end)=>{
            console.log(financials)
            const tablebody1 = list.map((item,index)=>[
                index+1,
                item.inner.name,
                item.date.split(",")[0],
                item.inner.color,
                item.inner.size,
                item.inner.count,
                item.inner.price,
                item.inner.price*item.inner.count,
                item.inner.return ? "Returned" : "Accepted"
            ])

            const tablebody2 = [financials].map((fin, index)=> [
                index+1,
                fin.Sales,
                fin.Gross_Margins,
                fin.COGS,
                fin.Labour,
                fin.Printing,
                fin.Miscellaneous,
                fin.Profits
            ])

            const doc = new jsPDF();
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
            doc.text(`Report from(YYYY-MM-DD) : ${start} to ${end}`, 14, y);
            y += 10;
            doc.text(`Note* : -: All values are in INR`, 14, y);
            y += 10;
            doc.line(14, y, 200, y); // divider
            y += 8;


            autoTable(doc, {
                startY : y,
                head : [["#", "Name", "Date", "Color", "Size", "Quantity", "Price", "Order value", "Status"]],
                body : tablebody1,
                theme: "grid",
                headStyles: { fillColor: [0, 102, 203], textColor: 255 },
                styles: { fontSize: 10 },
                columnStyles: {
                    5: { halign: "center" },
                    6: { halign: "right" },
                    7: { halign: "right" },
                }
            })

            let finalY = doc.lastAutoTable.finalY + 10;
            let boxWidth = 70;
            let boxX = pagewidth - margin - boxWidth
            autoTable(doc, {
                startY : doc.lastAutoTable.finalY + 10,
                head : [["#", "Sales", "Gross margin", "COGS", "Labour", "Printing", "Miscellaneous", "Profits"]],
                body : tablebody2,
                theme: "grid",
                headStyles: { fillColor: [0, 102, 203], textColor: 255 },
                styles: { fontSize: 10 },
                columnStyles: {
                    5: { halign: "center" },
                    6: { halign: "right" },
                    7: { halign: "right" },
                }
            })

            doc.save("Overall_Report.pdf")
        }

        ,

        export_As_Excel_overall_report : async(list, from, to, financials)=>{
            const arr = list.map((item,index)=>{
                return {
                    SKU_name : item.inner.name,
                    Order_date : item.date.split(",")[0],
                    color : item.inner.color,
                    size : item.inner.size,
                    count : item.inner.count,
                    price : item.inner.price,
                    Order_value : item.inner.price*item.inner.count,
                    return_status : item.inner.return ? "Returned" : "Accepted"
                }
            })
            const excel = new export_excel()
            excel.handleExportMultiSheets(arr, `Orders-${from}-to-${to}`, [financials], `Fin-${from}-to-${to}`)
        }
    })
)

export default reportStore