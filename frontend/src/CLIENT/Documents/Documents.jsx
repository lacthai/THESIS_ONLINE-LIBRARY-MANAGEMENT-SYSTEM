import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Modal } from "react-bootstrap";
import { saveAs } from "file-saver";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DownloadIcon from '@mui/icons-material/Download';
import { useLoginState } from '../../LoginState'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const pdfFiles = [
  { name: "Cambridge 17", path: "../../../DocumentFile/Cambridge 17.pdf" },
  {
    name: "BỘ ĐỀ THI IELTS SPEAKING QUÝ 2_T5 DEN T8",
    path:
      "../../../DocumentFile/BỘ ĐỀ THI IELTS SPEAKING QUÝ 2_T5 DEN T8_IELTSNGOCBACH.pdf",
  },
  {
    name: "Complete IELTS Bands 4-5 Book with Answers",
    path:
      "../../../DocumentFile/Complete IELTS Bands 4-5 Book with Answers.pdf",
  },
  {
    name: "HƯỚNG DẪN GIẢI CÁC ĐỀ PROCESS CHẾT CHÓC 2023",
    path:
      "../../../DocumentFile/HƯỚNG DẪN GIẢI CÁC ĐỀ PROCESS CHẾT CHÓC 2023 BY NGOCBACH.pdf",
  },
  {
    name: "Mindset For IELTS Level 1",
    path: "../../../DocumentFile/Mindset-For-IELTS-Level-1.pdf",
  },
  {
    name: "HƯỚNG DẪN GIẢI CÁC ĐỀ PROCESS CHẾT CHÓC 2023",
    path:
      "../../../DocumentFile/HƯỚNG DẪN GIẢI CÁC ĐỀ PROCESS CHẾT CHÓC 2023 BY NGOCBACH.pdf",
  },
];

const pdfFilesToeic = [
  { name: "Tong_Hop_Ngu_Phap_TOEIC", path: "../../../DocumentFile/Tong_Hop_Ngu_Phap_TOEIC.pdf" },
];

