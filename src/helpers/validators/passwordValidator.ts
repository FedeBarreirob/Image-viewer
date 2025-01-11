export const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^123[a-z]+$/;
    return passwordRegex.test(password);
};
