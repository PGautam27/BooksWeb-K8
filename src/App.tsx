import { useEffect, useState } from 'react';
import axios from 'axios';

const url = "http://bookserver-service.default.svc.cluster.local:3001" // Use the dynamically fetched URL
console.log("This is the URL:", url);

function App() {
  const [book, setBook] = useState<string>('');
  const [books, setBooks] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(true);

  const handleSetBook = (event: any) => {
    setBook(event.target.value);
  };

  const handleAddBook = async () => {
    const resp = await axios.post(`${url}/books`, { title: book });
    console.log(resp);
    setRefresh(!refresh);
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(`${url}/books`);
        setBooks(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    getBooks();
  }, [refresh]);

  return (
    <div className='flex-col items-center justify-center w-full h-screen bg-black text-xl text-green-500'>
      <div className='flex-col w-full justify-center items-center space-y-5'>
        <div>Add books Here</div>
        <div className='space-x-3 text-lg'>
          <input
            value={book}
            onChange={handleSetBook}
            className='w-[80%] h-10 ps-2 text-black'
            type='text'
            placeholder='Book Name'
          />
          <button className='border-2 p-2 rounded-lg border-green-500' onClick={handleAddBook}>
            ADD
          </button>
        </div>
      </div>
      <div className='flex-col border-2 rounded-lg w-[80%] border-green-500 items-center justify-center padding'>
        {books.map((book) => (
          <div key={book._id}>{book.title}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
