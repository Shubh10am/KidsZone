'use client'

import React, { useState } from 'react'
import Layout from './Layout'
import Dashboard from './Dashboard'
import Students from './Students'
import Teachers from './Teachers'
import Attendance from './Attendance'
import Invoices from './Invoices'
import FeeStructure from './FeeStructure'
import StudentView from './StudentView'
import TeacherView from './TeacherView'
import { Student, Teacher } from '@/types'

export default function SchoolManagementApp() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null)
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null)

  const handleNavigateToDetails = (type: 'student' | 'teacher', item: Student | Teacher) => {
    if (type === 'student') {
      setViewingStudent(item as Student)
      setViewingTeacher(null)
      setCurrentPage('student-view')
    } else {
      setViewingTeacher(item as Teacher)
      setViewingStudent(null)
      setCurrentPage('teacher-view')
    }
  }

  const handleBackToList = (type: 'student' | 'teacher') => {
    setViewingStudent(null)
    setViewingTeacher(null)
    setCurrentPage(type === 'student' ? 'students' : 'teachers')
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />
      case 'students':
        return <Students />
      case 'teachers':
        return <Teachers />
      case 'attendance':
        return <Attendance />
      case 'invoices':
        return <Invoices />
      case 'fees':
        return <FeeStructure />
      case 'student-view':
        return viewingStudent ? (
          <StudentView
            student={viewingStudent}
            onClose={() => handleBackToList('student')}
            onEdit={() => {
              setCurrentPage('students')
            }}
          />
        ) : null
      case 'teacher-view':
        return viewingTeacher ? (
          <TeacherView
            teacher={viewingTeacher}
            onClose={() => handleBackToList('teacher')}
            onEdit={() => {
              setCurrentPage('teachers')
            }}
          />
        ) : null
      default:
        return <Dashboard onPageChange={setCurrentPage} />
    }
  }

  return (
    <Layout 
      currentPage={currentPage} 
      onPageChange={setCurrentPage}
      onNavigateToDetails={handleNavigateToDetails}
    >
      {renderCurrentPage()}
    </Layout>
  )
}