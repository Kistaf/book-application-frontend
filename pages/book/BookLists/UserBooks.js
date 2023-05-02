import {fetchBook} from "./httpBooks.js";
import {fetchBookList} from "./dummyBookLists.js";

let bookLists =[]
let book = null

export const init = async (reference) => {
    const bookResponse =  await fetchBook(reference)
    book = convertToBook(bookResponse)
    bookLists = await fetchBookList()
    return "";
}

const convertToBook = bookResponse => {
    return {
        title : bookResponse.volumeInfo.title,
        year : bookResponse.volumeInfo.publishedDate,
        description : bookResponse.volumeInfo.description,
        publisher : bookResponse.volumeInfo.publisher,
        authors : formatAuthors(bookResponse.volumeInfo.authors),
        image : bookResponse.volumeInfo.imageLinks.thumbnail
    }
}

export const bookListTitles = () => bookLists.map(b => b.title)

export const bookListId = title => {
    const filtered = bookLists.filter(b => b.title === title)
    if(filtered.length > 0)
        return filtered.at(0)
    return ""
}

export const getBook = () => book

const formatAuthors = authors => {
    let str = ""
    for (let i = 0;i < authors.length;i++){
        str += authors[i] + ", "
    }
    return str.substring(0,str.length - 2)
}