import {useIntl} from 'react-intl';
import React, {useContext, useEffect, useState} from 'react';
import {BookContext} from "../providers/BookProvider";
import {useDispatch} from "react-redux";
import actions from '../../../app/actions/book'
import {createUseStyles} from "react-jss";
import theme from "../../../misc/providers/ThemeProvider/themes/default";
import {useNavigate} from 'react-router-dom';
import Button from "../../../components/Button";
import toast from "react-hot-toast";
import Typography from "../../../components/Typography";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import Link from "../../../components/Link";
import Loading from "../../../components/Loading";

const getClasses = createUseStyles(theme => ({
    pageContainer: {
        paddingTop: '50px',
        height: '100%',
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        padding: '10px 0 10px 0'
    },
    bookForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: '0 auto',
        '& label': {
            margin: '10px 0',
            '& input': {
                width: '100%',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px',
            },
        },
    },
    editButton: {
        position: "absolute",
        top: "100px",
        right: "5%"
    }
}))

const checkAuthorName = (authorName) => {
    return /[^a-zA-Z\s.]/.test(authorName)
}

function Book({
                  bookId
              }) {

    const navigator = useNavigate();

    const [state, setState] = useState({
        isBookLoaded: false,
        isEditing: false,
        error: null
    });
    const [editData, setEditData] = useState(null);

    const [bookData, setBookData] = useState({
        title: '',
        authorName: '',
        yearPublished: '',
        genres: '',
        pages: ''
    });
    const handleCreateInputChange = (event) => {

        setBookData({
            ...bookData,
            [event.target.name]: event.target.value
        });
    };

    const handleEditInputChange = (event) => {

        setEditData({
            ...editData,
            [event.target.name]: event.target.value
        });
    };

    const classes = getClasses({theme})
    const {formatMessage} = useIntl();
    const {
        book,
        errors,
        isFetchingBook
    } = useContext(BookContext);

    const dispatch = useDispatch();

    const handleCreateSubmit = (event) => {
        event.preventDefault()

        if (checkAuthorName(bookData.authorName)) {
            setState({
                ...state,
                error: 'Author name can only contain english letters, spaces and dots'
            });
            return;
        }

        setState({
            ...state,
            error: null
        });

        let finalBookData = {...bookData};

        if (typeof finalBookData.genres === 'string') {
            finalBookData.genres = finalBookData.genres.split(',')
                .map(item => item.trim())
                .filter(item => item !== '');
        }

        dispatch(actions.fetchBookCreate(finalBookData))
            .then((response) => {
                const id = response.id;
                toast.success('Book created successfully');
                navigator(`${pagesURLs[pages.books]}/${id}`)
            })
            .catch((error) => {
                toast.error(`Some error during creating book, try again later`);
            });
    }

    const handleEditSubmit = (event) => {
        event.preventDefault()
        if (checkAuthorName(editData.authorName)) {
            setState({
                ...state,
                error: 'Author name can only contain english letters and spaces'
            });
            return;
        }
        if (editData.title === book.title &&
            editData.authorName === book.author.name &&
            editData.yearPublished === book.yearPublished &&
            editData.genres === book.genres &&
            editData.pages === book.pages) {

            setState({
                ...state,
                error: null,
                isEditing: false
            });

            return;

        }

        let finalBookData = {...editData};

        if (typeof finalBookData.genres === 'string') {
            finalBookData.genres = finalBookData.genres.split(',')
                .map(item => item.trim())
                .filter(item => item !== '');
        }
        dispatch(actions.fetchEditBook(finalBookData, bookId))
            .then(() => {
                setState({
                    ...state,
                    isEditing: false
                })
                toast.success('Book edited successfully');
            })
            .catch((error) => {
                toast.error(`Some error during editing book, try again later`);
            });


    }


    const handleEdit = () => {
        setState({
            ...state,
            isEditing: true
        })
        setEditData({
            title: book.title,
            authorName: book.author.name,
            yearPublished: book.yearPublished,
            genres: book.genres,
            pages: book.pages
        })
    }
    const handleCancelEdit = () => {
        setState({
            ...state,
            isEditing: false
        })
        setEditData(null)
    }

    useEffect(() => {
        if (bookId !== 'new') {
            dispatch(actions.fetchBook(bookId))
                .then(() => {
                    setState({
                        ...state,
                        isBookLoaded: true
                    })
                })
                .catch((error) => {
                    setState({
                        ...state,
                        isBookLoaded: false
                    })
                })
        } else {
            setState({
                ...state,
                isBookLoaded: false
            })
        }
    }, [bookId]);


    return (
        <div className={classes.pageContainer}>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbs2VuQR6fLDsDkqF5z-qlACuPA4DBBcKk8Y4A8hi5Qg&s'
                alt=''/>
            {isFetchingBook && <Loading/>}
            {bookId === 'new' && (
                <form className={classes.bookForm} onSubmit={(event) => (handleCreateSubmit(event))}>
                    <label>
                        {formatMessage({id: 'bookTitle'})}:
                        <input type="text" name="title" value={bookData.title} onChange={handleCreateInputChange}
                               required/>
                    </label>
                    <label>
                        {formatMessage({id: 'bookAuthor'})}:
                        <input type="text" name="authorName" value={bookData.authorName}
                               onChange={handleCreateInputChange}
                               required/>
                        {state.error && <Typography color="inherit"
                                                    variant="subtitle">{state.error}</Typography>}
                    </label>
                    <label>
                        {formatMessage({id: 'yearPublished'})}:
                        <input type="number" name="yearPublished" value={bookData.yearPublished}
                               onChange={handleCreateInputChange} required/>
                    </label>
                    <label>
                        {formatMessage({id: 'bookGenres'})}:
                        <input type="text" name="genres" value={bookData.genres} onChange={handleCreateInputChange}
                               required/>
                    </label>
                    <label>
                        {formatMessage({id: 'pages'})}:
                        <input type="number" name="pages" value={bookData.pages} onChange={handleCreateInputChange}
                               required/>
                    </label>
                    <div>
                        <button type="submit">{formatMessage({id: 'create'})}</button>
                        <Link
                            to={{
                                pathname: `${pagesURLs[pages.books]}`,
                            }}
                        >
                            <button>{formatMessage({id: 'cancel'})}</button>
                        </Link>
                    </div>
                </form>
            )}
            {state.isEditing && (
                <form className={classes.bookForm} onSubmit={(event) => (handleEditSubmit(event))}>
                    <label>
                        {formatMessage({id: 'bookTitle'})}:
                        <input type="text" name="title" value={editData.title} onChange={handleEditInputChange}
                               required/>
                    </label>
                    <label>
                        {formatMessage({id: 'bookAuthor'})}:
                        <input type="text" name="authorName" value={editData.authorName}
                               onChange={handleEditInputChange}
                               required/>
                        {state.error && <Typography>{state.error}</Typography>}

                    </label>
                    <label>
                        {formatMessage({id: 'yearPublished'})}:
                        <input type="number" name="yearPublished" value={editData.yearPublished}
                               onChange={handleEditInputChange} required/>
                    </label>
                    <label>
                        {formatMessage({id: 'bookGenres'})}:
                        <input type="text" name="genres" value={editData.genres} onChange={handleEditInputChange}
                               required/>
                    </label>
                    <label>
                        {formatMessage({id: 'pages'})}:
                        <input type="number" name="pages" value={editData.pages} onChange={handleEditInputChange}
                               required/>
                    </label>
                    <div>
                        <button type="submit">{formatMessage({id: 'save'})}</button>
                        <button onClick={() => {
                            handleCancelEdit()
                        }}>{formatMessage({id: 'cancel'})}</button>
                    </div>
                </form>
            )}
            {state.isBookLoaded && !state.isEditing && book && <div className={classes.infoContainer}>
                <p>{formatMessage({id: 'bookTitle'})}: {book.title}</p>
                <p>{formatMessage({id: 'bookAuthor'})}: {book.author.name}</p>
                <p>{formatMessage({id: 'yearPublished'})}: {book.yearPublished}</p>
                <p>{formatMessage({id: 'bookGenres'})}: {book.genres.join(', ')}</p>
                <p>{formatMessage({id: 'pages'})}: {book.pages}</p>

                <div className={classes.editButton}>
                    <Button onClick={() => handleEdit()}
                            colorVariant="header"
                            variant="text"
                    >
                        <Typography
                            color="inherit"
                            variant="subtitle"
                        >
                            <strong>
                                {formatMessage({id: 'edit'})}
                            </strong>
                        </Typography>
                    </Button>
                </div>

            </div>}
            {!state.isBookLoaded && !isFetchingBook && bookId !== 'new' && <div>
                <p>{formatMessage({
                    id: 'bookNoFound'
                })} : {bookId}</p>
            </div>}
        </div>
    );
}

export default Book;