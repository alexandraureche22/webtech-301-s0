import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

import { getBooks, addBook, saveBook, deleteBook } from '../actions'

const bookSelector = state => state.book.bookList

function BookList () {
  const [isDialogShown, setIsDialogShown] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isNewRecord, setIsNewRecord] = useState(true)
  const [selectedBook, setSelectedBook] = useState(null)

  const books = useSelector(bookSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooks())
  }, [])

  const handleAddClick = (evt) => {
    setIsDialogShown(true)
    setIsNewRecord(true)
    setTitle('')
    setContent('')
  }

  const hideDialog = () => {
    setIsDialogShown(false)
  }

  const handleSaveClick = () => {
    if (isNewRecord) {
      dispatch(addBook({ title, content }))
    } else {
      dispatch(saveBook(selectedBook, { title, content }))
    }
    setIsDialogShown(false)
    setSelectedBook(null)
    setTitle('')
    setContent('')
  }

  const editBook = (rowData) => {
    setSelectedBook(rowData.id)
    setTitle(rowData.title)
    setContent(rowData.content)
    setIsDialogShown(true)
    setIsNewRecord(false)
  }

  const tableFooter = (
    <div>
      <Button label='Add' icon='pi pi-plus' onClick={handleAddClick} />
    </div>
  )

  const dialogFooter = (
    <div>
      <Button label='Save' icon='pi pi-save' onClick={handleSaveClick} />
    </div>
  )

  const opsColumn = (rowData) => {
    return (
      <>
        <Button label='Edit' icon='pi pi-pencil' onClick={() => editBook(rowData)} />
      </>
    )
  }

  return (
    <div>
      <DataTable value={books} footer={tableFooter}>
        <Column header='Title' field='title' />
        <Column header='Content' field='content' />
        <Column body={opsColumn} />
      </DataTable>
      <Dialog header='A book' visible={isDialogShown} onHide={hideDialog} footer={dialogFooter}>
        <div>
          <InputText placeholder='title' onChange={(evt) => setTitle(evt.target.value)} value={title} />
        </div>
        <div>
          <InputText placeholder='content' onChange={(evt) => setContent(evt.target.value)} value={content} />
        </div>
      </Dialog>
    </div>
  )
}

export default BookList
