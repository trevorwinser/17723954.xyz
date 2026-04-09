import './style.css'
import { ScrambleText } from './ScrambleText'

document.addEventListener('DOMContentLoaded', () => {
    const headline = document.getElementById('scramble-headline');
    
    if (headline) {
        const targetText = headline.getAttribute('data-target') || '17723954';
        
        // Start visually empty but reserve space
        headline.innerText = ' '.repeat(targetText.length);

        const scrambler = new ScrambleText(headline, {
            target: targetText,
            fps: 35, 
            chars: '0123456789' 
        });
        
        // Delay for the aesthetic effect upon loading
        setTimeout(() => {
            scrambler.start();
        }, 500);
    }

    const floatingThemeToggle = document.getElementById('floating-theme-toggle');
    if (floatingThemeToggle) {
        floatingThemeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const iconSvg = floatingThemeToggle.querySelector('svg');
            
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                if (iconSvg) {
                    // Sun SVG
                    iconSvg.innerHTML = `
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    `;
                }
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                if (iconSvg) {
                    // Moon SVG
                    iconSvg.innerHTML = `
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    `;
                }
            }
        });
    }
});
