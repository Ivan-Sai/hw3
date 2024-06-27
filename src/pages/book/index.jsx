import React, {useMemo} from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';

import getMessages from './intl';
import BookList from './containers/BookList';
import {useParams} from "react-router-dom";
import Book from "./containers/Book";

function Index(props) {
    const {
        lang,
    } = useLocationSearch();
    const {bookId} = useParams();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <IntlProvider messages={messages}>
            {bookId ? <Book {...props} bookId={bookId}/> : <BookList {...props} />}
        </IntlProvider>
    );
}

export default Index;
