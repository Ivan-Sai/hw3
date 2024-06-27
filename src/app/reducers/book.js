import {DELETE_BOOK, RECEIVE_BOOK, RECEIVE_BOOK_LIST, REQUEST_BOOK, REQUEST_BOOK_LIST} from "../constants/actionTypes";

const initialState = {
    books: [],
    book: {},
    isFetchingBooks: false,
    isFetchingBook: false,
    errors: [],
}

export default function Reducer(state = initialState, action) {

    switch (action.type) {
        case REQUEST_BOOK_LIST: {
            return {
                ...state,
                isFetchingBooks: true
            }
        }
        case RECEIVE_BOOK_LIST: {
            return {
                ...state,
                books: action.payload,
                isFetchingBooks: false,
            }
        }
        case REQUEST_BOOK: {
            return {
                ...state,
                isFetchingBook: true
            }
        }
        case RECEIVE_BOOK: {
            return {
                ...state,
                book: action.payload,
                isFetchingBook: false,
            }
        }
        case DELETE_BOOK: {
            return {
                ...state,
                books: state.books.list.filter((book) => book.id !== action.payload)
            }
        }
        default: {
            return state;
        }
    }
}