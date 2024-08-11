export const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}