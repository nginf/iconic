import { Component } from '@angular/core';
import { CommonIcon } from "../../../../../common/src/public-api";

@Component({
  selector: 'app-chevron-down',
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-chevron-down"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>`,
})
export class ChevronDownComponent  extends CommonIcon {}
