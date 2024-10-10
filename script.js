// Initialize FullCalendar
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const eventDetails = document.getElementById('eventDetails');
    const eventList = document.getElementById('eventList');
    const closeDetails = document.getElementById('closeDetails');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [],
        dateClick: function(info) {
            // Show detailed events for the selected date
            const selectedDate = info.dateStr;
            eventList.innerHTML = ''; // Clear previous events
            const eventsOnDate = calendar.getEvents().filter(event => event.start.toISOString().split('T')[0] === selectedDate);

            if (eventsOnDate.length) {
                eventsOnDate.forEach(event => {
                    const div = document.createElement('div');
                    div.className = 'event ' + event.extendedProps.priority;
                    div.textContent = `${event.title} at ${event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                    eventList.appendChild(div);
                });
            } else {
                eventList.innerHTML = '<p>No events for this date.</p>';
            }

            eventDetails.style.display = 'block'; // Show details
        }
    });
    calendar.render();

    // Add event listener to the Add Task button
    document.getElementById('addTaskButton').addEventListener('click', function() {
        const taskInput = document.getElementById('taskInput').value;
        const timeInput = document.getElementById('timeInput').value;
        const priority = document.getElementById('prioritySelect').value;
        const emoji = document.getElementById('emojiSelect').value;

        const dateInput = document.getElementById('dateInput').value || calendar.getDate().toISOString().split('T')[0]; // Get current date if none selected

        if (taskInput) {
            // Add task to the calendar
            calendar.addEvent({
                title: `${emoji} ${taskInput}`,
                start: `${dateInput}T${timeInput}`,
                allDay: false,
                extendedProps: { priority: priority }
            });

            // Clear inputs
            document.getElementById('taskInput').value = '';
            document.getElementById('timeInput').value = '';
            document.getElementById('dateInput').value = ''; // Reset date input
        } else {
            alert('Please enter a task!');
        }
    });

    // Close details view
    closeDetails.addEventListener('click', function() {
        eventDetails.style.display = 'none'; // Hide details
    });
});