const Documents = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = React.useState(0);
  const [page1, setPage1] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowsPerPage1, setRowsPerPage1] = React.useState(5);
  const [fileSizes, setFileSizes] = useState([]);
  const [fileSizes1, setFileSizes1] = useState([]);
  const userLoginState = useLoginState()


  const openModal = (file) => {
    setSelectedFile(file);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedFile(null);
    setModalIsOpen(false);
    setPageNumber(1);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const downloadPdf = async (pdfPath, pdfName) => {
    try {
      const pdfBlob = await fetch(pdfPath).then((res) => res.blob());
      saveAs(pdfBlob, `${pdfName}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pdfFiles.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangePage1 = (event, newPage1) => {
    setPage1(newPage1);
  };

  const emptyRows1 =
  page1 > 0 ? Math.max(0, (1 + page1) * rowsPerPage1 - pdfFilesToeic.length) : 0;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  useEffect(() => {
    const fetchFileSizes = async () => {
      const sizes = await Promise.all(
        pdfFiles.map(async (file) => {
          const response = await fetch(file.path);
          const blob = await response.blob();
          return {
            name: file.name,
            sizeInMB: (blob.size / (1024 * 1024)).toFixed(2),
          };
        })
      );
      setFileSizes(sizes);
    };

    fetchFileSizes();
  }, []);

  useEffect(() => {
    const fetchFileSizes1 = async () => {
      const sizes = await Promise.all(
        pdfFilesToeic.map(async (file) => {
          const response = await fetch(file.path);
          const blob = await response.blob();
          return {
            name: file.name,
            sizeInMB: (blob.size / (1024 * 1024)).toFixed(2),
          };
        })
      );
      setFileSizes1(sizes);
    };

    fetchFileSizes1();
  }, []);

  return (
    <div className="h-[150vh]">
      <h1 className="h-[50px] uppercase dark:text-[#303030] text-[#e0e0e0] flex justify-center items-center">
        IU library documents
      </h1>

      <div className="px-5 ">
        <img src="/ielts.png" alt="" className="h-[70px] my-2" />
      </div>

      <Root className="w-full px-5">
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th className="text-[#303030] ">Name</th>
              <th className="text-center text-[#303030] ">
                View <ViewInArIcon />
              </th>

              <th className="text-center text-[#303030] ">
                Size <CloudDoneIcon />
              </th>
              <th className="text-center text-[#303030] ">
                Download <ArrowCircleDownIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? pdfFiles.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : pdfFiles
            ).map((file, index) => (
              <tr key={file.name}>
                <td className="dark:text-[#303030] text-[#e0e0e0]">{file.name}</td>
                <td>
                  <button
                    onClick={() => openModal(file)}
                    className="w-full flex justify-center items-center dark:text-[#303030] text-[#e0e0e0]"
                  >
                    <VisibilityIcon />
                  </button>
                </td>
                <td>
                  <div className="text-[1.2rem] flex justify-center items-center dark:text-[#303030] text-[#e0e0e0]">
                    {fileSizes[index]?.sizeInMB} MB
                  </div>
                </td>
                <td className="text-center relative">
                {userLoginState.userLogState ? <>
                <button onClick={() => downloadPdf(file.path, file.name)} className="dark:text-[#303030] text-[#e0e0e0]"><DownloadIcon className="dark:hover:text-[#4cceac] hover:text-[#6a5af9]"/></button>
                </> : <>
                  <WarningAmberIcon className="hover:text-[#C60C30]"/>

                </>}
                </td>
              </tr>
            ))}
            <Modal show={modalIsOpen} onHide={closeModal}>
              <button onClick={closeModal}>
                Close
              </button>

              {selectedFile && (
                <Document
                  file={selectedFile.path}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              )}

              <p>
                Page {pageNumber} of {numPages}
              </p>
            </Modal>
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr >
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4}
                count={pdfFiles.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="dark:text-[#303030] text-[#e0e0e0]"
              />
            </tr>
          </tfoot>
        </table>
      </Root>


      <div className="px-5 ">
        <img src="/Toeic.png" alt="" className="h-[70px] my-2 rounded-xl mt-4" />
      </div>

      <Root className="w-full px-5">
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th className="text-[#303030] ">Name</th>
              <th className="text-center text-[#303030] ">
                View <ViewInArIcon />
              </th>

              <th className="text-center text-[#303030] ">
                Size <CloudDoneIcon />
              </th>
              <th className="text-center text-[#303030] ">
                Download <ArrowCircleDownIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage1 > 0
              ? pdfFilesToeic.slice(
                  page1 * rowsPerPage1,
                  page1 * rowsPerPage1 + rowsPerPage1
                )
              : pdfFilesToeic
            ).map((file, index) => (
              <tr key={file.name}>
                <td className="dark:text-[#303030] text-[#e0e0e0]">{file.name}</td>
                <td>
                  <button
                    onClick={() => openModal(file)}
                    className="w-full flex justify-center items-center dark:text-[#303030] text-[#e0e0e0]"
                  >
                    <VisibilityIcon />
                  </button>
                </td>
                <td>
                  <div className="text-[1.2rem] text-center dark:text-[#303030] text-[#e0e0e0]">
                    {fileSizes1[index]?.sizeInMB} MB
                  </div>
                </td>
                <td className="text-center relative">
                {userLoginState.userLogState ? <>
                <button onClick={() => downloadPdf(file.path, file.name)} className="dark:text-[#303030] text-[#e0e0e0]"><DownloadIcon className="hover:text-[#4cceac]"/></button>
                </> : <>
                  <WarningAmberIcon className="hover:text-[#C60C30]"/>

                </>}
                </td>
              </tr>
            ))}
            <Modal show={modalIsOpen} onHide={closeModal}>
              <button onClick={closeModal}>
                Close
              </button>

              {selectedFile && (
                <Document
                  file={selectedFile.path}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              )}

              <p>
                Page {pageNumber} of {numPages}
              </p>
            </Modal>
            {emptyRows1 > 0 && (
              <tr style={{ height: 41 * emptyRows1 }}>
                <td colSpan={3} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr >
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4}
                count={pdfFilesToeic.length}
                rowsPerPage={rowsPerPage1}
                page={page1}
                slotProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage1}
                onRowsPerPageChange={handleChangeRowsPerPage1}
                className="dark:text-[#303030] text-[#e0e0e0]"
              />
            </tr>
          </tfoot>
        </table>
      </Root>
    </div>
  );
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  }
  `
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

export default Documents;
