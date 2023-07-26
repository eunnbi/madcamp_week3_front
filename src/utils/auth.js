export const getLoggedInUser = () => {
    const value = localStorage.getItem("USER");
    if (value === null) return null;
    else return JSON.parse(value);
}