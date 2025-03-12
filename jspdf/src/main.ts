import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PdfService } from './app/pdf.service';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align: center; padding: 20px;">
      <h1>PDF Generator with Chinese Text</h1>
      <button (click)="generatePDF()" style="padding: 10px 20px; font-size: 16px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
        生成 PDF
      </button>
      
      <div style="margin-top: 20px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
        <h2>预览内容 (Preview Content):</h2>
        <h3>{{ title }}</h3>
        <p>{{ content }}</p>
        <p>{{ paragraph }}</p>
      </div>
    </div>
  `,
})
export class App {
  title = '你好，世界！';
  content = '这是一个使用 Angular 和 jsPDF 创建的 PDF 文档。';
  paragraph = '中国有着悠久的历史和丰富的文化。从古老的丝绸之路到现代的科技创新，展现了中国在世界舞台上的重要地位。';

  constructor(private pdfService: PdfService) {}

  async generatePDF() {
    try {
      await this.pdfService.generatePDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}

bootstrapApplication(App, {
  providers: [PdfService]
});