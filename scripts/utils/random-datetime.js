/**
 * Function to get a random datetime in the last week
 * @returns {Date} A random Date object from the last 7 days
 */
function getRandomDateTimeInLastWeek() {
    // Get current time
    const now = new Date();
    
    // Calculate 7 days ago (7 * 24 * 60 * 60 * 1000 milliseconds)
    const oneWeekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    
    // Generate random timestamp between oneWeekAgo and now
    const randomTimestamp = oneWeekAgo.getTime() + Math.random() * (now.getTime() - oneWeekAgo.getTime());
    
    // Create and return new Date object
    return new Date(randomTimestamp);
}

/**
 * Function to get a random datetime in the last week as ISO string
 * @returns {string} ISO string representation of random datetime
 */
function getRandomDateTimeInLastWeekISOString() {
    return getRandomDateTimeInLastWeek().toISOString();
}

/**
 * Function to get a random datetime in the last week formatted as YYYY-MM-DD HH:mm:ss
 * @returns {string} Formatted datetime string
 */
function getRandomDateTimeInLastWeekFormatted() {
    const date = getRandomDateTimeInLastWeek();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example usage
console.log('Random Date Object:', getRandomDateTimeInLastWeek());
console.log('ISO String:', getRandomDateTimeInLastWeekISOString());
console.log('Formatted:', getRandomDateTimeInLastWeekFormatted());

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getRandomDateTimeInLastWeek,
        getRandomDateTimeInLastWeekISOString,
        getRandomDateTimeInLastWeekFormatted
    };
}