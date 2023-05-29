interface Date {
    date: any;
}

export const formatDate = ({ date }: Date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString('default', { month: 'long' });
    const day = newDate.toLocaleString('default', { day: 'numeric' });
    const year = newDate.toLocaleString('default', { year: 'numeric' });

    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
};
