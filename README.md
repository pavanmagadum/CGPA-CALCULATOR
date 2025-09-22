# CGPA Calculator Web App

A beautiful, modern web-based CGPA (Cumulative Grade Point Average) calculator with an attractive user interface and responsive design.

🌐 **Live Demo**: [Visit CGPA Calculator](https://your-username.github.io/cgpa-calculator)

## Features ✨

- **Modern UI/UX**: Beautiful gradient design with animations and hover effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Forms**: Dynamic subject field generation
- **Real-time Validation**: Input validation with helpful error messages
- **Detailed Results**: Subject-wise breakdown with grade points and summary
- **Print Support**: Print your CGPA results
- **Notifications**: Success/error notifications with smooth animations
- **Grade Conversion**: Automatic conversion from marks (0-100) to grade points (0-10)

## Grade Point Scale 📊

| Marks Range | Grade Points | Grade |
|-------------|--------------|-------|
| 90-100      | 10.0         | A+    |
| 80-89       | 9.0          | A     |
| 70-79       | 8.0          | B+    |
| 60-69       | 7.0          | B     |
| 50-59       | 6.0          | C     |
| 40-49       | 5.0          | D     |
| Below 40    | 0.0          | F     |

## How to Run 🚀

### Method 1: Using Python Server (Recommended)

1. **Make sure Python is installed** on your system
2. **Double-click** `start_server.bat` (Windows) or run `python server.py` in terminal
3. **Wait 2 seconds** for the browser to open automatically, or manually visit the displayed URL
4. **Start calculating** your CGPA!

### Method 2: Direct File Opening

1. Simply **double-click** `index.html`
2. The application will open in your default web browser

### Method 3: Using VS Code Live Server

1. Install the **Live Server** extension in VS Code
2. Right-click on `index.html` and select **"Open with Live Server"**

## File Structure 📁

```
cgpa-calculator/
├── index.html          # Main HTML file
├── style.css           # CSS styling and animations
├── script.js           # JavaScript functionality
├── server.py           # Python server for local hosting
├── start_server.bat    # Windows batch file to start server
├── cgpa.py            # Original Python console version
└── README.md          # This documentation
```

## Usage Instructions 📖

1. **Enter Number of Subjects**: Input how many subjects you want to calculate
2. **Generate Fields**: Click "Create Subject Fields" to generate input forms
3. **Fill Subject Details**: For each subject, enter:
   - Subject name (e.g., "Mathematics", "Physics")
   - Marks obtained (out of 100)
   - Credits for that subject
4. **Calculate**: Click "Calculate CGPA" to get your results
5. **View Results**: See your CGPA, grade, and detailed breakdown
6. **Print Results**: Use the print button to save/print your results

## Technical Details 🛠️

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript (ES6+)**: Interactive functionality and calculations
- **Font Awesome**: Beautiful icons
- **Google Fonts**: Poppins font family
- **Python**: Local server hosting

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### Features Included
- Responsive design for all screen sizes
- Loading animations and transitions
- Form validation and error handling
- Local storage support (future enhancement)
- Print-friendly styling
- Accessibility features

## Deployment Options 🌐

### Local Hosting (Current)
- Python HTTP server (included)
- VS Code Live Server
- Direct file opening

### Free Online Hosting Options
1. **GitHub Pages**: Upload to GitHub repository and enable Pages
2. **Netlify**: Drag and drop deployment
3. **Vercel**: Connect GitHub repository
4. **Surge.sh**: Simple command-line deployment
5. **Firebase Hosting**: Google's hosting service

## Future Enhancements 🚀

- [ ] Save calculation history
- [ ] Export results to PDF
- [ ] Multiple grading systems
- [ ] Dark mode toggle
- [ ] Semester-wise CGPA tracking
- [ ] GPA to percentage conversion
- [ ] Multi-language support

## Support 💬

If you encounter any issues:
1. Make sure all files are in the same directory
2. Check that Python is installed (for server method)
3. Try a different browser
4. Check browser console for error messages

## Contributing 🤝

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the code
- Enhancing the design

## License 📄

This project is open source and available under the MIT License.

---

**Made with ❤️ for students by students**

*Happy calculating! 🎓*