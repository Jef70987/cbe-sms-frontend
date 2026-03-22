/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, User, DollarSign, CreditCard, Printer, Loader2,
  X, ChevronRight, Receipt, BookOpen, AlertCircle, Check,
  FileText, Calculator, RefreshCw, Filter, Clock, LogOut,
  Users, AlertTriangle, Info, ChevronDown, ChevronUp
} from 'lucide-react';
import { useAuth } from '../Authentication/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-gradient-to-r from-emerald-500 to-green-500',
    error: 'bg-gradient-to-r from-rose-500 to-pink-500',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500'
  };

  const icon = {
    success: <Check className="text-white" size={18} />,
    error: <AlertCircle className="text-white" size={18} />,
    info: <Info className="text-white" size={18} />,
    warning: <AlertTriangle className="text-white" size={18} />
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`${bgColor[type]} text-white rounded-lg shadow-xl p-4 min-w-[320px] max-w-md`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">{icon[type]}</div>
            <div>
              <p className="font-semibold capitalize">{type}</p>
              <p className="text-sm text-white/90 mt-1">{message}</p>
            </div>
          </div>
          <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }} className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Session Expired Modal
const SessionExpiredModal = ({ isOpen, onLogout }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Session Expired</h3>
          </div>
          <p className="text-gray-600 mb-6">Your session has expired. Please login again to continue.</p>
          <div className="flex justify-end">
            <button onClick={onLogout} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-yellow-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={onConfirm} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Student Selection Modal
const StudentSelectionModal = ({ isOpen, onClose, students, onSelect, loading }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Select Student</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>
          ) : (
            <div className="space-y-2">
              {students.map(student => (
                <div
                  key={student.id}
                  onClick={() => onSelect(student)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{student.first_name} {student.last_name}</p>
                      <p className="text-sm text-gray-500">Admission: {student.admission_no}</p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                </div>
              ))}
              {students.length === 0 && (
                <div className="text-center py-8 text-gray-500">No students found in this class</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Receipt Modal
const ReceiptModal = ({ isOpen, onClose, transaction, student, formatCurrency, currentClass, invoices }) => {
  if (!isOpen || !transaction || !student) return null;
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;
  const term = 'Term 1';
  const formattedTerm = term;
  
  const amountPaid = transaction.amount_kes || 0;
  const receiptNo = transaction.transaction_no;
  const payMethod = transaction.payment_mode || 'CASH';
  const payRef = transaction.payment_reference || 'N/A';
  const previousBalance = transaction.previous_balance || 0;
  const newBalance = previousBalance - amountPaid;
  const balanceDescription = previousBalance < 0 ? 'Credit Balance' : 'Outstanding Balance';
  const newBalanceDescription = newBalance < 0 ? 'Credit Balance' : 'Outstanding Balance';
  
  const printReceipt = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Receipt - ${student.admission_no}</title>
        <meta charset="UTF-8">
        <style>
          @media print {
            @page { margin: 0; size: auto; }
            body { margin: 0; padding: 10px; }
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Arial', sans-serif; font-size: 12px; line-height: 1.4; color: #000; padding: 10px; max-width: 800px; margin: 0 auto; }
          .receipt { border: 2px solid #1e40af; padding: 15px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 15px; border-bottom: 2px solid #1e40af; padding-bottom: 10px; }
          .logo-container { display: flex; justify-content: center; align-items: center; margin-bottom: 10px; height: 70px; }
          .school-logo { max-height: 60px; max-width: 200px; object-fit: contain; }
          .school-name { font-size: 22px; font-weight: bold; color: #1e40af; margin-bottom: 5px; }
          .motto { font-size: 14px; color: #666; font-style: italic; margin-bottom: 10px; }
          .receipt-title { font-size: 18px; font-weight: bold; margin: 10px 0; }
          .receipt-no { font-size: 14px; font-weight: bold; margin-bottom: 5px; }
          .academic-year { font-size: 14px; font-weight: bold; margin: 5px 0; }
          .section { margin: 10px 0; }
          .section-title { font-weight: bold; font-size: 14px; color: #1e40af; margin-bottom: 5px; padding-bottom: 3px; border-bottom: 1px solid #ccc; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0; }
          .info-label { font-weight: bold; color: #555; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          th { background-color: #f3f4f6; font-weight: bold; }
          .total-row { font-weight: bold; background-color: #f0f9ff; }
          .balance-row { font-weight: bold; }
          .amount { text-align: right; }
          .negative { color: #059669; }
          .positive { color: #dc2626; }
          .signature-section { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; display: flex; justify-content: space-between; }
          .signature-box { text-align: center; width: 45%; }
          .signature-line { border-top: 1px solid #000; margin: 40px 0 5px 0; width: 100%; }
          .signature-label { font-weight: bold; margin-top: 5px; }
          .footer { text-align: center; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc; font-size: 11px; color: #666; }
          .calculation-note { font-size: 10px; color: #666; margin-top: 5px; font-style: italic; }
          @media print { .receipt { border: none; } .school-logo { max-height: 50px !important; } }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="logo-container">
              <img src="/logo.jpeg" alt="Jawabu School Logo" class="school-logo" onerror="this.style.display='none'" />
            </div>
            <div class="school-name">JAWABU SCHOOL</div>
            <div class="motto">Striving for Excellence</div>
            <div class="receipt-title">OFFICIAL FEE PAYMENT RECEIPT</div>
            <div class="receipt-no">Receipt No: ${receiptNo}</div>
            <div class="academic-year">Academic Year: ${academicYear} | Term: ${formattedTerm}</div>
            <div>Date: ${currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | Time: ${currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Student Information</div>
            <div class="info-grid">
              <div class="info-row"><span class="info-label">Student Name:</span> <span>${student.first_name} ${student.last_name}</span></div>
              <div class="info-row"><span class="info-label">Admission No:</span> <span>${student.admission_no}</span></div>
              <div class="info-row"><span class="info-label">Class:</span> <span>${currentClass || student.class_name}</span></div>
              <div class="info-row"><span class="info-label">Term:</span> <span>${formattedTerm}</span></div>
            </div>
          </div>
          
          ${invoices && invoices.length > 0 ? `
          <div class="section">
            <div class="section-title">Invoice Details</div>
            <table>
              <thead>
                <tr><th>Invoice No</th><th>Date</th><th>Due Date</th><th class="amount">Total Amount</th><th class="amount">Paid</th><th class="amount">Balance</th><th>Status</th> </thead>
              <tbody>
                ${invoices.map(invoice => {
                  const balanceAmount = parseFloat(invoice.balance_amount || 0);
                  return `
                  <tr>
                    <td>${invoice.invoice_no || 'N/A'}</td>
                    <td>${invoice.invoice_date ? new Date(invoice.invoice_date).toLocaleDateString() : 'N/A'}</td>
                    <td>${invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'}</td>
                    <td class="amount">KSh ${parseFloat(invoice.total_amount || 0).toLocaleString('en-KE', {minimumFractionDigits: 2})}</td>
                    <td class="amount">KSh ${parseFloat(invoice.amount_paid || 0).toLocaleString('en-KE', {minimumFractionDigits: 2})}</td>
                    <td class="amount ${balanceAmount < 0 ? 'negative' : balanceAmount > 0 ? 'positive' : ''}">${balanceAmount < 0 ? '-' : ''}KSh ${Math.abs(balanceAmount).toLocaleString('en-KE', {minimumFractionDigits: 2})}</td>
                    <td>${invoice.payment_status || invoice.status || 'PENDING'}</td>
                   </tr>
                  `;
                }).join('')}
              </tbody>
             </table>
          </div>
          ` : ''}
          
          <div class="section">
            <div class="section-title">Payment Details</div>
            <table>
              <thead>
                <tr><th>Description</th><th>Payment Method</th><th>Reference</th><th class="amount">Amount (KSh)</th></tr>
              </thead>
              <tbody>
                <tr><td>School Fee Payment</td><td>${payMethod}</td><td>${payRef}</td><td class="amount">${amountPaid.toLocaleString('en-KE', {minimumFractionDigits: 2})}</td></tr>
                <tr class="total-row"><td colspan="3"><strong>TOTAL AMOUNT PAID</strong></td><td class="amount"><strong>${amountPaid.toLocaleString('en-KE', {minimumFractionDigits: 2})}</strong></td></tr>
              </tbody>
            </table>
          </div>
          
          <div class="section">
            <div class="section-title">Balance Calculation</div>
            <table>
              <tbody>
                <tr><td><strong>Previous ${balanceDescription}:</strong></td><td class="amount ${previousBalance < 0 ? 'negative' : previousBalance > 0 ? 'positive' : ''}">${previousBalance < 0 ? '-' : ''}KSh ${Math.abs(previousBalance).toLocaleString('en-KE', {minimumFractionDigits: 2})}</td></tr>
                <tr><td><strong>Amount Paid:</strong></td><td class="amount positive">KSh ${amountPaid.toLocaleString('en-KE', {minimumFractionDigits: 2})}</td></tr>
                <tr class="balance-row"><td><strong>NEW ${newBalanceDescription}:</strong></td><td class="amount ${newBalance < 0 ? 'negative' : newBalance > 0 ? 'positive' : ''}"><strong>${newBalance < 0 ? '-' : ''}KSh ${Math.abs(newBalance).toLocaleString('en-KE', {minimumFractionDigits: 2})}</strong></td></tr>
              </tbody>
            </table>
            ${newBalance < 0 ? `<div class="calculation-note" style="color: #059669;">Note: Credit balance of ${formatCurrency(Math.abs(newBalance))} will be carried forward</div>` : ''}
          </div>
          
          <div class="signature-section">
            <div class="signature-box"><div class="signature-line"></div><div class="signature-label">Bursar Signature</div></div>
            <div class="signature-box"><div class="signature-line"></div><div class="signature-label">Student/Parent Signature</div></div>
          </div>
          
          <div class="footer">
            <div>*** This is an official computer-generated receipt ***</div>
            <div>Thank you for your payment. Please keep this receipt for your records.</div>
            <div>© ${new Date().getFullYear()} Jawabu School - Striving for Excellence</div>
          </div>
        </div>
        <script>window.onload = function() { setTimeout(function() { window.print(); }, 500); };</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Payment Receipt</h3>
          <div className="flex gap-2">
            <button onClick={printReceipt} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Printer size={16} /> Print
            </button>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700">JAWABU SCHOOL</h2>
            <p className="text-gray-600 italic">Striving for Excellence</p>
            <div className="border-t border-gray-300 my-3"></div>
            <p className="text-lg font-bold text-gray-800">OFFICIAL FEE PAYMENT RECEIPT</p>
            <p className="text-sm text-gray-600 mt-1">Receipt No: <span className="font-mono font-bold">{receiptNo}</span></p>
            <p className="text-sm text-gray-500">Date: {new Date().toLocaleString()}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div><span className="text-gray-600">Student Name:</span> <span className="font-semibold">{student.first_name} {student.last_name}</span></div>
            <div><span className="text-gray-600">Admission No:</span> <span className="font-semibold">{student.admission_no}</span></div>
            <div><span className="text-gray-600">Class:</span> <span className="font-semibold">{currentClass || student.class_name}</span></div>
            <div><span className="text-gray-600">Payment Method:</span> <span className="font-semibold">{payMethod}</span></div>
            {payRef !== 'N/A' && <div className="col-span-2"><span className="text-gray-600">Reference:</span> <span className="font-semibold">{payRef}</span></div>}
          </div>
          
          {invoices && invoices.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Invoice Details</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Invoice No</th>
                      <th className="border p-2 text-left">Date</th>
                      <th className="border p-2 text-left">Due Date</th>
                      <th className="border p-2 text-right">Total</th>
                      <th className="border p-2 text-right">Paid</th>
                      <th className="border p-2 text-right">Balance</th>
                      <th className="border p-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv, idx) => (
                      <tr key={idx}>
                        <td className="border p-2 font-mono text-xs">{inv.invoice_no}</td>
                        <td className="border p-2">{new Date(inv.invoice_date).toLocaleDateString()}</td>
                        <td className="border p-2">{new Date(inv.due_date).toLocaleDateString()}</td>
                        <td className="border p-2 text-right">{formatCurrency(inv.total_amount)}</td>
                        <td className="border p-2 text-right text-green-600">{formatCurrency(inv.amount_paid)}</td>
                        <td className={`border p-2 text-right font-bold ${parseFloat(inv.balance_amount) < 0 ? 'text-green-600' : parseFloat(inv.balance_amount) > 0 ? 'text-red-600' : ''}`}>{formatCurrency(inv.balance_amount)}</td>
                        <td className="border p-2"><span className={`px-2 py-1 text-xs rounded-full ${inv.payment_status === 'PAID' ? 'bg-green-100 text-green-800' : inv.payment_status === 'PARTIAL' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{inv.payment_status || inv.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Payment Details</h4>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100"><th className="border p-2 text-left">Description</th><th className="border p-2 text-left">Payment Method</th><th className="border p-2 text-left">Reference</th><th className="border p-2 text-right">Amount (KES)</th></tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">School Fee Payment - {formattedTerm} {academicYear}</td><td className="border p-2">{payMethod}</td><td className="border p-2">{payRef}</td><td className="border p-2 text-right font-bold">{formatCurrency(amountPaid)}</td></tr>
                <tr className="bg-gray-50 font-bold"><td colSpan="3" className="border p-2">TOTAL PAID</td><td className="border p-2 text-right text-green-700">{formatCurrency(amountPaid)}</td></tr>
              </tbody>
            </table>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Balance Calculation</h4>
            <table className="w-full border-collapse">
              <tbody>
                <tr><td className="border p-2"><strong>Previous {balanceDescription}:</strong></td><td className={`border p-2 text-right font-bold ${previousBalance < 0 ? 'text-green-600' : previousBalance > 0 ? 'text-red-600' : ''}`}>{formatCurrency(previousBalance)}</td></tr>
                <tr><td className="border p-2"><strong>Amount Paid:</strong></td><td className="border p-2 text-right font-bold text-blue-600">- {formatCurrency(amountPaid)}</td></tr>
                <tr className="bg-gray-50"><td className="border p-2"><strong>NEW {newBalanceDescription}:</strong></td><td className={`border p-2 text-right font-bold text-lg ${newBalance < 0 ? 'text-green-600' : newBalance > 0 ? 'text-red-600' : ''}`}>{formatCurrency(newBalance)}</td></tr>
              </tbody>
            </table>
            {newBalance < 0 && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                Note: Credit balance of {formatCurrency(Math.abs(newBalance))} will be carried forward to next term.
              </div>
            )}
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-6 pt-4 border-t border-gray-200">
            <p>Thank you for your payment. Keep this receipt for your records.</p>
            <p>© {new Date().getFullYear()} Jawabu School - Striving for Excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main PaymentManagement Component
const PaymentManagement = () => {
  const { user, getAuthHeaders, isAuthenticated, logout } = useAuth();
  
  // State management
  const [searchMode, setSearchMode] = useState('admission');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentBalance, setStudentBalance] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [creditBalance, setCreditBalance] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [paymentReference, setPaymentReference] = useState('');
  const [mobileMoneyNo, setMobileMoneyNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [chequeNo, setChequeNo] = useState('');
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const [isCheckingInvoice, setIsCheckingInvoice] = useState(false);
  const [currentClass, setCurrentClass] = useState('');

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  };

  const handleApiError = (error) => {
    if (error?.status === 401 || error?.message?.includes('Unauthorized')) {
      setShowSessionExpired(true);
    }
  };

  const handleLogout = () => {
    setShowSessionExpired(false);
    logout();
    window.location.href = '/logout';
  };

  // Fetch classes
  const fetchClasses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/classes/`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) setClasses(data.data || []);
    } catch (error) {
      showToast('Failed to load classes', 'error');
    }
  };

  // Fetch recent transactions
  const fetchRecentTransactions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bursar/transactions/recent/?limit=5`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) setRecentTransactions(data.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchClasses();
      fetchRecentTransactions();
    }
  }, [isAuthenticated]);

  // Search students by admission number
  const searchByAdmission = async () => {
    if (!searchQuery.trim()) {
      showToast('Please enter admission number', 'warning');
      return;
    }
    
    const admissionRegex = /^[A-Za-z0-9-]+$/;
    if (!admissionRegex.test(searchQuery.trim())) {
      showToast('Invalid admission number format', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bursar/students/search/?admission_no=${searchQuery.trim()}`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        const student = data.data[0];
        setSelectedStudent(student);
        setCurrentClass(student.class_name || '');
        await checkStudentInvoice(student.id);
        setStudents([]);
        setSearchQuery('');
      } else {
        showToast('Student not found', 'error');
      }
    } catch (error) {
      showToast('Failed to search student', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Search students by name
  const searchByName = async () => {
    if (!searchQuery.trim()) {
      showToast('Please enter student name', 'warning');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bursar/students/search/?name=${encodeURIComponent(searchQuery.trim())}`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        setStudents(data.data || []);
        if (data.data.length === 0) showToast('No students found', 'info');
        else if (data.data.length === 1) {
          setSelectedStudent(data.data[0]);
          setCurrentClass(data.data[0].class_name || '');
          await checkStudentInvoice(data.data[0].id);
          setStudents([]);
          setSearchQuery('');
        }
      }
    } catch (error) {
      showToast('Failed to search students', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Get students by class
  const getStudentsByClass = async () => {
    if (!selectedClass) {
      showToast('Please select a class', 'warning');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bursar/students/by-class/?class_id=${selectedClass}`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        setStudentList(data.data || []);
        if (data.data.length === 0) showToast('No students in this class', 'info');
        else setShowStudentModal(true);
      }
    } catch (error) {
      showToast('Failed to fetch students', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Check if student has invoice for current term
  const checkStudentInvoice = async (studentId) => {
    setIsCheckingInvoice(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bursar/students/${studentId}/invoice-status/`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        if (data.data.has_invoice) {
          await fetchStudentBalance(studentId);
        } else {
          showToast('Generating invoice for current term...', 'info');
          await generateInvoice(studentId);
        }
      }
    } catch (error) {
      showToast('Failed to check invoice status', 'error');
    } finally {
      setIsCheckingInvoice(false);
    }
  };

  // Generate invoice for student
  const generateInvoice = async (studentId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bursar/students/${studentId}/generate-invoice/`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        showToast('Invoice generated successfully', 'success');
        await fetchStudentBalance(studentId);
      } else {
        showToast(data.error || 'Failed to generate invoice', 'error');
      }
    } catch (error) {
      showToast('Failed to generate invoice', 'error');
    }
  };

  // Fetch student balance
  const fetchStudentBalance = async (studentId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bursar/students/${studentId}/balance/`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        setStudentBalance(data.data.current_balance);
        setCreditBalance(data.data.credit_balance);
        setInvoices(data.data.invoices || []);
      }
    } catch (error) {
      showToast('Failed to load student balance', 'error');
    }
  };

  // Process payment
  const processPayment = async () => {
    if (!selectedStudent) {
      showToast('Please select a student first', 'error');
      return;
    }
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount < 5) {
      showToast('Minimum payment amount is KSh 5.00', 'warning');
      return;
    }
    
    if (paymentMethod === 'MPESA' && !mobileMoneyNo) {
      showToast('Please enter M-PESA number', 'warning');
      return;
    }
    if (paymentMethod === 'Bank Transfer' && !bankName) {
      showToast('Please enter bank name', 'warning');
      return;
    }
    if (paymentMethod === 'Cheque' && !chequeNo) {
      showToast('Please enter cheque number', 'warning');
      return;
    }
    
    setShowConfirmation(true);
  };
  
  const confirmPayment = async () => {
    setLoading(true);
    try {
      const transactionData = {
        student_id: selectedStudent.id,
        amount_kes: parseFloat(paymentAmount),
        payment_mode: paymentMethod,
        payment_reference: paymentReference || `PAY-${Date.now()}`,
        bank_name: bankName,
        cheque_no: chequeNo,
        mobile_money_no: mobileMoneyNo,
        status: 'COMPLETED',
        payment_date: new Date().toISOString()
      };
      
      const res = await fetch(`${API_BASE_URL}/api/bursar/transactions/create/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(transactionData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setCurrentTransaction(data.data.transaction);
        setShowConfirmation(false);
        setShowReceipt(true);
        showToast('Payment processed successfully!', 'success');
        await fetchRecentTransactions();
      } else {
        showToast(data.error || 'Failed to process payment', 'error');
      }
    } catch (error) {
      showToast('Failed to process payment', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Reset form after receipt is closed
  const handleReceiptClose = () => {
    setShowReceipt(false);
    setCurrentTransaction(null);
    resetForm();
  };

  // Reset form after payment
  const resetForm = () => {
    setSelectedStudent(null);
    setStudentBalance(null);
    setCreditBalance(0);
    setInvoices([]);
    setPaymentAmount('');
    setPaymentReference('');
    setMobileMoneyNo('');
    setBankName('');
    setChequeNo('');
    setSearchQuery('');
    setSelectedClass('');
    setStudents([]);
    setStudentList([]);
    setCurrentClass('');
  };

  const formatCurrency = (amount) => {
    const num = Number(amount);
    if (isNaN(num)) return 'KSh 0.00';
    return `KSh ${num.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getCurrentBalance = () => {
    if (studentBalance !== null) return studentBalance;
    return 0;
  };

  const getNewBalance = () => {
    const current = getCurrentBalance();
    const payment = parseFloat(paymentAmount) || 0;
    return current - payment;
  };

  const getExcessPayment = () => {
    const current = getCurrentBalance();
    const payment = parseFloat(paymentAmount) || 0;
    if (current > 0 && payment > current) return payment - current;
    return 0;
  };

  const handleSearch = () => {
    if (searchMode === 'admission') searchByAdmission();
    else if (searchMode === 'name') searchByName();
    else if (searchMode === 'class') getStudentsByClass();
  };

  const handleSelectStudent = async (student) => {
    setSelectedStudent(student);
    setCurrentClass(student.class_name || '');
    setShowStudentModal(false);
    await checkStudentInvoice(student.id);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center"><AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" /><h2 className="text-2xl font-bold">Authentication Required</h2><p className="text-gray-600 mt-2">Please login to access fee payment</p><a href="/login" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg">Go to Login</a></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } .animate-slideIn { animation: slideIn 0.3s ease-out; }`}</style>
      
      <SessionExpiredModal isOpen={showSessionExpired} onLogout={handleLogout} />
      {toasts.map(t => <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(prev => prev.filter(t2 => t2.id !== t.id))} />)}
      
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Fee Payment Management</h1>
          <p className="text-gray-600 mt-1">Process student fee payments and generate receipts</p>
          {user && <p className="text-xs text-gray-400 mt-1">{user.first_name} {user.last_name} • {user.role}</p>}
        </div>
        
        {/* Search Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Find Student</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['admission', 'name', 'class'].map(mode => (
              <button key={mode} onClick={() => { setSearchMode(mode); setSearchQuery(''); setSelectedClass(''); setStudents([]); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${searchMode === mode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {mode === 'admission' ? 'Admission Number' : mode === 'name' ? 'Student Name' : 'Class'}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(searchMode === 'admission' || searchMode === 'name') && (
              <div className="md:col-span-2">
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder={searchMode === 'admission' ? 'Enter admission number' : 'Enter student name'} />
              </div>
            )}
            {searchMode === 'class' && (
              <div className="md:col-span-2">
                <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Class</option>
                  {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.class_name} ({cls.class_code})</option>)}
                </select>
              </div>
            )}
            <div>
              <button onClick={handleSearch} disabled={loading || isCheckingInvoice} className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {(loading || isCheckingInvoice) && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? 'Searching...' : isCheckingInvoice ? 'Checking Invoice...' : 'Search'}
              </button>
            </div>
          </div>
          
          {/* Search Results for Name Search */}
          {students.length > 0 && searchMode === 'name' && (
            <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b"><span className="font-medium">Select Student ({students.length})</span></div>
              <div className="max-h-60 overflow-y-auto">
                {students.map(s => (
                  <div key={s.id} onClick={() => { setSelectedStudent(s); setCurrentClass(s.class_name || ''); checkStudentInvoice(s.id); setStudents([]); setSearchQuery(''); }} className="px-4 py-3 border-b hover:bg-blue-50 cursor-pointer flex justify-between items-center">
                    <div><div className="font-medium">{s.first_name} {s.last_name}</div><div className="text-sm text-gray-500">{s.admission_no}</div></div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Selected Student Info & Payment Form */}
        {selectedStudent && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><User className="h-6 w-6 text-blue-600" /></div>
                <div><h3 className="text-xl font-bold">{selectedStudent.first_name} {selectedStudent.last_name}</h3><p className="text-gray-500">{selectedStudent.admission_no}</p></div>
              </div>
              <button onClick={resetForm} className="text-sm text-red-600 hover:text-red-800">Change Student</button>
            </div>
            
            {/* Balance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div><p className="text-sm text-gray-500">Current Balance</p><p className={`text-2xl font-bold ${getCurrentBalance() < 0 ? 'text-green-600' : getCurrentBalance() > 0 ? 'text-red-600' : 'text-gray-600'}`}>{formatCurrency(getCurrentBalance())}</p></div>
              <div><p className="text-sm text-gray-500">Credit Balance</p><p className="text-2xl font-bold text-green-600">{formatCurrency(creditBalance)}</p></div>
              <div><p className="text-sm text-gray-500">Status</p><span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCurrentBalance() < 0 ? 'bg-green-100 text-green-800' : getCurrentBalance() > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{getCurrentBalance() < 0 ? 'CREDIT' : getCurrentBalance() > 0 ? 'OUTSTANDING' : 'PAID'}</span></div>
            </div>
            
            {/* Payment Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div><label className="block text-sm font-medium mb-1">Amount (KES) *</label><input type="number" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} min="5" step="0.01" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="Minimum 5.00" /></div>
                <div><label className="block text-sm font-medium mb-1">Payment Method *</label><select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"><option value="CASH">Cash</option><option value="MPESA">M-PESA</option><option value="BANK_TRANSFER">Bank Transfer</option><option value="CHEQUE">Cheque</option></select></div>
                {paymentMethod === 'MPESA' && <div><label className="block text-sm font-medium mb-1">M-PESA Number *</label><input type="text" value={mobileMoneyNo} onChange={e => setMobileMoneyNo(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="07XX XXX XXX" /></div>}
                {paymentMethod === 'BANK_TRANSFER' && <div><label className="block text-sm font-medium mb-1">Bank Name *</label><input type="text" value={bankName} onChange={e => setBankName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="Bank name" /></div>}
                {paymentMethod === 'CHEQUE' && <div><label className="block text-sm font-medium mb-1">Cheque Number *</label><input type="text" value={chequeNo} onChange={e => setChequeNo(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="Cheque number" /></div>}
                <div><label className="block text-sm font-medium mb-1">Reference (Optional)</label><input type="text" value={paymentReference} onChange={e => setPaymentReference(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="Payment reference" /></div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Current Balance:</span><span className={`font-bold ${getCurrentBalance() < 0 ? 'text-green-600' : getCurrentBalance() > 0 ? 'text-red-600' : ''}`}>{formatCurrency(getCurrentBalance())}</span></div>
                  <div className="flex justify-between"><span>Payment Amount:</span><span className="font-bold text-blue-600">{formatCurrency(paymentAmount)}</span></div>
                  {getExcessPayment() > 0 && <div className="flex justify-between text-yellow-600"><span>Excess (Credit):</span><span>+{formatCurrency(getExcessPayment())}</span></div>}
                  <div className="border-t pt-2 mt-2 flex justify-between"><span className="font-bold">New Balance:</span><span className={`font-bold text-lg ${getNewBalance() < 0 ? 'text-green-600' : getNewBalance() > 0 ? 'text-red-600' : ''}`}>{formatCurrency(getNewBalance())}</span></div>
                </div>
                <button onClick={processPayment} disabled={!paymentAmount || parseFloat(paymentAmount) < 5} className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold flex items-center justify-center gap-2"><Calculator size={18} /> Process Payment</button>
                {getExcessPayment() > 0 && <p className="text-xs text-yellow-600 text-center mt-2">Excess payment will be recorded as student credit</p>}
              </div>
            </div>
            
            {/* Invoices Section */}
            {invoices.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h4 className="font-semibold mb-3">Active Invoices</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-2 text-left">Invoice No</th>
                        <th className="px-3 py-2 text-left">Date</th>
                        <th className="px-3 py-2 text-left">Due Date</th>
                        <th className="px-3 py-2 text-right">Total</th>
                        <th className="px-3 py-2 text-right">Paid</th>
                        <th className="px-3 py-2 text-right">Balance</th>
                        <th className="px-3 py-2 text-left">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y">
                      {invoices.map((inv, idx) => (
                        <tr key={idx}>
                          <td className="px-3 py-2 font-mono text-xs">{inv.invoice_no} </td>
                          <td className="px-3 py-2">{new Date(inv.invoice_date).toLocaleDateString()} </td>
                          <td className="px-3 py-2">{new Date(inv.due_date).toLocaleDateString()} </td>
                          <td className="px-3 py-2 text-right">{formatCurrency(inv.total_amount)} </td>
                          <td className="px-3 py-2 text-right text-green-600">{formatCurrency(inv.amount_paid)} </td>
                          <td className={`px-3 py-2 text-right font-bold ${
                            parseFloat(inv.balance_amount) < 0 ? 'text-green-600' :
                            parseFloat(inv.balance_amount) > 0 ? 'text-red-600' : ''
                          }`}>{formatCurrency(inv.balance_amount)} </td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              inv.payment_status === 'PAID' ? 'bg-green-100 text-green-800' :
                              inv.payment_status === 'PARTIAL' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>{inv.payment_status || inv.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <button onClick={fetchRecentTransactions} className="text-sm text-blue-600 hover:text-blue-800">
              <RefreshCw size={14} className="inline mr-1" /> Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Receipt No</th>
                  <th className="px-4 py-2 text-left">Student</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-left">Method</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentTransactions.map(t => (
                  <tr key={t.id}>
                    <td className="px-4 py-2 font-mono text-xs">{t.transaction_no} </td>
                    <td className="px-4 py-2">
                      <div className="font-medium">{t.first_name} {t.last_name}</div>
                      <div className="text-xs text-gray-500">{t.admission_no}</div>
                    </td>
                    <td className="px-4 py-2 text-right font-bold text-green-600">{formatCurrency(t.amount_kes)} </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        t.payment_mode === 'MPESA' ? 'bg-green-100 text-green-800' :
                        t.payment_mode === 'CASH' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>{t.payment_mode}</span>
                    </td>
                    <td className="px-4 py-2">{new Date(t.payment_date).toLocaleDateString()} </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">COMPLETED</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <StudentSelectionModal isOpen={showStudentModal} onClose={() => setShowStudentModal(false)} students={studentList} onSelect={handleSelectStudent} loading={loading} />
      <ConfirmationModal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} onConfirm={confirmPayment} title="Confirm Payment" message={`Confirm payment of ${formatCurrency(paymentAmount)} for ${selectedStudent?.first_name} ${selectedStudent?.last_name}?`} loading={loading} />
      <ReceiptModal 
        isOpen={showReceipt} 
        onClose={handleReceiptClose} 
        transaction={currentTransaction} 
        student={selectedStudent} 
        formatCurrency={formatCurrency}
        currentClass={currentClass}
        invoices={invoices}
      />
    </div>
  );
};

export default PaymentManagement;