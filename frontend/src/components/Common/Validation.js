const isEmail = email => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
};

const isPhone = phone => {
    const re = /^[569][0-9]{7}$/;
    return re.test(parseInt(phone));
}

export {
    isEmail,
    isPhone
};