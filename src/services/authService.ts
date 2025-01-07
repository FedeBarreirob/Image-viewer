export const isValidUsername = (username: string): boolean => {
    const usernameRegex = /^[a-z]+$/;
    return usernameRegex.test(username);
};

export const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^123[a-z]+$/;
    return passwordRegex.test(password);
};
