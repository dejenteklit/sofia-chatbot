// src/app/chat/chat.component.ts
import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked, Input} from '@angular/core';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common'; // Make sure CommonModule is imported if using standalone
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms"; // Make sure HttpClientModule is imported if using standalone


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Ensure these are in imports
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  userInput = '';
  @Input() chatId!: number;
  messages: { sender: string, text: string }[] = [];

  // CHANGE THIS LINE: 'messages' to 'messageListContainer'
  @ViewChild('messageListContainer') private messagesContainer!: ElementRef; // Reference to the messages div

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.messages.push({ sender: 'sofia', text: 'Hallo! Ich bin Sofia, dein Chatbot. Wie kann ich dir heute helfen?' });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.messages.push({ sender: 'user', text: userMessage });
    this.userInput = '';

    this.chatService.sendMessage(userMessage).subscribe({
      next: (response: any) => {
        this.messages.push({ sender: 'sofia', text: response.reply });
      },
      error: (err) => {
        console.error(err);
        this.messages.push({ sender: 'sofia', text: 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.' });
      }
    });
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error("Scrolling error:", err); // Add error logging for scroll
    }
  }
}
