# JavaNova Academy

## Overview
This cosmic-themed presentation features an interactive cursor system that dynamically changes based on user interactions, creating an immersive experience. The presentation showcases JavaNova Academy's journey and features with a space-inspired design.

## Features

### Cosmic Design Elements
- ✨ Animated starfield background with twinkling stars
- 🌌 Colorful nebula effects with gradient colors
- 🚀 Space-themed color palette with cosmic gradients

### Interactive Cursor System
- 🔵 Primary glowing cyan cursor with trailing halo effect
- 🔄 Dynamic transformations based on context:
  - 🟡 Expands and turns yellow when hovering cards/buttons
  - 🟠 Turns orange when hovering links
  - 🟣 Changes to purple when hovering text
  - 💖 Shrinks and turns pink when clicking

### Presentation Structure
- 📄 Three main slides:
  1. Title slide with cosmic introduction
  2. "Our Story" slide with academy's journey
  3. Features slide highlighting unique offerings
- 📱 Fully responsive design for all device sizes
- 💫 Floating animations for key elements

### Special Elements
- 🌐 Website integration with your JavaNova Academy link
- 💬 Social media links with Discord and Telegram
- 🎚 Interactive buttons with hover effects

## How to Use

1. Simply open the HTML file in any modern browser
2. Move your cursor around to see the interactive effects:
   - Hover over cards to see the cursor expand and change color
   - Move over text to see the cursor transform
   - Click anywhere to see the clicking animation
   - Hover over links to see the link-specific cursor

3. Use the navigation:
   - Scroll through the presentation
   - Click on interactive buttons
   - Visit social links and your website

## Customization

To customize the presentation:

1. **Update content**:
   - Modify text in the HTML file
   - Add/remove content cards as needed

2. **Change colors**:
   - Edit the CSS variables in the `:root` section:
     ```css
     :root {
       --cosmic-blue: #0a0a2a;
       --cosmic-purple: #6a0dad;
       --cosmic-pink: #ff00ff;
       --cosmic-cyan: #00ffff;
       --cosmic-yellow: #ffff00;
       --cosmic-orange: #ff8c42;
     }
     ```

3. **Modify cursor behavior**:
   - Adjust cursor sizes in the `.cursor` and `.cursor-follower` classes
   - Change transformation values in the cursor state classes (`.hover`, `.link`, etc.)

4. **Update links**:
   - Replace placeholder social media links with your actual URLs
   - Ensure your website link is correct:
     ```html
     <a href="https://ahmedtyson.github.io/JavaNova-project/javanova.html">...</a>
     ```

## Dependencies

- [Font Awesome 6](https://fontawesome.com) - For icons
- Modern browser with CSS3 and JavaScript support

## License

This project is open-source and available under the [MIT License](LICENSE).

---

**Experience the cosmic journey!** Simply open the HTML file to explore JavaNova Academy's story with this interactive, space-themed presentation.