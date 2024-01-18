import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';

// Set the worker source to the pdfjs worker file
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Documents = () => {
  const pdfFiles = [
    { name: 'Document 1', path: '../../../DocumentFile/Cambridge 17.pdf' },
    { name: 'Document 2', path: '/path/to/document2.pdf' },
    // Add more PDF files as needed
  ];

  const [selectedPdf, setSelectedPdf] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log(`Loaded ${numPages} pages`);
  };

  const downloadPdf = async (pdfPath, pdfName) => {
    try {
      const pdfBlob = await fetch(pdfPath).then((res) => res.blob());
      saveAs(pdfBlob, `${pdfName}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div>
      <ul>
        {pdfFiles.map((pdf, index) => (
          <li key={index}>
            <span>{pdf.name}</span>
            <button onClick={() => setSelectedPdf(pdf)}>View</button>
            <button onClick={() => downloadPdf(pdf.path, pdf.name)}>Download</button>
          </li>
        ))}
      </ul>

      {selectedPdf && (
        <div>
          <Document
            file={selectedPdf.path}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={1} />
          </Document>
          <button onClick={() => downloadPdf(selectedPdf.path, selectedPdf.name)}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default Documents;
