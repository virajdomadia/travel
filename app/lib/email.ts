
export async function sendBookingConfirmationEmail(email: string, bookingDetails: any) {
    // In a real app, use nodemailer here.
    // For this demo, we'll simulate an email send and log it.

    console.log(`
    ----------------------------------------------------
    [MOCK EMAIL SERVICE] Sending Email to: ${email}
    Subject: Booking Confirmation - ${bookingDetails.tourName}
    ----------------------------------------------------
    Dear ${bookingDetails.fullName},

    Thank you for booking with 7Fold Wonders!
    
    Your trip to ${bookingDetails.tourName} is confirmed.
    
    Details:
    - Date: ${new Date(bookingDetails.date).toLocaleDateString()}
    - Travelers: ${bookingDetails.travelers}
    - Total Amount: ₹${bookingDetails.totalAmount?.toLocaleString()}
    - Status: ${bookingDetails.status}
    
    You can view your itinerary on our website at /bookings.

    Safe Travels,
    The 7Fold Team
    ----------------------------------------------------
    `);

    return true;
}
