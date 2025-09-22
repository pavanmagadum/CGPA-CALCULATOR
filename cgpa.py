def marks_to_grade_point(marks):
    """Convert marks (out of 100) to grade points using standard grading scale"""
    if marks >= 90:
        return 10.0
    elif marks >= 80:
        return 9.0
    elif marks >= 70:
        return 8.0
    elif marks >= 60:
        return 7.0
    elif marks >= 50:
        return 6.0
    elif marks >= 40:
        return 5.0
    else:
        return 0.0

def cgpa_calculator():
    print("CGPA Calculator")
    print("-" * 50)
    print("Note: Total marks for each subject is 100")
    print("-" * 50)
    
    n = int(input("Enter the number of subjects: "))
    total_credits = 0
    total_weighted_grade = 0
    subjects_data = []
    
    print("\nEnter details for each subject:")
    for i in range(n):
        print(f"\n--- Subject {i+1} ---")
        subject_name = input("Enter subject name: ")
        marks = float(input(f"Enter marks obtained (out of 100): "))
        credits = float(input(f"Enter credits for this subject: "))
        
        # Convert marks to grade point
        grade_point = marks_to_grade_point(marks)
        
        # Store subject data for display
        subjects_data.append({
            'name': subject_name,
            'marks': marks,
            'credits': credits,
            'grade_point': grade_point
        })
        
        # Calculate weighted grade
        total_weighted_grade += grade_point * credits
        total_credits += credits
    
    # Calculate CGPA
    cgpa = total_weighted_grade / total_credits if total_credits else 0
    
    # Display results
    print("\n" + "="*60)
    print("CGPA CALCULATION RESULTS")
    print("="*60)
    print(f"{'Subject':<20} {'Marks':<10} {'Credits':<10} {'Grade Point':<12}")
    print("-" * 60)
    
    for subject in subjects_data:
        print(f"{subject['name']:<20} {subject['marks']:<10} {subject['credits']:<10} {subject['grade_point']:<12}")
    
    print("-" * 60)
    print(f"Total Credits: {total_credits}")
    print(f"Total Weighted Grade Points: {total_weighted_grade:.2f}")
    print(f"Your CGPA is: {cgpa:.2f}")
    print("="*60)

cgpa_calculator()
