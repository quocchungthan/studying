import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  // Base64 encoded Noto Sans fonts
  private readonly notoSansRegular = 'AAEAAAASAQAABAAgR0RFRgBKAA8AAAEAAAAA...'; // Note: This is just a placeholder. The actual base64 string would be very long
  private readonly notoSansBold = 'AAEAAAASAQAABAAgR0RFRgBKAA8AAAEAAAAA...'; // Note: This is just a placeholder. The actual base64 string would be very long

  async generatePDF() {
    try {
      // Create new jsPDF instance
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
      });

      // Add base64 encoded Noto Sans fonts
      doc.addFileToVFS('NotoSansCJKsc-Regular.ttf', this.notoSansRegular);
      doc.addFileToVFS('NotoSansCJKsc-Bold.ttf', this.notoSansBold);
      doc.addFont('NotoSansCJKsc-Regular.ttf', 'NotoSans', 'normal');
      doc.addFont('NotoSansCJKsc-Bold.ttf', 'NotoSans', 'bold');
      
      // Set font to Noto Sans
      doc.setFont('NotoSans', 'normal');
      
      // Sample Chinese text
      const title = '你好，世界！';
      const content = '这是一个使用 Angular 和 jsPDF 创建的 PDF 文档。';
      const paragraph = '中国有着悠久的历史和丰富的文化。从古老的丝绸之路到现代的科技创新，展现了中国在世界舞台上的重要地位。';
      
      // Add title with bold font
      doc.setFont('NotoSans', 'bold');
      doc.setFontSize(24);
      const titleWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;
      const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
      doc.text(title, titleX, 20);
      
      // Switch back to normal font for content
      doc.setFont('NotoSans', 'normal');
      doc.setFontSize(12);
      doc.text(content, 20, 40);
      
      doc.setFontSize(14);
      const lines = doc.splitTextToSize(paragraph, 170);
      doc.text(lines, 20, 60);
      
      // Save the PDF
      doc.save('chinese-document.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}