const getDayRange = timestamp => {
    const startDate = new Date(timestamp);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(timestamp);
    endDate.setHours(24, 0, 0, 0);
    return [startDate.getTime(), endDate.getTime()];
};

const getWeekRange = timestamp => {
    const startDate = new Date(timestamp);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() == 0 ? -6:1));
    const endDate = new Date(startDate.getTime());
    endDate.setDate(endDate.getDate() + 7);
    return [startDate.getTime(), endDate.getTime()];
};

const getMonthRange = timestamp => {
    const startDate = new Date(timestamp);
    startDate.setHours(0, 0, 0, 0);
    startDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), 1);
    const endDate = new Date(startDate.getTime());
    endDate.setFullYear(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    return [startDate.getTime(), endDate.getTime()];
};

export {
    getDayRange,
    getWeekRange,
    getMonthRange,
}