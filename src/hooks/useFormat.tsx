export const useFormat = (value: string, type: string) => {
    if (type === "title") {
        return value[0].toUpperCase() + value.slice(1).replace("-", " ");
    } else if (type === "slugLine") {
        return value;
    } else {
        return value;
    }
};
