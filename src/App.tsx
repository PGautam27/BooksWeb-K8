import { useEffect, useState } from 'react'
import axios from 'axios';

const url = import.meta.env.VITE_URL;

function App() {
  
  const [book, setBook] = useState<string>("");
  const [books, setBooks] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(true);

  const handleSetBook = (books : any) => {
    setBook(books.target.value);
  }

  const handleAddBook = async() =>{
    const resp = await axios.post(`${url}/books`, {title : book});
    console.log(resp);
    setRefresh(!refresh); // Trigger re-render to update the book list
  }

  useEffect(() =>{
    // Fetch books from server and update state

    const getBooks = async() => {
      const resp = await axios.get(`${url}/books`).then(res => {
        setBooks(res.data)
        console.log(res.data);
      });
      console.log('Books fetched',books);
    };

    getBooks();
    
  },[refresh])

  return (
    <div className='flex-col items-center justify-center w-full h-screen bg-black text-xl text-green-500'>
      <div className='flex-col w-full justify-center items-center space-y-5'>
          <div>Add books Here</div>
          <div className='space-x-3 text-lg'>
            <input value={book} onChange={(e:any) => handleSetBook(e)} className='w-[80%] h-10 ps-2 text-black' type="text" placeholder='Book Name'/> 
            <button className='border-2 p-2 rounded-lg border-green-500' onClick={handleAddBook}>ADD</button>
          </div>
      </div>
      <div className='flex-col border-2 rounded-lg w-[80%] border-green-500 items-center justify-center padding'>
          {books.map((book) => (
            <div key={book._id}>{book.title}</div>
          ))}
      </div>
    </div>
  )
}

export default App
