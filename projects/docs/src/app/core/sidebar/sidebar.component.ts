import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  routes = [
    {
      name: 'Lucide',
      url: '/docs/lucide',
    },
    {
      name: 'Ant Design',
      url: '/docs/ant-design',
    },
    {
      name: 'Font Awesome',
      url: '/docs/fa',
    },
  ];
}
