const photoFormatsDetect = (data, priority = '') => {
    if (data?.formats && priority !== '') {
        if (data?.formats[priority]) {
            return data?.formats[priority]
        } else {
            return data
        }
    } else {
        return data
    }
}

export { photoFormatsDetect }