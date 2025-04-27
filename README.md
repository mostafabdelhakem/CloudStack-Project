# CloudStack Project

CloudStack is a modern, responsive website for a cloud hosting service, featuring sections like FAQ, Contact, and a Newsletter subscription form. Built with HTML, SCSS, and JavaScript.

## Features
- **Responsive Design**: Works on mobile, tablet, and desktop.
- **FAQ Section**: Card-based layout for common questions.
- **Contact Form**: Form with validation, loading state, and success message.
- **Newsletter Signup**: Footer form with validation and success feedback.
- **Modern Styling**: Uses SCSS with a clean, cyan-accented theme.

## Project Structure
```
cloudstack-project/
├── assets/
│   ├── css/              # Compiled CSS (style.css - ignored by .gitignore)
│   ├── js/               # JavaScript (main.js)
│   └── images/           # Images (cloudstack-logo.svg)
├── scss/                 # SCSS source files
│   ├── abstracts/        # Variables, functions, mixins
│   ├── components/       # Section-specific styles (FAQ, Contact)
│   ├── layout/           # Layout styles (Footer)
│   └── main.scss         # Main SCSS file
├── index.html            # Main HTML file
├── package.json          # Node.js dependencies and scripts
└── .gitignore            # Git ignore file
```

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/cloudstack-project.git
   cd cloudstack-project
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Project**:
   - Compile SCSS to CSS:
     ```bash
     npm run build
     ```
   - This generates `assets/css/style.css`.

4. **Run Locally**:
   - Open `index.html` in a browser to view the site.

## Deployment
### Deploy on Render.com
1. **Push to GitHub**:
   - Ensure your project is on GitHub (already done).

2. **Create a Static Site on Render**:
   - Go to [render.com](https://render.com) → New → Static Site.
   - Connect GitHub → Select `cloudstack-project`.
   - Configure:
     - Build Command: `npm install && npm run build`
     - Publish Directory: `.`
   - Deploy.

3. **Access the Site**:
   - Use the Render URL (e.g., `https://cloudstack.onrender.com`).

## Technologies Used
- HTML
- SCSS (compiled with `sass`)
- JavaScript
- Font Awesome (for icons)

## Contributing
Feel free to fork this repository, make changes, and submit a pull request.

## License
This project is licensed under the MIT License.