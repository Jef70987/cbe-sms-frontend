// Based on the PostgreSQL schema (sms_app_student, sms_app_studentattendance, etc.)
export const studentInfo = {
  id: 1,
  admission_no: '2024/001',
  first_name: 'John',
  middle_name: 'Kipchoge',
  last_name: 'Mutai',
  date_of_birth: '2007-05-12',
  gender: 'Male',
  nationality: 'Kenyan',
  religion: 'Christian',
  address: '123 Kimathi Street',
  city: 'Nairobi',
  country: 'Kenya',
  phone: '+254712345678',
  email: 'john.mutai@student.school.ke',
  current_class: 'Form 3 West',
  stream: 'West',
  roll_number: 15,
  admission_date: '2022-01-10',
  status: 'Active',
  guardian_name: 'Peter Mutai',
  guardian_relation: 'Father',
  guardian_phone: '+254722334455',
  guardian_email: 'p.mutai@parent.com',
}

export const attendanceSummary = {
  present: 78,
  absent: 4,
  late: 3,
  total_days: 85,
}

export const attendanceRecords = [
  { date: '2025-03-10', status: 'Present', session: 'Morning', subject: 'Mathematics' },
  { date: '2025-03-10', status: 'Present', session: 'Afternoon', subject: 'English' },
  { date: '2025-03-09', status: 'Late', session: 'Morning', subject: 'Physics' },
  { date: '2025-03-09', status: 'Present', session: 'Afternoon', subject: 'Chemistry' },
  { date: '2025-03-08', status: 'Absent', session: 'Morning', subject: 'History' },
]

export const gradeSummary = [
  { subject: 'Mathematics', opener: 78, midterm: 82, endterm: 85, final: 'B+' },
  { subject: 'English', opener: 68, midterm: 72, endterm: 70, final: 'B-' },
  { subject: 'Kiswahili', opener: 81, midterm: 79, endterm: 84, final: 'A-' },
  { subject: 'Physics', opener: 62, midterm: 65, endterm: 71, final: 'B' },
  { subject: 'Chemistry', opener: 74, midterm: 70, endterm: 76, final: 'B' },
  { subject: 'Biology', opener: 69, midterm: 73, endterm: 68, final: 'C+' },
  { subject: 'History', opener: 88, midterm: 85, endterm: 90, final: 'A' },
  { subject: 'Geography', opener: 71, midterm: 75, endterm: 73, final: 'B' },
]

export const termlySummary = {
  term: 'Term 1 2025',
  final_grade: 'B+',
  total_competencies: 32,
  performance: { BE: 5, AE: 12, ME: 10, EE: 5 },
  teacher_comment: 'John is a diligent student who participates actively in class. He should work on his mathematics problem-solving skills.',
}

export const feeInvoices = [
  {
    invoice_no: 'INV-2025-001',
    term: 'Term 1 2025',
    due_date: '2025-02-15',
    total_amount: 45000,
    amount_paid: 30000,
    balance: 15000,
    status: 'Partially Paid',
  },
  {
    invoice_no: 'INV-2024-003',
    term: 'Term 3 2024',
    due_date: '2024-09-10',
    total_amount: 42000,
    amount_paid: 42000,
    balance: 0,
    status: 'Paid',
  },
  {
    invoice_no: 'INV-2024-002',
    term: 'Term 2 2024',
    due_date: '2024-05-15',
    total_amount: 42000,
    amount_paid: 42000,
    balance: 0,
    status: 'Paid',
  },
]

export const feeTransactions = [
  {
    transaction_no: 'TXN12345',
    date: '2025-02-10',
    amount: 15000,
    payment_mode: 'MPESA',
    reference: 'MPESA123',
    status: 'Verified',
  },
  {
    transaction_no: 'TXN12344',
    date: '2025-01-20',
    amount: 15000,
    payment_mode: 'Bank',
    reference: 'TRF9876',
    status: 'Verified',
  },
]

export const timetable = [
  {
    day: 'Monday',
    periods: [
      { period: 1, subject: 'Mathematics', teacher: 'Mr. Odhiambo', room: '201', time: '08:00-08:40' },
      { period: 2, subject: 'English', teacher: 'Ms. Atieno', room: '202', time: '08:40-09:20' },
      { period: 3, subject: 'Physics', teacher: 'Dr. Kiprop', room: 'Lab1', time: '09:20-10:00' },
      { period: 4, subject: 'Break', teacher: '', room: '', time: '10:00-10:30' },
      { period: 5, subject: 'Chemistry', teacher: 'Mr. Mutua', room: 'Lab2', time: '10:30-11:10' },
      { period: 6, subject: 'History', teacher: 'Mrs. Wanjiku', room: '203', time: '11:10-11:50' },
      { period: 7, subject: 'Geography', teacher: 'Mr. Kipchoge', room: '204', time: '11:50-12:30' },
      { period: 8, subject: 'Lunch', teacher: '', room: '', time: '12:30-13:30' },
      { period: 9, subject: 'Kiswahili', teacher: 'Ms. Achieng', room: '205', time: '13:30-14:10' },
      { period: 10, subject: 'Biology', teacher: 'Mr. Omondi', room: 'Lab3', time: '14:10-14:50' },
    ],
  },
  // Add similar for Tuesday–Friday (simplified for brevity)
]

export const libraryBooks = [
  {
    accession_number: 'LIB001',
    title: 'Secondary Mathematics Form 3',
    authors: 'J. Kamau, P. Mwangi',
    publisher: 'KLB',
    available_copies: 5,
    status: 'Available',
  },
  {
    accession_number: 'LIB045',
    title: 'The River Between',
    authors: 'Ngugi wa Thiong\'o',
    publisher: 'Heinemann',
    available_copies: 2,
    status: 'Available',
  },
  {
    accession_number: 'LIB102',
    title: 'Physics Principles with Applications',
    authors: 'Douglas C. Giancoli',
    publisher: 'Pearson',
    available_copies: 0,
    status: 'Issued',
  },
  {
    accession_number: 'LIB078',
    title: 'A Comprehensive English Grammar',
    authors: 'C.E. Eckersley',
    publisher: 'Longman',
    available_copies: 3,
    status: 'Available',
  },
]

export const borrowedBooks = [
  {
    book: 'Physics Principles with Applications',
    borrowed_date: '2025-02-20',
    due_date: '2025-03-06',
    status: 'Overdue',
  },
  {
    book: 'The Pearl',
    borrowed_date: '2025-03-01',
    due_date: '2025-03-15',
    status: 'Borrowed',
  },
]