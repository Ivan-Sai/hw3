import PageContainer from "./components/PageContainer";
import BookProvider from "../pages/book/providers/BookProvider";
import BookPage from 'pages/book'

const Books = (props) => {

    return (
        <PageContainer>
            <BookProvider>
                <BookPage {...props}/>
            </BookProvider>
        </PageContainer>
    )
}
export default Books;