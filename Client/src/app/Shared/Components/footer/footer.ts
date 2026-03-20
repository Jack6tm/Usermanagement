import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-indigo-950 text-white tracking-widest h-10 flex items-center justify-center">
      <p>Made with <span class="text-red-600"><fa-icon [icon]="faHeart"></fa-icon></span> by Jack6tm</p>
    </div>
  `,
  styleUrl: './footer.css',
})
export class Footer {
    faHeart = faHeart;
 }
