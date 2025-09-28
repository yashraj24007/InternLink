import jsPDF from 'jspdf';

// Student Profile PDF Generator
export const generateStudentProfilePDF = (studentData: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Student Profile', 20, 20);
  
  // Student basic info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${studentData.name || 'John Doe'}`, 20, 40);
  doc.text(`Email: ${studentData.email || 'student@demo.com'}`, 20, 50);
  doc.text(`Phone: ${studentData.phone || '+91 98765 43210'}`, 20, 60);
  doc.text(`Department: ${studentData.department || 'Computer Science'}`, 20, 70);
  doc.text(`Year: ${studentData.year || '3rd Year'}`, 20, 80);
  doc.text(`CGPA: ${studentData.cgpa || '8.5'}`, 20, 90);
  
  // Skills section
  doc.setFont('helvetica', 'bold');
  doc.text('Skills:', 20, 110);
  doc.setFont('helvetica', 'normal');
  const skills = studentData.skills || ['JavaScript', 'React', 'Node.js', 'Python'];
  doc.text(skills.join(', '), 20, 120);
  
  // Projects section
  doc.setFont('helvetica', 'bold');
  doc.text('Projects:', 20, 140);
  doc.setFont('helvetica', 'normal');
  doc.text('• E-commerce Website - React & Node.js', 20, 150);
  doc.text('• AI Chatbot - Python & TensorFlow', 20, 160);
  doc.text('• Mobile App - React Native', 20, 170);
  
  // Download the PDF
  doc.save(`${studentData.name || 'Student'}_Profile.pdf`);
};

