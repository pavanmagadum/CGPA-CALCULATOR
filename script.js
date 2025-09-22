// CGPA Calculator JavaScript

class CGPACalculator {
    constructor() {
        this.subjects = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('createFields').addEventListener('click', () => this.createSubjectFields());
        document.getElementById('calculateCGPA').addEventListener('click', () => this.calculateCGPA());
        document.getElementById('resetCalculator').addEventListener('click', () => this.resetCalculator());
        document.getElementById('printResults').addEventListener('click', () => this.printResults());
        
        // Enter key support for number input
        document.getElementById('numSubjects').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.createSubjectFields();
            }
        });
    }

    createSubjectFields() {
        const numSubjects = parseInt(document.getElementById('numSubjects').value);
        
        if (!numSubjects || numSubjects < 1 || numSubjects > 20) {
            this.showNotification('Please enter a valid number of subjects (1-20)', 'error');
            return;
        }

        const container = document.getElementById('subjectsContainer');
        container.innerHTML = '';
        
        for (let i = 1; i <= numSubjects; i++) {
            const subjectDiv = document.createElement('div');
            subjectDiv.className = 'subject-card';
            subjectDiv.innerHTML = `
                <div class="subject-header">
                    <h4><i class="fas fa-book"></i> Subject ${i}</h4>
                </div>
                <div class="subject-inputs">
                    <div class="input-group">
                        <label for="subject${i}Name">
                            <i class="fas fa-tag"></i> Subject Name
                        </label>
                        <input type="text" id="subject${i}Name" placeholder="e.g., Mathematics" required>
                    </div>
                    <div class="input-row">
                        <div class="input-group">
                            <label for="subject${i}Marks">
                                <i class="fas fa-percentage"></i> Marks (out of 100)
                            </label>
                            <input type="number" id="subject${i}Marks" min="0" max="100" placeholder="85" required>
                        </div>
                        <div class="input-group">
                            <label for="subject${i}Credits">
                                <i class="fas fa-coins"></i> Credits
                            </label>
                            <input type="number" id="subject${i}Credits" min="0.5" max="10" step="0.5" placeholder="4" required>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(subjectDiv);
        }

        // Show calculate button and add animation
        const calculateBtn = document.getElementById('calculateCGPA');
        calculateBtn.style.display = 'block';
        setTimeout(() => calculateBtn.classList.add('visible'), 100);

        // Smooth scroll to subjects
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        this.showNotification('Subject fields created successfully!', 'success');
    }

    marksToGradePoint(marks) {
        if (marks >= 90) return 10.0;
        else if (marks >= 80) return 9.0;
        else if (marks >= 70) return 8.0;
        else if (marks >= 60) return 7.0;
        else if (marks >= 50) return 6.0;
        else if (marks >= 40) return 5.0;
        else return 0.0;
    }

    getGradeLetter(cgpa) {
        if (cgpa >= 9.5) return 'A+';
        else if (cgpa >= 9.0) return 'A';
        else if (cgpa >= 8.5) return 'A-';
        else if (cgpa >= 8.0) return 'B+';
        else if (cgpa >= 7.5) return 'B';
        else if (cgpa >= 7.0) return 'B-';
        else if (cgpa >= 6.5) return 'C+';
        else if (cgpa >= 6.0) return 'C';
        else if (cgpa >= 5.5) return 'C-';
        else if (cgpa >= 5.0) return 'D';
        else return 'F';
    }

    validateInputs(numSubjects) {
        for (let i = 1; i <= numSubjects; i++) {
            const name = document.getElementById(`subject${i}Name`).value.trim();
            const marks = parseFloat(document.getElementById(`subject${i}Marks`).value);
            const credits = parseFloat(document.getElementById(`subject${i}Credits`).value);

            if (!name) {
                this.showNotification(`Please enter name for Subject ${i}`, 'error');
                return false;
            }
            if (isNaN(marks) || marks < 0 || marks > 100) {
                this.showNotification(`Please enter valid marks (0-100) for Subject ${i}`, 'error');
                return false;
            }
            if (isNaN(credits) || credits < 0.5 || credits > 10) {
                this.showNotification(`Please enter valid credits (0.5-10) for Subject ${i}`, 'error');
                return false;
            }
        }
        return true;
    }

    calculateCGPA() {
        const numSubjects = parseInt(document.getElementById('numSubjects').value);
        
        if (!this.validateInputs(numSubjects)) {
            return;
        }

        // Show loading
        document.getElementById('loadingOverlay').style.display = 'flex';

        // Simulate calculation delay for better UX
        setTimeout(() => {
            this.subjects = [];
            let totalCredits = 0;
            let totalWeightedGrade = 0;

            // Collect subject data
            for (let i = 1; i <= numSubjects; i++) {
                const name = document.getElementById(`subject${i}Name`).value.trim();
                const marks = parseFloat(document.getElementById(`subject${i}Marks`).value);
                const credits = parseFloat(document.getElementById(`subject${i}Credits`).value);
                const gradePoint = this.marksToGradePoint(marks);

                const subject = {
                    name,
                    marks,
                    credits,
                    gradePoint
                };

                this.subjects.push(subject);
                totalWeightedGrade += gradePoint * credits;
                totalCredits += credits;
            }

            const cgpa = totalCredits > 0 ? totalWeightedGrade / totalCredits : 0;
            
            // Hide loading and display results
            document.getElementById('loadingOverlay').style.display = 'none';
            this.displayResults(cgpa, totalCredits, totalWeightedGrade);
            
        }, 1500); // 1.5 second delay for loading effect
    }

    displayResults(cgpa, totalCredits, totalWeightedGrade) {
        // Display main CGPA
        document.getElementById('cgpaNumber').textContent = cgpa.toFixed(2);
        document.getElementById('cgpaGrade').textContent = `Grade: ${this.getGradeLetter(cgpa)}`;

        // Create results table
        const tableBody = document.getElementById('resultsTableBody');
        tableBody.innerHTML = '';

        this.subjects.forEach((subject, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="subject-name">
                        <i class="fas fa-book"></i>
                        ${subject.name}
                    </div>
                </td>
                <td class="marks-cell">${subject.marks}/100</td>
                <td class="credits-cell">${subject.credits}</td>
                <td class="grade-cell">${subject.gradePoint.toFixed(1)}</td>
            `;
            row.style.animationDelay = `${index * 0.1}s`;
            tableBody.appendChild(row);
        });

        // Update summary
        document.getElementById('totalCredits').textContent = totalCredits.toFixed(1);
        document.getElementById('totalGradePoints').textContent = totalWeightedGrade.toFixed(2);

        // Show results with animation
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });

        // Add success notification
        this.showNotification(`CGPA calculated successfully! Your CGPA is ${cgpa.toFixed(2)}`, 'success');
    }

    resetCalculator() {
        // Reset form
        document.getElementById('numSubjects').value = '';
        document.getElementById('subjectsContainer').innerHTML = '';
        document.getElementById('calculateCGPA').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'none';
        
        // Clear subjects array
        this.subjects = [];
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        this.showNotification('Calculator reset successfully!', 'info');
    }

    printResults() {
        const printWindow = window.open('', '', 'height=600,width=800');
        
        const printContent = `
            <html>
                <head>
                    <title>CGPA Results</title>
                    <style>
                        body { font-family: 'Arial', sans-serif; margin: 20px; }
                        h1 { color: #4f46e5; text-align: center; }
                        .cgpa-result { text-align: center; font-size: 24px; margin: 20px 0; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                        th { background-color: #4f46e5; color: white; }
                        .summary { margin-top: 20px; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <h1>CGPA Calculation Results</h1>
                    <div class="cgpa-result">
                        Final CGPA: ${document.getElementById('cgpaNumber').textContent}
                        (${document.getElementById('cgpaGrade').textContent})
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Marks</th>
                                <th>Credits</th>
                                <th>Grade Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.subjects.map(subject => `
                                <tr>
                                    <td>${subject.name}</td>
                                    <td>${subject.marks}/100</td>
                                    <td>${subject.credits}</td>
                                    <td>${subject.gradePoint.toFixed(1)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="summary">
                        <p>Total Credits: ${document.getElementById('totalCredits').textContent}</p>
                        <p>Total Grade Points: ${document.getElementById('totalGradePoints').textContent}</p>
                        <p>Generated on: ${new Date().toLocaleDateString()}</p>
                    </div>
                </body>
            </html>
        `;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            ${message}
        `;

        // Add to document
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CGPACalculator();
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate header on load
    const header = document.querySelector('.header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        header.style.transition = 'all 0.8s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);
});