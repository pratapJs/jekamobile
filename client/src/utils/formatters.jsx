export const formatOpeningHours = (hours) => {
    if (!hours) return 'Loading...';
    if (typeof hours === 'string') return hours; // Legacy support
    if (!Array.isArray(hours)) return 'Contact for hours';

    // Group days with same hours
    const groups = [];
    let currentGroup = null;

    hours.forEach((day, index) => {
        if (!currentGroup) {
            currentGroup = { ...day, days: [day.day.substring(0, 3)] };
        } else {
            const isSame = day.isOpen === currentGroup.isOpen &&
                day.start === currentGroup.start &&
                day.end === currentGroup.end;

            if (isSame) {
                currentGroup.days.push(day.day.substring(0, 3));
            } else {
                groups.push(currentGroup);
                currentGroup = { ...day, days: [day.day.substring(0, 3)] };
            }
        }
    });
    if (currentGroup) groups.push(currentGroup);

    return groups.map((g, i) => {
        const dayStr = g.days.length > 2
            ? `${g.days[0]} - ${g.days[g.days.length - 1]}`
            : g.days.join(', ');

        return (
            <div key={i} className="flex justify-between min-w-[180px] gap-4">
                <span className="font-medium">{dayStr}:</span>
                <span className="text-right">
                    {g.isOpen ? `${formatTime(g.start)} - ${formatTime(g.end)}` : 'Closed'}
                </span>
            </div>
        );
    });
};

// Helper to convert 24h to 12h AM/PM
const formatTime = (time) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
};
