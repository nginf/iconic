import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  libraries: Array<{
    name: string;
    logo: string;
    path: string;
  }> = [
    {
      name: 'Lucide Icons',
      logo: 'lucide-logo.svg',
      path: '/docs/lucide',
    },
    {
      name: 'Material Icons',
      logo: 'material-logo.svg',
      path: '/docs/material',
    },
  ];
}
