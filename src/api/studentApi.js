import {
  studentInfo,
  attendanceSummary,
  attendanceRecords,
  gradeSummary,
  termlySummary,
  feeInvoices,
  feeTransactions,
  timetable,
  libraryBooks,
  borrowedBooks,
} from '../data/mockData'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchStudentInfo = async () => {
  await delay(300)
  return studentInfo
}

export const fetchAttendanceSummary = async () => {
  await delay(300)
  return attendanceSummary
}

export const fetchAttendanceRecords = async () => {
  await delay(300)
  return attendanceRecords
}

export const fetchGradeSummary = async () => {
  await delay(300)
  return gradeSummary
}

export const fetchTermlySummary = async () => {
  await delay(300)
  return termlySummary
}

export const fetchFeeInvoices = async () => {
  await delay(300)
  return feeInvoices
}

export const fetchFeeTransactions = async () => {
  await delay(300)
  return feeTransactions
}

export const fetchTimetable = async () => {
  await delay(300)
  return timetable
}

export const fetchLibraryBooks = async () => {
  await delay(300)
  return libraryBooks
}

export const fetchBorrowedBooks = async () => {
  await delay(300)
  return borrowedBooks
}