import React from 'react';
import { Download, Printer, X } from 'lucide-react';
import { Student } from '../types';
import { useApp } from '../context/AppContext';

interface StudentIDCardProps {
  student: Student;
  onClose: () => void;
}

const StudentIDCard: React.FC<StudentIDCardProps> = ({ student, onClose }) => {
  const { state } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a new window for printing/downloading
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Student ID Card - ${student.name}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
            body { background: #f0f0f0; padding: 20px; }
            .page { width: 210mm; height: 297mm; background: white; margin: 0 auto 20px; padding: 20mm; page-break-after: always; }
            .id-card { width: 85.6mm; height: 53.98mm; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
            .front-card { background: linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%); border: 2px solid #3b82f6; }
            .back-card { background: linear-gradient(135deg, #f9fafb 0%, #dbeafe 100%); border: 2px solid #6b7280; }
            .card-header { text-align: center; padding: 8px; background: rgba(59, 130, 246, 0.1); border-bottom: 1px solid #3b82f6; }
            .school-logo { width: 24px; height: 24px; border-radius: 4px; margin: 0 auto 4px; }
            .school-name { font-size: 10px; font-weight: 700; color: #1e40af; margin-bottom: 2px; }
            .card-type { font-size: 6px; color: #3730a3; }
            .card-body { padding: 8px; }
            .photo-section { text-align: center; margin-bottom: 8px; }
            .photo-placeholder { width: 40px; height: 48px; background: #e5e7eb; border-radius: 4px; margin: 0 auto; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .photo-initial { width: 28px; height: 28px; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #2563eb; }
            .student-name { font-size: 12px; font-weight: 700; color: #111827; text-align: center; margin: 6px 0 2px; }
            .student-class { font-size: 8px; color: #2563eb; font-weight: 600; text-align: center; margin-bottom: 6px; }
            .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 6px; }
            .detail-item { background: white; padding: 4px; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
            .detail-label { font-size: 5px; color: #6b7280; margin-bottom: 1px; }
            .detail-value { font-size: 7px; font-weight: 700; color: #111827; }
            .full-width { grid-column: 1 / -1; }
            .card-footer { text-align: center; padding-top: 6px; border-top: 1px solid #3b82f6; }
            .academic-year { font-size: 6px; color: #3730a3; font-weight: 600; }
            .issue-date { font-size: 5px; color: #6b7280; margin-top: 2px; }
            .back-content { padding: 8px; }
            .back-title { font-size: 10px; font-weight: 700; color: #111827; text-align: center; margin-bottom: 6px; }
            .back-section { margin-bottom: 6px; }
            .back-section-title { font-size: 7px; font-weight: 600; color: #111827; margin-bottom: 3px; }
            .back-text { font-size: 6px; color: #374151; line-height: 1.3; }
            .instructions { list-style: none; }
            .instructions li { font-size: 5px; color: #374151; margin-bottom: 1px; }
            .motto { background: #dbeafe; padding: 4px; border-radius: 4px; text-align: center; margin-top: 6px; }
            .motto-text { font-size: 6px; color: #1e40af; font-weight: 600; }
            @media print { body { background: white; padding: 0; } .page { margin: 0; padding: 10mm; box-shadow: none; } }
          </style>
        </head>
        <body>
          <!-- Front Side Page -->
          <div class="page">
            <h2 style="text-align: center; margin-bottom: 20px; color: #1f2937;">Student ID Card - Front</h2>
            <div class="id-card front-card">
              <div class="card-header">
                <div class="school-name">${state.schoolInfo.name}</div>
                <div class="card-type">Student Identity Card</div>
              </div>
              <div class="card-body">
                <div class="photo-section">
                  <div class="photo-placeholder">
                    <div class="photo-initial">${student.name.charAt(0).toUpperCase()}</div>
                  </div>
                </div>
                <div class="student-name">${student.name}</div>
                <div class="student-class">Class: ${student.grade}</div>
                <div class="details-grid">
                  <div class="detail-item">
                    <div class="detail-label">Roll Number</div>
                    <div class="detail-value">${student.rollNumber}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Age</div>
                    <div class="detail-value">${student.age} years</div>
                  </div>
                  <div class="detail-item full-width">
                    <div class="detail-label">Date of Birth</div>
                    <div class="detail-value">${new Date(student.dateOfBirth).toLocaleDateString('en-IN')}</div>
                  </div>
                  <div class="detail-item full-width">
                    <div class="detail-label">Emergency Contact</div>
                    <div class="detail-value">${student.emergencyNumber}</div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="academic-year">Academic Year 2024-25</div>
                  <div class="issue-date">Issued: ${new Date().toLocaleDateString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Back Side Page -->
          <div class="page">
            <h2 style="text-align: center; margin-bottom: 20px; color: #1f2937;">Student ID Card - Back</h2>
            <div class="id-card back-card">
              <div class="back-content">
                <div class="back-title">Important Information</div>
                <div class="back-section">
                  <div class="back-section-title">School Address:</div>
                  <div class="back-text">${state.schoolInfo.address}</div>
                </div>
                <div class="back-section">
                  <div class="back-section-title">Contact Information:</div>
                  <div class="back-text">Phone: ${state.schoolInfo.phone}</div>
                  <div class="back-text">Email: ${state.schoolInfo.email}</div>
                  <div class="back-text">Website: ${state.schoolInfo.website}</div>
                </div>
                <div class="back-section">
                  <div class="back-section-title">Instructions:</div>
                  <ul class="instructions">
                    <li>• This card must be carried at all times</li>
                    <li>• Report immediately if lost or damaged</li>
                    <li>• Valid for current academic year only</li>
                    <li>• Non-transferable</li>
                  </ul>
                </div>
                <div class="motto">
                  <div class="motto-text">"Learning Today, Leading Tomorrow"</div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Student ID Card Preview</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="flex items-center px-3 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
                title="Download PDF"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center px-3 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
                title="Print"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          <div className="space-y-8">
            {/* Front Side */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Front Side</h3>
              <div className="inline-block">
                <div className="w-80 h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-2 border-blue-200 shadow-lg">
                  {/* School Header */}
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <img 
                      src={state.schoolInfo.logo} 
                      alt={state.schoolInfo.name}
                      className="w-8 h-8 rounded-lg shadow-md"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="text-center">
                      <h1 className="text-sm font-bold text-blue-900">{state.schoolInfo.name}</h1>
                      <p className="text-xs text-blue-700">Student Identity Card</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    {/* Photo */}
                    <div className="w-16 h-20 bg-gray-200 rounded-lg border-2 border-white shadow-md flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-lg font-bold text-blue-600">
                            {student.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Photo</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">{student.name}</h2>
                        <p className="text-sm text-blue-600 font-medium">Class: {student.grade}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white rounded p-2 shadow-sm">
                          <p className="text-gray-500">Roll No.</p>
                          <p className="font-bold text-gray-900">{student.rollNumber}</p>
                        </div>
                        <div className="bg-white rounded p-2 shadow-sm">
                          <p className="text-gray-500">Age</p>
                          <p className="font-bold text-gray-900">{student.age} years</p>
                        </div>
                      </div>

                      <div className="bg-white rounded p-2 shadow-sm text-xs">
                        <p className="text-gray-500">Emergency</p>
                        <p className="font-bold text-gray-900">{student.emergencyNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-blue-200 text-center">
                    <p className="text-xs text-blue-700 font-medium">Academic Year 2024-25</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Back Side</h3>
              <div className="inline-block">
                <div className="w-80 h-48 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                  <div className="text-center mb-3">
                    <h3 className="text-sm font-bold text-gray-900">Important Information</h3>
                    <div className="w-full h-px bg-gray-300 mt-1"></div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">School Address:</h4>
                      <p className="text-gray-700">{state.schoolInfo.address}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Contact:</h4>
                      <p className="text-gray-700">Phone: {state.schoolInfo.phone}</p>
                      <p className="text-gray-700">Website: {state.schoolInfo.website}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Instructions:</h4>
                      <ul className="text-gray-700 text-xs space-y-1">
                        <li>• Carry at all times</li>
                        <li>• Report if lost</li>
                        <li>• Valid for current year</li>
                        <li>• Non-transferable</li>
                      </ul>
                    </div>

                    <div className="bg-blue-100 rounded p-2 mt-2">
                      <p className="text-xs text-blue-800 text-center font-medium">
                        "Learning Today, Leading Tomorrow"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentIDCard;