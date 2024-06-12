import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Book} from "../interface/book";
import {MatDialog} from "@angular/material/dialog";
import {BookService} from "../service/book.service";
import {BookDetailsComponent} from "../book-details/book-details.component";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    MatCardActions,
    MatIconButton,
    MatMiniFabButton,
    NgOptimizedImage,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('delete', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(300)
      ])
    ])
  ]
})
export class DashboardComponent {
  searchQuery:string =''
  books: Book[] = [];

  constructor(private bookService: BookService, public dialog: MatDialog) {
    this.bookService.books$.subscribe(books => {
      this.books = books;
    });
  }


  deleteBook(id: string) {
    this.bookService.deleteBook(id);
  }

  openBookDetails(book: Book) {
    this.dialog.open(BookDetailsComponent, {
      data: { book }
    });
  }
  searchBooks() {
    this.books = this.bookService.searchBooks(this.searchQuery);
  }
}
