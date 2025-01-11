export const isValidUsername = (username: string): boolean => {
    const usernameRegex = /^[a-z]+$/;
    return usernameRegex.test(username);
};