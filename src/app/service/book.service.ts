import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Book} from "../interface/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  books$ = this.booksSubject.asObservable();
  private books: Book[] = [
    {
      id: '1',
      title: 'Book 1',
      author: 'Author 1',
      year: 2001,
      description: 'Description 1',
      image: 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/31c1b48487e9037fa389d37e5b1afeab-1717423150/Mockup/do-book-cover-design-book-cover.jpg'
    },
    {
      id: '2',
      title: 'Book 2',
      author: 'Author 2',
      year: 2002,
      description: 'Description 2',
      image: 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/5c3dfa20763b6ed94451a60781b9b475-1717323659/Mockup/do-book-cover-design-book-cover.jpg'
    },
    {
      id: '3',
      title: 'Book 3',
      author: 'Author 4',
      year: 2021,
      description: 'Description 3',
      image: 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/e944a0e9ed4e7c8164c3f0c682f692fe-1717150098/Mockup/do-book-cover-design-book-cover.jpg'
    },
  ];
  constructor() {
    this.booksSubject.next(this.books);
  }

  addBook(book: Book) {
    this.books = [...this.books, book];
    this.booksSubject.next(this.books);
  }

  updateBook(updatedBook: Book) {
    this.books = this.books.map(book => book.id === updatedBook.id ? updatedBook : book);
    this.booksSubject.next(this.books);
  }

  deleteBook(id: string) {
    this.books = this.books.filter(book => book.id !== id);
    this.booksSubject.next(this.books);
  }

  searchBooks(searchQuery: string): Book[] {
    if (!searchQuery.trim()) {
      return this.books;
    }
    const searchQueryLowerCase = searchQuery.toLowerCase();

    return this.books.filter(book =>
      book.title.toLowerCase().includes(searchQueryLowerCase) ||
      book.author.toLowerCase().includes(searchQueryLowerCase)
    );
  }
}

