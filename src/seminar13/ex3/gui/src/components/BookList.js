import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { getBooks, addBook, saveBook, deleteBook } from "../actions";

const bookSelector = (state) => state.book.bookList;

function BookList() {
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pages, setPages] = useState(""); // tin ca string in input, convertesc la save
  const [isNewRecord, setIsNewRecord] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  const books = useSelector(bookSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleAddClick = () => {
    setIsDialogShown(true);
    setIsNewRecord(true);
    setSelectedBook(null);
    setTitle("");
    setContent("");
    setPages("");
  };

  const hideDialog = () => {
    setIsDialogShown(false);
  };

  const handleSaveClick = () => {
    const pagesNumber = pages === "" ? 0 : Number(pages);

    const payload = {
      title,
      content,
      pages: pagesNumber,
    };

    if (isNewRecord) {
      dispatch(addBook(payload));
    } else {
      dispatch(saveBook(selectedBook, payload));
    }

    setIsDialogShown(false);
    setSelectedBook(null);
    setTitle("");
    setContent("");
    setPages("");
  };

  const editBook = (rowData) => {
    setSelectedBook(rowData.id);
    setTitle(rowData.title ?? "");
    setContent(rowData.content ?? "");
    setPages(
      rowData.pages !== undefined && rowData.pages !== null
        ? String(rowData.pages)
        : ""
    );
    setIsDialogShown(true);
    setIsNewRecord(false);
  };

  const removeBook = (rowData) => {
    dispatch(deleteBook(rowData.id));
  };

  const tableFooter = (
    <div>
      <Button label="Add" icon="pi pi-plus" onClick={handleAddClick} />
    </div>
  );

  const dialogFooter = (
    <div>
      <Button label="Save" icon="pi pi-save" onClick={handleSaveClick} />
    </div>
  );

  const opsColumn = (rowData) => {
    return (
      <>
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-text"
          onClick={() => editBook(rowData)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-text p-button-danger"
          onClick={() => removeBook(rowData)}
        />
      </>
    );
  };

  return (
    <div>
      <DataTable
        value={books}
        footer={tableFooter}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 20]}
        responsiveLayout="scroll"
      >
        {/* Filtru + sortare pe title */}
        <Column
          header="Title"
          field="title"
          sortable
          filter
          filterPlaceholder="Search title..."
        />

        <Column header="Content" field="content" />

        {/* Sortare pe numar de pagini */}
        <Column header="Pages" field="pages" sortable />

        <Column header="Actions" body={opsColumn} />
      </DataTable>

      <Dialog
        header="A book"
        visible={isDialogShown}
        onHide={hideDialog}
        footer={dialogFooter}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputText
            placeholder="title"
            onChange={(evt) => setTitle(evt.target.value)}
            value={title}
          />
          <InputText
            placeholder="content"
            onChange={(evt) => setContent(evt.target.value)}
            value={content}
          />
          <InputText
            placeholder="pages (number)"
            onChange={(evt) => {
              // accept doar cifre
              const v = evt.target.value;
              if (/^\d*$/.test(v)) setPages(v);
            }}
            value={pages}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default BookList;
