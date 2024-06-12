import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {Book} from "../interface/book";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookService} from "../service/book.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {
    this.bookForm = this.fb.group({
      id: [data.book.id,],
      title: [data.book.title, [Validators.required]],
      author: [data.book.author, [Validators.required]],
      year: [data.book.year, [Validators.required, Validators.min(1900)]],
      description: [data.book.description, [Validators.required]],
      image: [data.book.image]
    });
  }

  save() {
    const updatedBook: Book = this.bookForm.value;
    this.bookService.updateBook(updatedBook);
    this.dialogRef.close();
  }

  delete() {
    this.bookService.deleteBook(this.bookForm.value.id);
    this.dialogRef.close();
  }
}
