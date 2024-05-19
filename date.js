// module.exports.getDate = getDate;
// module.exports.getDay = getDay;

// exports.getDate = () => {
//     const today = new Date();
//     const options = {
//         weekday: "long",
//         day: "numeric",
//         month: "long"
//     };

//     return today.toLocaleDateString("en-US", options);
// }

// exports.getDay = () => {
//     const today = new Date();
//     const options = {
//         weekday: "long"
//     };

//     return today.toLocaleDateString("en-US", options);
// }

export const getDate = () => {
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("en-US", options);
}

export const getDay = () => {
    const today = new Date();
    const options = {
        weekday: "long"
    };

    return today.toLocaleDateString("en-US", options);
}