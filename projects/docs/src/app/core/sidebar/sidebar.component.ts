import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExternalLinkComponent } from '../icon/external-link.component';

interface Group {
  name: string;
  children: SidebarLink[];
}

export interface SidebarLink {
  name: string;
  url: string;
  done?: boolean;
}

export const SIDEBAR_ROUTES = [
  {
    name: 'Getting Started',
    children: [
      {
        name: 'Introduction',
        url: '/docs/introduction',
      },
    ],
  },
  {
    name: 'Icons',
    children: [
      {
        name: 'Ant Design',
        url: '/docs/ant-design',
      },
      {
        name: 'Bootstrap Icons',
        url: '/docs/bootstrap-icons',
      },
      {
        name: 'Font Awesome',
        url: '/docs/font-awesome',
      },
      {
        name: 'Hero Icons',
        url: '/docs/hero-icons',
      },
      {
        name: 'Lucide',
        url: '/docs/lucide',
      },
      {
        name: 'Material Design',
        url: '/docs/material-design',
      },
      {
        name: 'Remix Icons',
        url: '/docs/remix-icons',
      },
    ],
  },
] as Group[];

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, ExternalLinkComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  routes: Group[] = SIDEBAR_ROUTES;
}
