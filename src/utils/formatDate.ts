const formatDate = (date: string): string => {

    const dateFromated = new Date(date);

    const day = dateFromated.getDate() > 9 ?
        dateFromated.getDate() : `0${dateFromated.getDate()}`;

    const month = dateFromated.getMonth() + 1 > 9 ?
        dateFromated.getMonth() + 1 : `0${dateFromated.getMonth() + 1}`;
        
    const year = dateFromated.getFullYear();

    return `${day}/${month}/${year}`
};

export default formatDate