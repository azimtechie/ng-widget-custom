import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = signal(false);

  constructor() {
    // Check if user has previously set preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme.set(savedTheme === 'dark');
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(color-scheme: dark)').matches;
      this.isDarkTheme.set(prefersDark);
    }

    // Apply initial theme
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkTheme.update((dark) => !dark);
    this.applyTheme();
  }

  private applyTheme() {
    const isDark = this.isDarkTheme();
    document.documentElement.style.setProperty(
      'color-scheme',
      isDark ? 'dark' : 'light'
    );
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  isDark() {
    return this.isDarkTheme();
  }
}
