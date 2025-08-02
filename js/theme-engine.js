/**
 * JavaNova Academy - ENHANCED Theme Engine
 * 
 * Enhanced theme engine with improved animations and functionality:
 * - Enhanced theme toggle animations
 * - Better visual feedback
 * - Improved transitions
 * - All original functionality preserved
 */

class JavaNovaThemeEngine {
    constructor() {
        this.currentTheme = 'light';
        this.themes = {
            light: {
                name: 'Light Theme',
                variables: {
                    '--theme-bg-primary': '#ffffff',
                    '--theme-bg-secondary': '#f8f9fa',
                    '--theme-text-primary': '#0a0a18',
                    '--theme-text-secondary': '#333333',
                    '--theme-accent-primary': '#ff8c42',
                    '--theme-accent-secondary': '#8b5cf6',
                    '--theme-navbar-bg': 'rgba(255, 255, 255, 0.95)',
                    '--theme-card-bg': '#ffffff',
                    '--theme-border-primary': 'rgba(0, 0, 0, 0.1)',
                    // ENHANCED: Footer variables
                    '--theme-footer-bg': '#f8f9fa',
                    '--theme-footer-text': '#0a0a18',
                    '--theme-footer-text-muted': '#666666',
                    '--theme-footer-border': 'rgba(0, 0, 0, 0.1)'
                }
            },
            dark: {
                name: 'Dark Theme',
                variables: {
                    '--theme-bg-primary': '#0a0a18',
                    '--theme-bg-secondary': '#121230',
                    '--theme-text-primary': '#ffffff',
                    '--theme-text-secondary': '#e0e0e0',
                    '--theme-accent-primary': '#ff8c42',
                    '--theme-accent-secondary': '#8b5cf6',
                    '--theme-navbar-bg': 'rgba(10, 10, 24, 0.95)',
                    '--theme-card-bg': '#121230',
                    '--theme-border-primary': 'rgba(255, 255, 255, 0.1)',
                    // ENHANCED: Dark footer
                    '--theme-footer-bg': '#050510',
                    '--theme-footer-text': '#ffffff',
                    '--theme-footer-text-muted': '#a0a0a0',
                    '--theme-footer-border': 'rgba(255, 255, 255, 0.1)'
                }
            },
            'high-contrast': {
                name: 'High Contrast',
                variables: {
                    '--theme-bg-primary': '#000000',
                    '--theme-bg-secondary': '#1a1a1a',
                    '--theme-text-primary': '#ffffff',
                    '--theme-text-secondary': '#ffffff',
                    '--theme-accent-primary': '#ffff00',
                    '--theme-accent-secondary': '#00ffff',
                    '--theme-navbar-bg': 'rgba(0, 0, 0, 0.98)',
                    '--theme-card-bg': '#1a1a1a',
                    '--theme-border-primary': '#ffffff',
                    // ENHANCED: High contrast footer
                    '--theme-footer-bg': '#000000',
                    '--theme-footer-text': '#ffffff',
                    '--theme-footer-text-muted': '#cccccc',
                    '--theme-footer-border': '#ffffff'
                }
            },
            sepia: {
                name: 'Sepia Theme',
                variables: {
                    '--theme-bg-primary': '#f4f3e8',
                    '--theme-bg-secondary': '#ebe8d6',
                    '--theme-text-primary': '#3c3933',
                    '--theme-text-secondary': '#4a453d',
                    '--theme-accent-primary': '#d2691e',
                    '--theme-accent-secondary': '#8b4513',
                    '--theme-navbar-bg': 'rgba(244, 243, 232, 0.95)',
                    '--theme-card-bg': '#ebe8d6',
                    '--theme-border-primary': 'rgba(60, 57, 51, 0.2)',
                    // ENHANCED: Sepia footer
                    '--theme-footer-bg': '#e0dcc4',
                    '--theme-footer-text': '#3c3933',
                    '--theme-footer-text-muted': '#6b6456',
                    '--theme-footer-border': 'rgba(60, 57, 51, 0.2)'
                }
            }
        };

        // Initialize immediately
        this.init();
    }

