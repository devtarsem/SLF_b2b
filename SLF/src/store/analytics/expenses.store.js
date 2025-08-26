import {create} from 'zustand';
import axios from 'axios'
import Swal from 'sweetalert2'
import {jsPDF} from 'jsPDF'
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import export_excel from '../../class/excelExport';

const expStore = create(
    (set,get)=>({

        cachedExp : [],
        isLoading : false,
        settingExpensesToLocal : async()=>{
            if(!(localStorage.getItem("expensesSLM"))){
                let sizes = ["M", "S", "L", "XL", "XXL"]

                let exp = []
                sizes.forEach(el=>{
                    exp.push(
                        {
                           size : el,
                            COGS : 0,
                            Labour : 0,
                            Tax : 0,
                            Printing : 0,
                            Miscellaneous : 0,
                            total : 0 
                        }
                    )
                })
                set({cachedExp : exp})
                localStorage.setItem("expensesSLM", JSON.stringify(exp))

            }       
        }

        ,

        cachedPrevExpenses : async()=>{
            let exp = JSON.parse(localStorage.getItem("expensesSLM"))
            set({cachedExp : exp})
        } 
        ,

        SavingExpenses : async(exp)=>{
            localStorage.setItem("expensesSLM", JSON.stringify(exp))
            get().cachedPrevExpenses()
        }

        ,

        DownloadExpenseList : async()=>{
            let exp = JSON.parse(localStorage.getItem("expensesSLM"))
            const tableBody = exp.map((item,index)=>[
                index+1,
                item.size,
                item.COGS,
                item.Labour,
                item.Printing,
                item.Tax,
                item.Miscellaneous,
                item.total,
            ])

            const doc = new jsPDF();
            let pagewidth = doc.internal.pageSize.getWidth();
            let margin = 14;
            let y = 20;

            doc.setFontSize(18)
            doc.setFont("helvetica", "normal")
            doc.text("Expenses", pagewidth/2, y, {align : "center"})
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
                head : [["#", "Size","COGS", "Labour", "Printing","Tax",  "Miscellaneous","Total"]],
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

            doc.save("Expenses.pdf")
        }

        ,

        export_expenses_to_excel : async()=>{
            let exp = JSON.parse(localStorage.getItem("expensesSLM"))
            
            const excel = new export_excel()
            excel.handleExport(exp, 'Expenses')
        }
    })
)

export default expStore