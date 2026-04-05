import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportData {
    jurisdiction: string;
    maintenanceAmount: string;
    calculationDetails: Record<string, any>;
    date: string;
}

export const exportToPDF = (data: ExportData) => {
    const doc = new jsPDF() as any;

    // Background (Subtle Parchment Tint)
    doc.setFillColor(255, 255, 252);
    doc.rect(0, 0, 210, 297, 'F');

    // Double Border Frame
    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277); // Outer
    doc.rect(12, 12, 186, 273); // Inner

    // Legal Header (Centered Calligraphy Style)
    doc.setTextColor(15, 23, 42);
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.text("LEGAL CHECK", 105, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont("times", "italic");
    doc.text("GLOBAL JURISDICTIONAL INTELLIGENCE REGISTRY", 105, 32, { align: 'center' });

    // Decorative Line
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(1);
    doc.line(70, 36, 140, 36);

    // Title (Ancient Document Style)
    doc.setFont("times", "bold");
    doc.setFontSize(18);
    const title = `${data.jurisdiction}`;
    const wrappedTitle = doc.splitTextToSize(title, 160);
    doc.text("MAINTENANCE ASSESSMENT REPORT", 105, 55, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139);
    doc.text(wrappedTitle, 105, 65, { align: 'center' });
    
    // Sub-header
    doc.setFontSize(9);
    doc.setFont("times", "normal");
    doc.setTextColor(150);
    doc.text(`Official Record Generated: ${new Date().toLocaleDateString()}`, 105, 80, { align: 'center' });

    // Main Result Area
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.5);
    doc.rect(20, 95, 170, 35);
    
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text("ESTIMATED MONTHLY MAINTENANCE OBLIGATION", 105, 105, { align: 'center' });
    
    doc.setFont("times", "bold");
    doc.setFontSize(36);
    doc.setTextColor(217, 119, 6); // Amber-600
    const safeAmount = data.maintenanceAmount.replace('₹', 'Rs. ').replace('₨', 'PKR ');
    doc.text(safeAmount, 105, 122, { align: 'center' });

    // Table Header
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("CASE PARAMETERS & BREAKDOWN", 20, 145);
    const tableRows = Object.entries(data.calculationDetails).map(([key, value]) => [
        key.replace(/([A-Z])/g, ' $1').toUpperCase(),
        typeof value === 'object' ? JSON.stringify(value) : String(value).replace('₹', 'Rs. ').replace('₨', 'PKR ')
    ]);

    autoTable(doc, {
        startY: 150,
        head: [['PARAMETER', 'LEGAL SPECIFICATION']],
        body: tableRows,
        theme: 'plain',
        headStyles: { textColor: [15, 23, 42], fontStyle: 'bold', font: 'times', cellPadding: 8, fontSize: 11 },
        bodyStyles: { font: 'times', cellPadding: 6, textColor: [50, 50, 50] },
        styles: { halign: 'left', overflow: 'linebreak' },
        margin: { left: 20, right: 20 },
        tableLineColor: [200, 200, 200],
        tableLineWidth: 0.1,
    });

    // Signature Area
    const finalY = (doc as any).lastAutoTable.finalY + 30;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, finalY, 80, finalY);
    doc.setFontSize(9);
    doc.text("Verified by LegalCheck AI", 20, finalY + 5);
    doc.text("Authorized Jurisdictional Model v2.0", 190, finalY + 5, { align: 'right' });

    // Footer / Disclaimer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("CONFIDENTIAL: This report is a simulation and does not constitute formal legal advice.", 20, 285);
        doc.text(`Page ${i} of ${pageCount}`, 180, 285);
    }

    doc.save(`LegalCheck_${data.jurisdiction.replace(/\s+/g, '_')}_Report.pdf`);
};
