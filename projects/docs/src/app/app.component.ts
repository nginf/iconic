import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaChevronDownSolid } from '../../../fa/src/lib/fa-chevron-down-solid';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FaChevronDownSolid],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'docs';
}
