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

    // No border frame as requested

    // Legal Header (Centered Calligraphy Style)
    doc.setTextColor(20, 20, 20);
    doc.setFont("times", "bold");
    doc.setFontSize(24);
    doc.text("L E G A L   C H E C K", 105, 28, { align: 'center', charSpace: 1.5 });
    
    doc.setFontSize(8);
    doc.setFont("times", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("OFFICIAL JURISDICTIONAL REGISTRY • EST. 2026", 105, 34, { align: 'center', charSpace: 1 });

    // Registry Metadata (Top Right)
    doc.setFont("times", "italic");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`REGISTRY ENTRY NO: LC-${Math.floor(Math.random()*90000) + 10000}`, 190, 20, { align: 'right' });
    doc.text(`FOLIO DATE: ${data.date}`, 190, 24, { align: 'right' });

    // Decorative Line
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.3);
    doc.line(40, 42, 170, 42);

    // Title (Ancient Document Style)
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.setTextColor(30, 41, 59);
    doc.text("MAINTENANCE ASSESSMENT REPORT", 105, 60, { align: 'center' });
    
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    doc.setTextColor(71, 85, 105);
    const regionText = `In the Matter of the Jurisdiction of ${data.jurisdiction}`;
    doc.text(regionText, 105, 68, { align: 'center' });

    // Statement of Case (Preamble)
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const preamble = "This record serves as a formal simulation of maintenance and alimony obligations under the prevailing legal standards and precedents of the jurisdiction cited above. The following parameters have been entered into the registry for calculation:";
    const wrappedPreamble = doc.splitTextToSize(preamble, 170);
    doc.text(wrappedPreamble, 20, 85);

    // Main Result Area (The Large "Verdiet")
    doc.setFillColor(20, 30, 50); // Dark Midnight
    doc.rect(20, 105, 170, 30, 'F');
    
    doc.setFont("times", "normal");
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    doc.text("ESTIMATED MONTHLY OBLIGATION", 105, 112, { align: 'center' });
    
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255); // White for contrast
    const safeAmount = data.maintenanceAmount.replace(/₹/g, 'Rs. ').replace(/₨/g, 'PKR ');
    doc.text(safeAmount, 105, 126, { align: 'center' });

    // Table Header
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("SCHEDULE OF FINANCIAL PARAMETERS", 20, 153);
    
    const tableRows = Object.entries(data.calculationDetails).map(([key, value]) => {
        // Only add space before capital letters if the key doesn't already have spaces
        const formattedKey = key.includes(' ') ? key.toUpperCase() : key.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
        
        const cleanValue = typeof value === 'object' 
            ? JSON.stringify(value) 
            : String(value)
                .replace(/₹/g, 'Rs. ')
                .replace(/₨/g, 'PKR ')
                .replace(/€/g, 'EUR ')
                .replace(/£/g, 'GBP ')
                .replace(/CHF/g, 'CHF ');

        return [formattedKey, cleanValue];
    });

    autoTable(doc, {
        startY: 158,
        head: [['PARAMETER', 'SPECIFICATION']],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', font: 'times', cellPadding: 8, fontSize: 10 },
        bodyStyles: { font: 'times', cellPadding: 5, textColor: [50, 50, 50], fontSize: 9 },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        styles: { halign: 'left', overflow: 'linebreak', font: 'times' },
        margin: { left: 20, right: 20 },
    });

    // Signature Area
    const finalY = (doc as any).lastAutoTable.finalY + 25;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.1);
    doc.line(20, finalY, 70, finalY);
    
    doc.setFont("times", "italic");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Official Seal of Verification", 20, finalY + 4);
    doc.text("Certified Jurisdictional Model v2.x", 190, finalY + 4, { align: 'right' });

    // Seal (Circle Seal look)
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.5);
    doc.circle(180, 250, 15);
    doc.setFontSize(6);
    doc.text("PRECISION", 180, 248, { align: 'center' });
    doc.text("A I   L E G A L", 180, 251, { align: 'center' });
    doc.text("2026", 180, 254, { align: 'center' });

    // Footer / Disclaimer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setFont("times", "normal");
        doc.setTextColor(160, 160, 160);
        doc.text("DISCLAIMER: This document is an analytical estimation based on regional economic data and does not substitute for a formal legal decree.", 105, 285, { align: 'center' });
        doc.text(`${i} / ${pageCount}`, 190, 290, { align: 'right' });
    }

    doc.save(`Registry_Report_${data.jurisdiction.replace(/\s+/g, '_')}.pdf`);
};