    init() {
        console.log('🎨 JavaNova Enhanced Theme Engine initializing...');

        // Load saved theme or detect system preference
        this.loadTheme();

        // Apply initial theme
        this.applyTheme(this.currentTheme);

        // Set up event listeners
        this.setupEventListeners();

        console.log('✅ Enhanced Theme Engine initialized successfully');
    }

    loadTheme() {
        // Try to load from localStorage
        const saved = localStorage.getItem('javanova-theme');
        if (saved && this.themes[saved]) {
            this.currentTheme = saved;
            console.log('📱 Loaded saved theme:', saved);
            return;
        }

        // Detect system preference
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.currentTheme = 'dark';
                console.log('🌙 System prefers dark theme');
            } else {
                this.currentTheme = 'light';
                console.log('🌞 System prefers light theme');
            }
        }
    }

    applyTheme(themeId) {
        const theme = this.themes[themeId];
        if (!theme) {
            console.error('❌ Theme not found:', themeId);
            return;
        }

        console.log('🎨 Applying theme:', themeId);

        // ENHANCED: Add switching animation class
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.classList.add('switching');
            setTimeout(() => {
                toggleButton.classList.remove('switching');
            }, 600);
        }

        // Apply CSS variables to root
        const root = document.documentElement;
        Object.entries(theme.variables).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });

        // Set data attribute
        root.setAttribute('data-theme', themeId);

        // Add theme class
        root.className = root.className.replace(/theme-\w+/g, '');
        root.classList.add(`theme-${themeId}`);

        // Update current theme
        this.currentTheme = themeId;

        // Save to localStorage
        localStorage.setItem('javanova-theme', themeId);

        // Update theme icon
        this.updateThemeIcon(themeId);

        console.log('✅ Enhanced theme applied successfully:', themeId);
    }

    updateThemeIcon(themeId) {
        const iconElement = document.getElementById('theme-icon');
        if (!iconElement) return;

        let iconSvg;
        switch (themeId) {
            case 'dark':
                iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>`;
                break;
            case 'light':
                iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>`;
                break;
            case 'high-contrast':
                iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6"/>
                </svg>`;
                break;
            case 'sepia':
                iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>`;
                break;
            default:
                iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                </svg>`;
        }

        iconElement.innerHTML = iconSvg;
    }

    toggleTheme() {
        const themes = ['light', 'dark', 'high-contrast', 'sepia'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];

        console.log('🔄 Toggling theme from', this.currentTheme, 'to', nextTheme);
        this.applyTheme(nextTheme);
    }

    setTheme(themeId) {
        if (!this.themes[themeId]) {
            console.error('❌ Invalid theme:', themeId);
            return;
        }
        this.applyTheme(themeId);
    }

    setupEventListeners() {
        // Theme toggle button
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                console.log('🔘 Theme toggle clicked');
                this.toggleTheme();
            });
            console.log('✅ Enhanced theme toggle button connected');
        } else {
            console.error('❌ Theme toggle button not found');
        }

        // System theme change detection
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('javanova-theme')) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    console.log('🔄 System theme changed to:', newTheme);
                    this.applyTheme(newTheme);
                }
            });
        }

        // Cross-tab synchronization
        window.addEventListener('storage', (e) => {
            if (e.key === 'javanova-theme' && e.newValue) {
                console.log('🔄 Theme changed in another tab:', e.newValue);
                this.applyTheme(e.newValue);
            }
        });

        console.log('✅ Enhanced event listeners set up successfully');
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getAvailableThemes() {
        return Object.keys(this.themes);
    }
}

// Initialize theme engine when DOM is ready
let themeEngine;

function initializeThemeEngine() {
    console.log('🚀 Initializing JavaNova Enhanced Theme Engine...');
    try {
        themeEngine = new JavaNovaThemeEngine();
        window.themeEngine = themeEngine; // Make globally available
        console.log('✅ Enhanced Theme Engine ready and available globally');
    } catch (error) {
        console.error('❌ Failed to initialize enhanced theme engine:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThemeEngine);
} else {
    // DOM already loaded
    initializeThemeEngine();
}

console.log('📄 JavaNova Enhanced Theme Engine script loaded');
