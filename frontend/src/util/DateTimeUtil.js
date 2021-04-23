const getDayRange = date => {
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    return [startDate, endDate];
};

const getWeekRange = date => {
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 - date.getDay());
    return [startDate, endDate];
};

const getMonthRange = date => {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [startDate, endDate];
};

export {
    getDayRange,
    getWeekRange,
    getMonthRange,
}