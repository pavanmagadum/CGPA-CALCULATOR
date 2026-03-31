document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDisplay = document.getElementById('result-display');
    const sgpaNum = document.getElementById('sgpa-num');
    const sgpaProgress = document.getElementById('sgpa-progress');
    const remark = document.getElementById('remark');

    const subjects = [
        { id: 'dmv', max: 100, credits: 3 },
        { id: 'bda', max: 100, credits: 3 },
        { id: 'bizda', max: 100, credits: 3 },
        { id: 'project', max: 200, credits: 15 }
    ];

    // Real-time update logic
    subjects.forEach(sub => {
        const totalInput = document.getElementById(`${sub.id}-total-input`);
        const totalSpan = document.getElementById(`${sub.id}-total`);
        const gpSpan = document.getElementById(`${sub.id}-gp`);

        const updateIndividual = () => {
            let total = parseFloat(totalInput.value) || 0;
            
            // Validation
            if (total > sub.max) {
                total = sub.max;
                totalInput.value = sub.max;
            }
            if (total < 0) {
                total = 0;
                totalInput.value = 0;
            }
            
            totalSpan.textContent = total;

            // Calculate percentage based on max possible marks
            const percentage = (total / sub.max) * 100;
            const gp = getGradePoint(percentage);
            gpSpan.textContent = gp;
        };

        totalInput.addEventListener('input', updateIndividual);
    });

    const getGradePoint = (percentage) => {
        if (percentage >= 90) return 10;
        if (percentage >= 80) return 9;
        if (percentage >= 70) return 8;
        if (percentage >= 60) return 7;
        if (percentage >= 50) return 6;
        if (percentage >= 45) return 5;
        if (percentage >= 40) return 4;
        return 0;
    };

    const getRemark = (sgpa) => {
        if (sgpa >= 9.0) return "Outstanding! You're a topper.";
        if (sgpa >= 8.0) return "Excellent Work! Keep it up.";
        if (sgpa >= 7.0) return "Very Good. Room for growth.";
        if (sgpa >= 6.0) return "Good effort. Study more.";
        if (sgpa >= 5.0) return "Satisfactory. Focus harder.";
        return "Need Improvement.";
    };

    calculateBtn.addEventListener('click', () => {
        let totalWeightedGP = 0;
        let totalScored = 0;
        let totalMax = 0;
        const totalCredits = 24;

        subjects.forEach(sub => {
            const totalInput = document.getElementById(`${sub.id}-total-input`);
            const total = parseFloat(totalInput.value) || 0;
            const percentage = (total / sub.max) * 100;
            const gp = getGradePoint(percentage);
            totalWeightedGP += (gp * sub.credits);
            totalScored += total;
            totalMax += sub.max;
        });

        const sgpa = totalWeightedGP / totalCredits;
        
        // Show result
        resultDisplay.classList.remove('hidden');
        resultDisplay.classList.add('visible');
        
        // Animate SGPA Progress Circle (Circumference is 283)
        const offset = 283 - (283 * (sgpa / 10));
        sgpaProgress.style.strokeDashoffset = offset;
        
        // Final SGPA value
        sgpaNum.textContent = sgpa.toFixed(2);
        remark.textContent = getRemark(sgpa);
        document.getElementById('details').innerHTML = `
            Scored ${totalScored.toFixed(0)} / ${totalMax} Total Marks <br>
            24 / 24 Credits Earned <br>
            <small>(Major Project contributes 15 credits)</small>
        `;

        // Scroll to result
        resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});