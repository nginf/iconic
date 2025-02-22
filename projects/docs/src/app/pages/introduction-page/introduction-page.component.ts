import { RouterLink } from '@angular/router';
import { ICON_LIBRARIES } from '../../ICON_LIBRARIES';
import { Component, inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";


@Component({
  selector: 'app-introduction-page',
  imports: [RouterLink],
  templateUrl: './introduction-page.component.html',
  styleUrl: './introduction-page.component.css',
})
export class IntroductionPageComponent {
  iconLibraries = ICON_LIBRARIES;
  title = inject(Title);
  meta = inject(Meta);
  document = inject(DOCUMENT);

  usageCode = `
  import { ChevronDownIcon } from '@nginf/iconic-lu';

  @Component({
     imports:[ChevronDownIcon],
     template:' <chevron-down-icon> </chevron-down-icon> '
  })
  export class SomeComponent{}
  `;

  constructor() {
    this.title.setTitle('@nginf/iconic');

    this.meta.addTags([
      { property: 'og:title', content: '@nginf/iconic' },
      {
        property: 'og:description',
        content: 'Introduction page of @Nginf/iconic',
      },
      {
        property: 'og:image',
        content: 'https://nginf.github.io/iconic/logo.png',
      },
      { property: 'og:image:alt', content: '@nginf/iconic logo' },
      { property: 'og:url', content: this.document.location.href },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
