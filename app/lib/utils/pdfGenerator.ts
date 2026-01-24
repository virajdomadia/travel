import jsPDF from 'jspdf';

interface Activity {
    time: string;
    description: string;
    icon: string;
    location?: string;
}

interface HotelOption {
    name: string;
    type: string;
    price: string;
    rating: number;
    amenities: string[];
}

interface DayItinerary {
    day: number;
    title: string;
    activities: Activity[];
    meals: string[];
    hotelOptions?: HotelOption[];
    accommodation?: string;
    highlights: string[];
}

export async function generateItineraryPDF(
    tourName: string,
    duration: string,
    price: string,
    itinerary: DayItinerary[]
) {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 0;
    const margin = 20;
    const primaryColor: [number, number, number] = [255, 140, 0]; // Orange
    const accentColor: [number, number, number] = [14, 165, 233]; // Sky blue

    // Helper function to add gradient-like header
    const addGradientHeader = () => {
        // Top gradient bar
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.rect(0, 0, pageWidth, 40, 'F');

        // Accent stripe
        pdf.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
        pdf.rect(0, 35, pageWidth, 5, 'F');
    };

    // Helper function to add new page
    const addNewPage = () => {
        pdf.addPage();
        yPosition = 50;
        addGradientHeader();
    };

    // Helper function to check page break
    const checkPageBreak = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - 30) {
            addNewPage();
            return true;
        }
        return false;
    };

    // Helper function to wrap text
    const addWrappedText = (text: string, x: number, maxWidth: number, fontSize: number = 10, color: [number, number, number] = [0, 0, 0]) => {
        pdf.setFontSize(fontSize);
        pdf.setTextColor(color[0], color[1], color[2]);
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
            checkPageBreak(7);
            pdf.text(line, x, yPosition);
            yPosition += 6;
        });
    };

    // ===== COVER PAGE =====
    addGradientHeader();
    yPosition = 60;

    // Company Logo Text (you can replace with actual image)
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('7 Fold Wonders', pageWidth / 2, 20, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Discover the World, One Wonder at a Time', pageWidth / 2, 28, { align: 'center' });

    // Tour Name
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const tourNameLines = pdf.splitTextToSize(tourName, pageWidth - 40);
    tourNameLines.forEach((line: string) => {
        pdf.text(line, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 12;
    });
    yPosition += 10;

    // Decorative line
    pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.setLineWidth(2);
    pdf.line(pageWidth / 2 - 30, yPosition, pageWidth / 2 + 30, yPosition);
    yPosition += 15;

    // Tour Details Box
    pdf.setFillColor(245, 245, 245);
    pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 40, 3, 3, 'F');

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.text('TOUR DETAILS', pageWidth / 2, yPosition + 10, { align: 'center' });

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    pdf.text(`Duration: ${duration}`, pageWidth / 2, yPosition + 20, { align: 'center' });
    pdf.text(`Starting Price: ${price}`, pageWidth / 2, yPosition + 30, { align: 'center' });
    yPosition += 55;

    // Welcome Message
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(100, 100, 100);
    const welcomeMsg = 'Thank you for choosing 7 Fold Wonders. Below is your detailed day-by-day itinerary designed to make your journey unforgettable.';
    const welcomeLines = pdf.splitTextToSize(welcomeMsg, pageWidth - 60);
    welcomeLines.forEach((line: string) => {
        pdf.text(line, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 6;
    });

    // ===== ITINERARY PAGES =====
    addNewPage();

    itinerary.forEach((day, dayIndex) => {
        checkPageBreak(50);

        // Day Header with gradient effect
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 15, 2, 2, 'F');

        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(255, 255, 255);
        pdf.text(`DAY ${day.day}`, margin + 5, yPosition + 10);

        pdf.setFontSize(14);
        pdf.text(day.title, margin + 35, yPosition + 10);
        yPosition += 22;

        // Activities Section
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.text('📅 ACTIVITIES', margin + 5, yPosition);
        yPosition += 8;

        // Activity timeline
        day.activities.forEach((activity, actIdx) => {
            checkPageBreak(20);

            // Activity time badge
            pdf.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
            pdf.roundedRect(margin + 5, yPosition - 4, 25, 7, 1, 1, 'F');
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(255, 255, 255);
            pdf.text(activity.time, margin + 7, yPosition + 1);

            // Activity icon and description
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(0, 0, 0);
            pdf.text(activity.icon, margin + 33, yPosition + 1);

            const activityText = activity.location
                ? `${activity.description} (📍 ${activity.location})`
                : activity.description;

            const actLines = pdf.splitTextToSize(activityText, pageWidth - margin - 50);
            actLines.forEach((line: string, lineIdx: number) => {
                if (lineIdx > 0) checkPageBreak(6);
                pdf.text(line, margin + 38, yPosition + 1 + (lineIdx * 5));
            });

            yPosition += Math.max(8, actLines.length * 5 + 3);

            // Connector line (except for last activity)
            if (actIdx < day.activities.length - 1) {
                pdf.setDrawColor(200, 200, 200);
                pdf.setLineWidth(0.5);
                pdf.line(margin + 17, yPosition - 3, margin + 17, yPosition + 2);
            }
        });

        yPosition += 5;

        // Meals & Accommodation Section
        checkPageBreak(35);

        // Meals
        pdf.setFillColor(250, 250, 250);
        pdf.roundedRect(margin, yPosition, (pageWidth - 2 * margin - 5) / 2, 25, 2, 2, 'F');

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.text('🍽️ MEALS INCLUDED', margin + 3, yPosition + 7);

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(60, 60, 60);
        pdf.text(day.meals.join(' • '), margin + 3, yPosition + 14);

        // Hotel Options
        const hotelX = margin + (pageWidth - 2 * margin) / 2 + 2.5;
        pdf.roundedRect(hotelX, yPosition, (pageWidth - 2 * margin - 5) / 2, 25, 2, 2, 'F');

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.text('🏨 ACCOMMODATION', hotelX + 3, yPosition + 7);

        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(60, 60, 60);

        if (day.hotelOptions && day.hotelOptions.length > 0) {
            const hotel = day.hotelOptions[0]; // Show first option
            pdf.text(`${hotel.name} (${hotel.type})`, hotelX + 3, yPosition + 13);
            pdf.text(`⭐ ${hotel.rating} | ${hotel.price}`, hotelX + 3, yPosition + 18);
            if (day.hotelOptions.length > 1) {
                pdf.setFont('helvetica', 'italic');
                pdf.setTextColor(100, 100, 100);
                pdf.text(`+${day.hotelOptions.length - 1} more option${day.hotelOptions.length > 2 ? 's' : ''}`, hotelX + 3, yPosition + 22);
            }
        } else if (day.accommodation) {
            const accLines = pdf.splitTextToSize(day.accommodation, (pageWidth - 2 * margin - 5) / 2 - 6);
            accLines.slice(0, 2).forEach((line: string, idx: number) => {
                pdf.text(line, hotelX + 3, yPosition + 13 + (idx * 4));
            });
        }

        yPosition += 32;

        // Highlights
        if (day.highlights && day.highlights.length > 0) {
            checkPageBreak(20);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            pdf.text('✨ HIGHLIGHTS', margin + 5, yPosition);
            yPosition += 7;

            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(60, 60, 60);
            const highlightText = day.highlights.join(' • ');
            const highlightLines = pdf.splitTextToSize(highlightText, pageWidth - 2 * margin - 10);
            highlightLines.forEach((line: string) => {
                checkPageBreak(5);
                pdf.text(line, margin + 5, yPosition);
                yPosition += 5;
            });
            yPosition += 3;
        }

        // Day separator
        if (dayIndex < itinerary.length - 1) {
            checkPageBreak(15);
            pdf.setDrawColor(220, 220, 220);
            pdf.setLineWidth(0.5);
            pdf.line(margin + 10, yPosition, pageWidth - margin - 10, yPosition);
            yPosition += 15;
        }
    });

    // ===== FOOTER ON ALL PAGES =====
    const totalPages = (pdf as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);

        // Footer background
        pdf.setFillColor(50, 50, 50);
        pdf.rect(0, pageHeight - 15, pageWidth, 15, 'F');

        // Footer text
        pdf.setFontSize(8);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('helvetica', 'normal');
        pdf.text('7 Fold Wonders | Discover the World, One Wonder at a Time', margin, pageHeight - 7);

        pdf.text(
            `Page ${i} of ${totalPages}`,
            pageWidth - margin,
            pageHeight - 7,
            { align: 'right' }
        );

        // Contact info on first page
        if (i === 1) {
            pdf.setFontSize(7);
            pdf.text('📧 info@7foldwonders.com | 📞 +91-1800-WONDERS | 🌐 www.7foldwonders.com', pageWidth / 2, pageHeight - 7, { align: 'center' });
        }
    }

    // Download the PDF
    const fileName = `${tourName.replace(/[^a-zA-Z0-9]/g, '_')}_Itinerary_7FoldWonders.pdf`;
    pdf.save(fileName);
}
