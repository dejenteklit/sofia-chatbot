import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// Import the specific provider functions
import { provideHttpClient, withFetch } from '@angular/common/http'; // <<< Import withFetch
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // <<< This enables fetch support for HttpClient
    provideAnimations(),
    importProvidersFrom(FormsModule)
    // Add routing providers here if needed
  ]
}).catch(err => console.error(err));
