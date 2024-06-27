import config from "../../config";
import axios from "axios";
import {DELETE_BOOK, RECEIVE_BOOK, RECEIVE_BOOK_LIST, REQUEST_BOOK, REQUEST_BOOK_LIST} from "../constants/actionTypes";

const getBook = (id) => {
    const {
        SERVER,
    } = config
    return axios.get(`${SERVER}/api/book/${id}`)
}

const getBookList = (filterParams, page, size) => {
    const {
        SERVER,
    } = config
    return axios.post(`${SERVER}/api/book/_list`, {
        ...filterParams,
        page,
        size
    })
}

const deleteBook = (id) => {
    const {
        SERVER,
    } = config
    return axios.delete(`${SERVER}/api/book/${id}`)
}


const createBook = (bookData) => {
    const {
        SERVER
    } = config
    return axios.post(`${SERVER}/api/book`, bookData)
}

const editBook = (editData, id) => {
    const {
        SERVER
    } = config
    return axios.put(`${SERVER}/api/book/${id}`, editData)
}

const requestBookList = () => ({
    type: REQUEST_BOOK_LIST,
})

const receiveBookList = (books) => ({
    type: RECEIVE_BOOK_LIST,
    payload: books,
})

const deleteBookFromList = (id) => ({
    type: DELETE_BOOK,
    payload: id
})

const receiveBook = (book) => ({
    type: RECEIVE_BOOK,
    payload: book,
})

const requestBook = () => ({
    type: REQUEST_BOOK
})

const fetchBook = (id) => (dispatch) => {
    dispatch(requestBook())
    return getBook(id)
        .then(response => {
            dispatch(receiveBook(response))
        })
        .catch(() => {
            dispatch(receiveBook(mockBook))
        })

}

const fetchBookList = (filterParams, page, size) => (dispatch) => {
    dispatch(requestBookList())
    return getBookList(filterParams, page, size)
        .then(response => {
            dispatch(receiveBookList(response))
        })
        .catch(error => {
            dispatch(receiveBookList(mockBookList))
        })
}

const mockBookList = {
    "list": [
        {
            "id": 102,
            "title": "To Kill a Mockingbird",
            "authorName": "Harper Lee",
            "yearPublished": 1960
        },
        {
            "id": 103,
            "title": "Pride and Prejudice",
            "authorName": "Jane Austen",
            "yearPublished": 1813
        },
        {
            "id": 104,
            "title": "Moby-Dick",
            "authorName": "Herman Melville",
            "yearPublished": 1851
        },
        {
            "id": 105,
            "title": "War and Peace",
            "authorName": "Leo Tolstoy",
            "yearPublished": 1869
        }
    ],
    "totalPages": 3
}

const mockBook = {
    "id": 102,
    "title": "To Kill a Mockingbird",
    "author": {
        "id": 16,
        "name": "Harper Lee"
    },
    "genres": [
        "Bildungsroman",
        "Southern Gothic"
    ],
    "yearPublished": 1960,
    "pages": 281
}

const fetchBookDelete = (id) => (dispatch) => {
    return deleteBook(id)
        .then(() => {
            dispatch(deleteBookFromList(id))
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const fetchBookCreate = (bookData) => (dispatch) => {
    return createBook(bookData)
        .then((response) => {
            dispatch(receiveBook(response));
            return response;
        })
        .catch(error => {
            throw error;
        })
}

const fetchEditBook = (editData, id) => (dispatch) => {
    return editBook(editData, id)
        .then((book) => {
            dispatch(receiveBook(book))
        })
        .catch(error => {
            throw error;
        })
}

const exportFunctions = {
    fetchBook,
    fetchBookList,
    fetchBookDelete,
    fetchBookCreate,
    fetchEditBook
}
export default exportFunctions