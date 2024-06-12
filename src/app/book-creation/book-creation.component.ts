import {Component} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {BookService} from "../service/book.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Book} from "../interface/book";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-book-creation',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatError
  ],
  templateUrl: './book-creation.component.html',
  styleUrl: './book-creation.component.scss'
})
export class BookCreationComponent {
  bookForm: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookCreationComponent>,
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      year: [2024, [Validators.required, Validators.min(1900)]],
      description: [''],
      image: ['']
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: Book = {...this.bookForm.value, id: uuidv4()};
      newBook.id = Date.now().toString();
      this.bookService.addBook(newBook);
      this.dialogRef.close()
    }
  }
}
