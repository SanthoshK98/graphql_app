import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries'
import BookDetail from './BookDetail'
import { Book } from '../model/model'





const BookList = () => {
    const {loading, error, data} = useQuery(getBooksQuery)
    const [selected, setSelected] = useState<string | null>(null)
    console.log(data)
    const displayBookList = ()=>{
      if(loading){
        return <div>Loading Books.....</div>
      }else if(error){
        return <div>No Data Found</div>
        
      }else{
        return data.books.map((book: Book)=>(
          <li key={book.id} onClick={(e)=>setSelected(book.id)}>{book.name}</li>
        ))
      }
    }
  return (
    <div>
    <ul className='book-list'>
        {displayBookList()}
    </ul>
    <BookDetail bookId={selected}/>
    </div>
  )
}

export default BookList