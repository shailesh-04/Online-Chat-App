export function formatChatDate(dateString) {
    const messageDate = new Date(dateString);
    const now = new Date();

    // Reset time to midnight for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const msgDay = new Date(
        messageDate.getFullYear(),
        messageDate.getMonth(),
        messageDate.getDate()
    );

    if (msgDay.getTime() === today.getTime()) {
        return "Today";
    } else if (msgDay.getTime() === yesterday.getTime()) {
        return "Yesterday";
    } else {
        // Format as "DD/MM/YYYY" (you can change format)
        const day = String(messageDate.getDate()).padStart(2, "0");
        const month = String(messageDate.getMonth() + 1).padStart(2, "0");
        const year = messageDate.getFullYear();
        return `${day}/${month}/${year}`;
    }
}

export const formatChatDateTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    // Helper to get 12-hour format with AM/PM
    const formatTime = (d) => {
        let hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const msgDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    if (msgDate.getTime() === today.getTime()) {
        return `Today, ${formatTime(date)}`;
    } else if (msgDate.getTime() === yesterday.getTime()) {
        return `Yesterday, ${formatTime(date)}`;
    } else {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}, ${formatTime(date)}`;
    }
};
