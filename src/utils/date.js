function calculateSol(earthDate, landingDate = "2012-08-06") {
    const SOL_LENGTH_IN_DAYS = 1.027491252;
    const earthDateObj = new Date(earthDate);
    const landingDateObj = new Date(landingDate);
    const differenceInDays = (earthDateObj - landingDateObj) / (1000 * 60 * 60 * 24) + 1;
    return Math.floor(differenceInDays / SOL_LENGTH_IN_DAYS);
}

// Write function to accept date in yyyy-mm-dd format and return one day prior in same format
function getPreviousDate(date) {
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() - 1);
    const previousDate = dateObj.toISOString().split('T')[0];
    return previousDate
}

export { calculateSol, getPreviousDate };