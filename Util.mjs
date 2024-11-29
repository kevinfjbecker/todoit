export const getDateString = (d) =>
    d.getFullYear() +
    ('' + (d.getMonth()+1)).padStart(2,'0') +
    d.getDate()