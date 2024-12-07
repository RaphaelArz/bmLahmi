document.getElementById('addEventButton').addEventListener('click', function(event) {
    event.preventDefault();
    const eventTitle = 'Bar-Mitsvah Mickael';
    const eventLocation = '14 Rue des Rouges Gorges, Saint-Brice sous-foret';
    const eventDetails = 'Mise des téphilines de Gabriel.';
    const eventStart = '20250323T073000Z';
    const eventEnd = '20250323T103000Z';

    // Détection du système d'exploitation
    const userAgent = window.navigator.userAgent;
    let calendarUrl;

    if (/iPhone|iPad|iPod/i.test(userAgent)) {
        // Lien pour Apple Calendar
        const startDate = '20250323T073000';
        const endDate = '20250323T103000';
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `SUMMARY:${eventTitle}`,
            `DESCRIPTION:${eventDetails}`,
            `LOCATION:${eventLocation}`,
            `DTSTART:${startDate}`,
            `DTEND:${endDate}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\n');

        calendarUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
    } else {
        // Lien pour Google Calendar
        calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventStart}/${eventEnd}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;
    }

    window.open(calendarUrl, '_blank');
});