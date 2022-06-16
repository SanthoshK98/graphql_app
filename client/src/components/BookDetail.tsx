import { useQuery } from '@apollo/client'
import React from 'react'
import { Book } from '../model/model'
import { getBookQuery } from '../queries/queries'

interface Props {
    bookId: string | null
}

const BookDetail = (props: Props) => {
    
    const {loading, error, data} = useQuery(getBookQuery, {
        variables:{
            id: props.bookId
        }
    })
    console.log(data)
    const displayBookdetails = ()=>{
        
        if(!props.bookId){
            return (
                <div>No book selected....</div>
                )
        }else if(loading){
                return <div>Loading....</div>
            
        }else{
            if(error){
                return <div>No Data Found</div>
            }else{
                
                const {book} = data
                return(
                    <div>
                        <h2>{book.name}</h2>
                        <p>{book.genre}</p>
                        <p>{book.author.name}</p>
                        <p>All books by this author:</p>
                        <ul className='other-books'>
                            {
                                book.author.books.map((book: Book)=>(
                                    <li key={book.id}>{book.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        } 
    }
  return (
    <div id='book-details'>
        {displayBookdetails()}
    </div>
  )
}

export default BookDetail