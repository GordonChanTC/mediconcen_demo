const dateFormat = date => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

const currencyFormat = currency => {
    return `$${currency}`;
}

export {
    dateFormat,
    currencyFormat
};