import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { FaDownload } from 'react-icons/fa';

 const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData, {skipHeader: 1});
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <FaDownload onClick={(e) => exportToCSV(apiData, fileName)} />
  );
};


export default ExportToExcel;
