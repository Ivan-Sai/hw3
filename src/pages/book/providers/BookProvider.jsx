import {createContext} from "react";
import {useSelector} from "react-redux";

export const BookContext = createContext({})

const BookProvider = ({
                          children
                      }) => {
    const {
        book,
        books,
        errors,
        isFetchingBooks,
        isFetchingBook
    } = useSelector(({books}) => ({
        book: books.book,
        books: books.books,
        errors: books.errors,
        isFetchingBooks: books.isFetchingBooks,
        isFetchingBook: books.isFetchingBook
    }));

    return (
        <BookContext.Provider
            value={{
                book: book,
                books: books,
                errors: errors,
                isFetchingBooks: isFetchingBooks,
                isFetchingBook: isFetchingBook
            }}>
            {children}
        </BookContext.Provider>
    )
}

export default BookProvider;