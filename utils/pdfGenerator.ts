
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateItineraryPDF(booking: any) {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(15, 23, 42); // slate-900 like
    doc.rect(0, 0, 220, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('7Fold Wonders', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Booking Confirmation', 105, 25, { align: 'center' });

    // Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`Tour: ${booking.tourName}`, 20, 60);

    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking._id || 'PENDING'}`, 20, 70);
    doc.text(`Date of Trip: ${new Date(booking.date).toDateString()}`, 20, 80);
    doc.text(`Travelers: ${booking.travelers}`, 20, 90);
    doc.text(`Status: ${booking.status?.toUpperCase()}`, 20, 100);

    // Traveler Info
    doc.text('Traveler Details:', 20, 120);
    doc.setFontSize(10);
    doc.text(`Name: ${booking.fullName}`, 25, 128);
    doc.text(`Email: ${booking.email}`, 25, 134);
    doc.text(`Phone: ${booking.phone}`, 25, 140);

    // Cost
    doc.setFontSize(14);
    doc.text(`Total Amount: INR ${booking.totalAmount?.toLocaleString()}`, 20, 160);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for choosing 7Fold Wonders.', 105, 280, { align: 'center' });
    doc.text('For support, contact support@7foldwonders.com', 105, 286, { align: 'center' });

    doc.save(`7fold-itinerary-${booking._id}.pdf`);
}
