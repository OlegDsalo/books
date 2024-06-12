import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {BookCreationComponent} from "./book-creation/book-creation.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButton, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}
  openBookCreateBook() {
    this.dialog.open(BookCreationComponent);
  }
}
