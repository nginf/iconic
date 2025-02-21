import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICON_LIBRARIES } from '../../ICON_LIBRARIES';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  libraries = ICON_LIBRARIES;
}
