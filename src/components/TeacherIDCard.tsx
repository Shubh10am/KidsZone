import React from 'react';
import { Download, Printer, X } from 'lucide-react';
import { Teacher } from '../types';
import { useApp } from '../context/AppContext';

interface TeacherIDCardProps {
  teacher: Teacher;
  onClose: () => void;
}

const TeacherIDCard: React.FC<TeacherIDCardProps> = ({ teacher, onClose }) => {
  const { state } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download functionality would be implemented here');
  };

  const calculateExperience = () => {
    const joiningDate = new Date(teacher.dateOfJoining);
    const currentDate = new Date();
    const years = currentDate.getFullYear() - joiningDate.getFullYear();
    const months = currentDate.getMonth() - joiningDate.getMonth();
    
    if (months < 0) {
      return `${years - 1} years`;
    }
    return `${years} years`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Teacher ID Card</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                title="Print"
              >
                <Printer className="w-4 h-4" />
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

        {/* ID Card Content */}
        <div className="p-6" id="teacher-id-card">
          {/* Front Side */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border-2 border-green-200 shadow-lg mb-6">
            {/* School Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-4 mb-3">
                <img 
                  src={state.schoolInfo.logo} 
                  alt={state.schoolInfo.name}
                  className="w-12 h-12 rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div>
                  <h1 className="text-lg font-bold text-green-900">{state.schoolInfo.name}</h1>
                  <p className="text-xs text-green-700">Faculty Identity Card</p>
                </div>
              </div>
              <div className="w-full h-px bg-green-300 mb-4"></div>
            </div>

            {/* Teacher Photo Placeholder */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-28 bg-gray-200 rounded-lg border-2 border-white shadow-md flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      {teacher.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Photo</p>
                </div>
              </div>
            </div>

            {/* Teacher Details */}
            <div className="space-y-3">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900">{teacher.name}</h2>
                <p className="text-sm text-green-600 font-medium">Faculty Member</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-gray-500 text-xs">Employee ID</p>
                  <p className="font-bold text-gray-900">EMP{teacher.id?.slice(-4) || '0001'}</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-gray-500 text-xs">Age</p>
                  <p className="font-bold text-gray-900">{teacher.age} years</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-gray-500 text-xs">Date of Joining</p>
                <p className="font-bold text-gray-900">
                  {new Date(teacher.dateOfJoining).toLocaleDateString('en-IN')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-gray-500 text-xs">Experience</p>
                <p className="font-bold text-gray-900">{calculateExperience()}</p>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-gray-500 text-xs">Emergency Contact</p>
                <p className="font-bold text-gray-900">{teacher.emergencyNumber}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-green-200">
              <div className="text-center">
                <p className="text-xs text-green-700 font-medium">Academic Year 2024-25</p>
                <p className="text-xs text-gray-600 mt-1">
                  Issued: {new Date().toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 border-2 border-gray-200 shadow-lg">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Professional Information</h3>
              <div className="w-full h-px bg-gray-300 mt-2"></div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Personal Details:</h4>
                <p className="text-gray-700">Email: {teacher.email}</p>
                <p className="text-gray-700">Mobile: {teacher.mobileNumber}</p>
                <p className="text-gray-700">Father's Name: {teacher.fatherName}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">School Address:</h4>
                <p className="text-gray-700">{state.schoolInfo.address}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact Information:</h4>
                <p className="text-gray-700">Phone: {state.schoolInfo.phone}</p>
                <p className="text-gray-700">Website: {state.schoolInfo.website}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Guidelines:</h4>
                <ul className="text-gray-700 text-xs space-y-1">
                  <li>• This card must be displayed during school hours</li>
                  <li>• Report immediately if lost or damaged</li>
                  <li>• Valid for current academic year only</li>
                  <li>• Non-transferable</li>
                </ul>
              </div>

              <div className="bg-green-100 rounded-lg p-3 mt-4">
                <p className="text-xs text-green-800 text-center font-medium">
                  "Inspiring Minds, Shaping Futures"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherIDCard;