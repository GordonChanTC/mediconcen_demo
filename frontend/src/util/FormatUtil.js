const dateMonthFormat = date => `${date.getFullYear()}/${date.getMonth() + 1}`;
const dateFormat = timestamp => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
const dateTimeFormat = date => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

const currencyFormat = currency => {
    return `$${currency}`;
}

export {
    dateMonthFormat,
    dateFormat,
    dateTimeFormat,
    currencyFormat
};