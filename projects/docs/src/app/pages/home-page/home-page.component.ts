import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ICON_LIBRARIES } from '../../ICON_LIBRARIES';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  libraries = ICON_LIBRARIES;
  title = inject(Title);
  meta = inject(Meta);
  document = inject(DOCUMENT);

  constructor() {
    this.title.setTitle('@ngverse/icons');

    this.meta.addTags([
      { property: 'og:title', content: '@ngverse/icons' },
      {
        property: 'og:description',
        content: 'Collection of Angular open-source icon libraries',
      },
      {
        property: 'og:image',
        content: 'https://ngverse.github.io/icons/logo.png',
      },
      { property: 'og:image:alt', content: '@ngverse/icons logo' },
      { property: 'og:url', content: this.document.location.href },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
