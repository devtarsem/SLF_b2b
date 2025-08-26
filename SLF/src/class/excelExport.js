import * as XLSX from "xlsx";

class export_excel{
    handleExport(arr, filename){
        const data = [...arr];

        const ws = XLSX.utils.json_to_sheet(data);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws, filename),

        XLSX.writeFile(wb, `${filename}.xlsx`)

    }

    

    handleExportMultiSheets(arr1, filename1, arr2, filename2){
        const data = [...arr1];

        const ws1 = XLSX.utils.json_to_sheet(data);
        const ws2 = XLSX.utils.json_to_sheet(arr2);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws1, filename1),
        XLSX.utils.book_append_sheet(wb,ws2, filename2),

        XLSX.writeFile(wb, `${filename1}.xlsx`)

    }
}

export default export_excel