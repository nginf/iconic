import { Component, input, signal } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { CheckComponent } from '../icons/check.component';
import { CopyComponent } from '../icons/copy.component';

@Component({
  selector: 'app-source-code',
  imports: [Highlight, CopyComponent, CheckComponent],
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
