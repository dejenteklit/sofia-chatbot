import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '🤖Sofia';
  showAbout = false;
  chats: string[] = ['Chat 1'];
  selectedChatIndex = 0;

  createNewChat() {
    if (this.chats.length < 3) {
      this.chats.push(`Chat ${this.chats.length + 1}`);
      this.selectedChatIndex = this.chats.length - 1;
    }
  }

  selectChat(index: number) {
    this.selectedChatIndex = index;
  }
}
