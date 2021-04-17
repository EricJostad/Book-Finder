import { useState, useEffect } from 'react';
import List from '../../src/components/List';
import API from '../../utils/api';

const Save = () => {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        const run = async () => {
            const { data } = await API.getBooks();
            setBookList(data)
        }
        run();
    }, []);

    const del = {
        type: 'Delete',
        theme: 'outline-danger',
        fn: async (props) => {
            try {
                await API.deleteBook(props._id);
                setBookList(prev => prev.slice().filter(book => book._id !== props._id));
            } catch (err) {
                console.log('Error: Cannot delete');
            }
        }
    }

    return (
        <div>
            { bookList.length
                ? <List
                    books={List}
                    btn={del}
                />
            };
        </div>
    )
}

export default Save;