import { Component, input, signal } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { IconButtonComponent } from "../icon-button/icon-button.component";
import { CopyComponent } from '../icon/copy.component';
import { CheckComponent } from "../icon/check.component";

@Component({
  selector: 'app-source-code',
  imports: [Highlight, CopyComponent, CheckComponent, IconButtonComponent],
  templateUrl: './source-code.component.html',
  styleUrl: './source-code.component.css',
})
export class SourceCodeComponent {
  code = input.required<string>();
  language = input.required<string>();

  allowCopy = input(true);

  copied = signal(false);

  outline = input(true);

  surface = input(false);

  showCopy = signal(true);

  async copy() {
    await navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => {
      this.copied.set(false);
    }, 2000);
  }
}
