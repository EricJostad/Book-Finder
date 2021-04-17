import {useState} from 'react';
import Finder from '../../src/components/Finder';
import API from '../../utils/api';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [bookList, setBookList] = useState([]);
  
  const searchForBook = async() => {
    const {data} = await API.searchFor(keyword);
    const results = data.map(b => ({
      id: b.id,
      title: b.volumeInfo.title,
      author: b.volumeInfo?.author ? b.volumeInfo.author.join(', ') : '',
      description: b?.searchInfo?.description ? b.searchInfo.description  : '(No description available)',
      image: b.volumeInfo?.imageLinks?.smallThumbnail ?  b.volumeInfo.imageLinks.smallThumbnail : '/favicon.ico'
    }))
    setBookList(results)
    setNoResults(results.length ? false : true)
  }

  const save = {
    type: 'Save',
    theme: 'outline-success',
    fn: async(bookProps) => {
      try {
        await API.saveBook(bookProps);
        alert(`Book '${bookProps.title}' successfuly saved.`)
      } catch(err) {
        alert(`WARNING: '${bookProps.title}' failed to save!`)
      }
    }
  }

  return (
    <div>
      <finder
        handleInputChange={(e) => setKeyword(e.target.value)}
        search={searchForBook}
      />
    </div>
  );
}

export default Search;