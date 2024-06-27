import {useIntl} from 'react-intl';
import React, {useContext, useEffect, useState} from 'react';
import Typography from 'components/Typography';
import {BookContext} from "../providers/BookProvider";
import {useDispatch} from "react-redux";
import actions from '../../../app/actions/book'
import {createUseStyles} from "react-jss";
import theme from "../../../misc/providers/ThemeProvider/themes/default";
import Button from "../../../components/Button";
import {useLocation, useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import Link from "../../../components/Link";
import Loading from "../../../components/Loading";


const getClasses = createUseStyles(theme => ({
    bookContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    bookItem: {
        width: '30%',
        height: 'auto',
        margin: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: "5px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& img': {
            width: '100%'
        },
        '@media (max-width: 600px)': {
            width: '100%',
        },
        '&:hover': {
            backgroundColor: theme.colors.text.tertiary,
            cursor: 'pointer',

            '& img': {
                display: "block !important",
            }
        }
    },
    pageContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        padding: '10px 0 10px 0'
    },
    buttonContainer: {
        display: "flex",
        justifySelf: 'end'
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        width: '30%',
        maxWidth: '500px',
        background: 'white',
        padding: '20px',
        borderRadius: '4px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        alignItems: "end"
    },
    deleteButton: {
        display: "none",
        width: '25px !important',
        height: '25px'
    },
    createButton: {
        position: "absolute !important",
        right: '5%',
        top: '100px'

    }
}))

function BookList() {

    const navigate = useNavigate();
    const location = useLocation();

    const [state, setState] = useState({
        currentPage: undefined,
        currentBookId: null,
    });

    const classes = getClasses({theme})
    const {formatMessage} = useIntl();
    const {
        books,
        errors,
        isFetchingBooks,
    } = useContext(BookContext);


    const dispatch = useDispatch();

    const handlePageChange = (pageNumber) => {
        const params = new URLSearchParams(location.search);
        const author = params.get('author') || ''
        const title = params.get('title') || ''
        const lang = params.get('lang')
        navigate(`?page=${pageNumber}&title=${title}&author=${author}&lang=${lang}`);
    };

    const handleModalOpen = (event, id) => {
        event.preventDefault()
        setState({
            ...state,
            currentBookId: state.currentBookId === null ? id : null,
        })
    }


    const handleDelete = (event) => {
        event.stopPropagation()
        dispatch(actions.fetchBookDelete(state.currentBookId))
            .then(() => {
                toast.success('Book successfully deleted');
                setState({
                    ...state,
                    currentBookId: null
                });
                dispatch(actions.fetchBookList(getFilterParams, state.currentPage, 4));
            })
            .catch((error) => {
                toast.error(`Error deleting book: ${error.message}`);
            });
    };

    const getFilterParams = () => {
        const params = new URLSearchParams(location.search);
        const author = params.get('author')
        const title = params.get('title')
        let filterBody = {}
        if (author && title) {
            filterBody = {
                authorName: author,
                title: title
            }
        } else if (author) {
            filterBody = {
                authorName: author,
            }
        } else if (title) {
            filterBody = {
                title: title,
            }
        }
        return filterBody
    }
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const size = 4;
        const page = params.get('page') ? Number(params.get('page')) : 0;

        if (page === state.currentPage) return;
        setState({
            ...state,
            currentPage: page,
        })
        dispatch(actions.fetchBookList(getFilterParams(), page, size));
    }, [location.search]);

    return (
        <div className={classes.pageContainer}>
            <div>
                <form>
                    <input name="title" type={"text"} placeholder={formatMessage({id: 'bookTitle'})}/>
                    <input name="author" type={"text"} placeholder={formatMessage({id: 'bookAuthor'})}/>
                    <button type='submit'>
                        <Typography color="inherit">
                            {formatMessage({id: 'filter'})}
                        </Typography>
                    </button>
                </form>
            </div>
            {isFetchingBooks && <Loading/>}
            <div className={classes.bookContainer}>
                {books && books.list && books.list.map((item, index) => (

                    <div
                        className={classes.bookItem} key={index}>
                        <Link
                            to={{
                                pathname: `${pagesURLs[pages.books]}/${item.id}`,
                            }}
                        >
                            <img
                                src="data:image/png;base64,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"
                                alt=''/>
                            <div className={classes.textContainer}>
                                <div>
                                    <p>{formatMessage({id: 'bookTitle'})}: {item.title}</p>
                                    <p>{formatMessage({id: 'bookAuthor'})}: {item.authorName}</p>
                                    <p>{formatMessage({id: 'yearPublished'})}: {item.yearPublished}</p>
                                </div>
                                <img className={classes.deleteButton}
                                     src='https://static-00.iconduck.com/assets.00/trash-bin-icon-2048x2048-duca73jv.png'
                                     alt='' onClick={(event) => handleModalOpen(event, item.id)}/>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {books.list && books.list.length === 0 && <div>
                <Typography>
                    {formatMessage({
                        id: 'emptyBooks'
                    })}
                </Typography>
            </div>}
            <div className={classes.buttonContainer}>
                {Array.from({length: books.totalPages}, (_, index) => (
                    <Button key={index} onClick={() => handlePageChange(index)}>
                        {index + 1}
                    </Button>
                ))}
            </div>
            {state.currentBookId !== null && (
                <div className={classes.modal}>
                    <p>{formatMessage({id: "deleteMessage"})}</p>
                    <div>

                        <button onClick={(event) => handleDelete(event)}>{formatMessage({id: "yes"})}</button>
                        <button onClick={(event) => handleModalOpen(event)}>{formatMessage({id: "no"})}</button>
                    </div>
                </div>
            )}
            <div className={classes.createButton}>
                <Link to={{
                    pathname: `${pagesURLs[pages.books]}/new`,
                }}
                >
                    <Button onClick={() => navigate('/books/new')}
                            colorVariant="header"
                            variant="text"
                    >
                        <Typography
                            color="inherit"
                            variant="subtitle"
                        >
                            <strong>
                                {formatMessage({id: 'create'})}
                            </strong>
                        </Typography>
                    </Button>
                </Link>

            </div>

        </div>
    );
}

export default BookList;