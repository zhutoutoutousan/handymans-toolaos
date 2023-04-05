// Input the EPOC timestamp, calculate the time elapsed until now, if it's under 24 hours, return number of hours, if it's under 30 days, return days, same for month, year
const calculateEPOC = (epoc) => {
    const now = new Date();
    const nowEpoc = now.getTime();
    const diff = nowEpoc - epoc;
    const diffDays = diff / (1000 * 3600 * 24);
    const diffHours = diff / (1000 * 3600);
    const diffMonths = diff / (1000 * 3600 * 24 * 30);
    const diffYears = diff / (1000 * 3600 * 24 * 30 * 12);
    if (diffDays < 1) {
        return Math.floor(diffHours);
    } else if (diffDays < 30) {
        return Math.floor(diffDays);
    } else if (diffMonths < 12) {
        return Math.floor(diffMonths);
    } else {
        return Math.floor(diffYears);
      }
}

// Input the EPOC timestamp, format it with this example: "July 07, 2022 at 06:00AM"
const formatEPOC = (epoc) => {
    let date = new Date(epoc);
    let month = date.toLocaleString('en-us', { month: 'long' });
    let day = date.getDate();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    let minuteString = minute < 10 ? '0' + minute : minute;
    return `${month} ${day}, ${year} at ${hour}:${minuteString}${ampm}`;
}

module.exports = {
    calculateEPOC,
    formatEPOC
}