// Resume Template PDF Generator
export const generateResumePDF = (templateType: string, studentData: any) => {
  const doc = new jsPDF();
  
  // Header with student name
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(studentData.name || 'John Doe', 20, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${studentData.email || 'student@demo.com'} | ${studentData.phone || '+91 98765 43210'}`, 20, 30);
  
  // Template-specific styling
  let yPosition = 50;
  
  switch (templateType) {
    case 'Professional':
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL EXPERIENCE', 20, yPosition);
      yPosition += 15;
      doc.setFont('helvetica', 'normal');
      doc.text('• Intern at TechCorp - Developed web applications using React', 20, yPosition);
      yPosition += 10;
      doc.text('• Project Lead at College - Led team of 5 developers', 20, yPosition);
      break;
      
    case 'Creative':
      doc.setFont('helvetica', 'bold');
      doc.text('CREATIVE PORTFOLIO', 20, yPosition);
      yPosition += 15;
      doc.setFont('helvetica', 'normal');
      doc.text('• UI/UX Designer - Designed mobile apps and websites', 20, yPosition);
      yPosition += 10;
      doc.text('• Graphic Designer - Created marketing materials', 20, yPosition);
      break;
      
    case 'Technical':
      doc.setFont('helvetica', 'bold');
      doc.text('TECHNICAL SKILLS', 20, yPosition);
      yPosition += 15;
      doc.setFont('helvetica', 'normal');
      doc.text('Programming: JavaScript, Python, Java, C++', 20, yPosition);
      yPosition += 10;
      doc.text('Frameworks: React, Node.js, Django, Spring Boot', 20, yPosition);
      break;
      
    case 'Academic':
      doc.setFont('helvetica', 'bold');
      doc.text('ACADEMIC ACHIEVEMENTS', 20, yPosition);
      yPosition += 15;
      doc.setFont('helvetica', 'normal');
      doc.text('• CGPA: 8.5/10', 20, yPosition);
      yPosition += 10;
      doc.text('• Research Paper Published in IEEE Conference', 20, yPosition);
      break;
  }
  
  // Common sections
  yPosition += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('EDUCATION', 20, yPosition);
  yPosition += 15;
  doc.setFont('helvetica', 'normal');
  doc.text(`${studentData.degree || 'B.Tech Computer Science'}`, 20, yPosition);
  yPosition += 10;
  doc.text(`${studentData.college || 'XYZ University'} | ${studentData.year || '2021-2025'}`, 20, yPosition);
  
  yPosition += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('SKILLS', 20, yPosition);
  yPosition += 15;
  doc.setFont('helvetica', 'normal');
  const skills = studentData.skills || ['JavaScript', 'React', 'Node.js', 'Python'];
  doc.text(skills.join(', '), 20, yPosition);
  
  // Download the PDF
  doc.save(`${templateType}_Resume_${studentData.name || 'Student'}.pdf`);
};

// Admin Report PDF Generator
export const generateAdminReportPDF = (reportType: string, data: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`${reportType} Report`, 20, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  
  let yPosition = 50;
  
  switch (reportType) {
    case 'User Activity':
      doc.setFont('helvetica', 'bold');
      doc.text('User Statistics:', 20, yPosition);
      yPosition += 15;
      doc.setFont('helvetica', 'normal');
      doc.text('• Total Users: 1,234', 20, yPosition);
      yPosition += 10;
      doc.text('• Active Users: 892', 20, yPosition);
      yPosition += 10;
      doc.text('• New Users (This Month): 156', 20, yPosition);
      break;
      
    case 'Placement Statistics':
      doc.setFont('helvetica', 'bold');
      doc.text('Placement Overview:', 20, yPosition);
      yPosition += 15;
      doc.setFont('helvetica', 'normal');
      doc.text('• Total Students: 500', 20, yPosition);
      yPosition += 10;
      doc.text('• Placed Students: 387', 20, yPosition);
      yPosition += 10;
      doc.text('• Placement Rate: 77.4%', 20, yPosition);
      break;
      
    case 'System Performance':
      doc.setFont('helvetica', 'bold');
      doc.text('System Metrics:', 20, yPosition);
      yPosition += 15;
      doc.setFont('helvetica', 'normal');
      doc.text('• Server Uptime: 99.9%', 20, yPosition);
      yPosition += 10;
      doc.text('• Average Response Time: 245ms', 20, yPosition);
      yPosition += 10;
      doc.text('• Database Size: 2.3GB', 20, yPosition);
      break;
  }
  
  // Download the PDF
  doc.save(`${reportType.replace(' ', '_')}_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};

// Placement Cell Report PDF Generator
export const generatePlacementReportPDF = (reportData: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Placement Cell Report', 20, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Academic Year: ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`, 20, 30);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
  
  let yPosition = 60;
  
  // Overall Statistics
  doc.setFont('helvetica', 'bold');
  doc.text('Overall Placement Statistics:', 20, yPosition);
  yPosition += 15;
  doc.setFont('helvetica', 'normal');
  doc.text('• Total Eligible Students: 450', 20, yPosition);
  yPosition += 10;
  doc.text('• Students Placed: 387', 20, yPosition);
  yPosition += 10;
  doc.text('• Placement Percentage: 86%', 20, yPosition);
  yPosition += 10;
  doc.text('• Average Package: ₹6.2 LPA', 20, yPosition);
  yPosition += 10;
  doc.text('• Highest Package: ₹42 LPA', 20, yPosition);
  
  yPosition += 20;
  
  // Department-wise breakdown
  doc.setFont('helvetica', 'bold');
  doc.text('Department-wise Placement:', 20, yPosition);
  yPosition += 15;
  doc.setFont('helvetica', 'normal');
  doc.text('• Computer Science: 95% (142/150)', 20, yPosition);
  yPosition += 10;
  doc.text('• Electronics: 85% (85/100)', 20, yPosition);
  yPosition += 10;
  doc.text('• Mechanical: 78% (78/100)', 20, yPosition);
  yPosition += 10;
  doc.text('• Civil: 82% (82/100)', 20, yPosition);
  
  yPosition += 20;
  
  // Top recruiting companies
  doc.setFont('helvetica', 'bold');
  doc.text('Top Recruiting Companies:', 20, yPosition);
  yPosition += 15;
  doc.setFont('helvetica', 'normal');
  doc.text('• TCS - 45 students', 20, yPosition);
  yPosition += 10;
  doc.text('• Infosys - 38 students', 20, yPosition);
  yPosition += 10;
  doc.text('• Wipro - 32 students', 20, yPosition);
  yPosition += 10;
  doc.text('• Amazon - 12 students', 20, yPosition);
  yPosition += 10;
  doc.text('• Microsoft - 8 students', 20, yPosition);
  
  // Download the PDF
  doc.save(`Placement_Report_${new Date().getFullYear()}.pdf`);
};

// General PDF download utility
export const downloadPDF = (content: string, filename: string) => {
  const doc = new jsPDF();
  
  // Split content into lines to fit page width
  const lines = doc.splitTextToSize(content, 170);
  
  doc.setFontSize(12);
  doc.text(lines, 20, 20);
  
  doc.save(filename);
};