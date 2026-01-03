import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import ChartsDialog from "./components/ChartsDialog";
import { Chart } from "react-google-charts";

import { getBooks, addBook, saveBook, deleteBook } from "../actions";

const bookSelector = (state) => state.book.bookList;
const bookCountSelector = (state) => state.book.count;

function BookList() {
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filterString, setFilterString] = useState("");

  const [chartData, setChartData] = useState([]);

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState(1);

  const [filters, setFilters] = useState({
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    content: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [page, setPage] = useState(0);
  const [first, setFirst] = useState(0);

  const handleFilter = (evt) => {
    const oldFilters = filters;
    oldFilters[evt.field] = evt.constraints.constraints[0];
    setFilters({ ...oldFilters });
  };

  const handleFilterClear = (evt) => {
    setFilters({
      title: { value: null, matchMode: FilterMatchMode.CONTAINS },
      content: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
  };

  useEffect(() => {
    const keys = Object.keys(filters);
    const computedFilterString = keys
      .map((e) => {
        return {
          key: e,
          value: filters[e].value,
        };
      })
      .filter((e) => e.value)
      .map((e) => `${e.key}=${e.value}`)
      .join("&");
    setFilterString(computedFilterString);
  }, [filters]);

  const books = useSelector(bookSelector);
  const count = useSelector(bookCountSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks(filterString, page, 2, sortField, sortOrder));
  }, [filterString, page, sortField, sortOrder]);

  useEffect(() => {
    const data = [["Title", "Pages"]];
    for (const book of books) {
      data.push([book.title, book.pageCount]);
    }
    setChartData(data);
  }, [books]);

  const chartOptions = {
    chart: {
      title: "Books",
      subtitle: "Number of pages",
    },
  };

  const handleAddClick = (evt) => {
    setIsDialogShown(true);
    setIsNewRecord(true);
    setTitle("");
    setContent("");
  };
  const [chartsVisible, setChartsVisible] = useState(false);

  const hideDialog = () => {
    setIsDialogShown(false);
  };

  const handleSaveClick = () => {
    if (isNewRecord) {
      dispatch(addBook({ title, content, pageCount }));
    } else {
      dispatch(saveBook(selectedBook, { title, content, pageCount }));
    }
    setIsDialogShown(false);
    setSelectedBook(null);
    setTitle("");
    setContent("");
    setPageCount(0);
  };

  const editBook = (rowData) => {
    setSelectedBook(rowData.id);
    setTitle(rowData.title);
    setContent(rowData.content);
    setIsDialogShown(true);
    setIsNewRecord(false);
  };

  const handleDeleteBook = (rowData) => {
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
          onClick={() => editBook(rowData)}
        />
        <Button
          label="Delete"
          icon="pi pi-times"
          className="p-button p-button-danger"
          onClick={() => handleDeleteBook(rowData)}
        />
      </>
    );
  };

  const handlePageChange = (evt) => {
    setPage(evt.page);
    setFirst(evt.page * 2);
  };

  const handleSort = (evt) => {
    console.warn(evt);
    setSortField(evt.sortField);
    setSortOrder(evt.sortOrder);
  };

  return (
    <div>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={chartData}
        options={chartOptions}
      />
      <DataTable
        value={books}
        footer={tableFooter}
        lazy
        paginator
        onPage={handlePageChange}
        first={first}
        rows={2}
        totalRecords={count}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      >
        <Column
          header="Title"
          field="title"
          filter
          filterField="title"
          filterPlaceholder="filter by title"
          onFilterApplyClick={handleFilter}
          onFilterClear={handleFilterClear}
          sortable
        />
        <Column
          header="Content"
          field="content"
          filter
          filterField="content"
          filterPlaceholder="filter by content"
          onFilterApplyClick={handleFilter}
          onFilterClear={handleFilterClear}
          sortable
        />
        <Column header="Page count" field="pageCount" sortable />
        <Column body={opsColumn} />
      </DataTable>
      <Dialog
        header="A book"
        visible={isDialogShown}
        onHide={hideDialog}
        footer={dialogFooter}
      >
        <div>
          <InputText
            placeholder="title"
            onChange={(evt) => setTitle(evt.target.value)}
            value={title}
          />
        </div>
        <div>
          <InputText
            placeholder="content"
            onChange={(evt) => setContent(evt.target.value)}
            value={content}
          />
        </div>
        <div>
          <InputText
            placeholder="page count"
            onChange={(evt) => setPageCount(evt.target.value)}
            value={pageCount}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default BookList;
