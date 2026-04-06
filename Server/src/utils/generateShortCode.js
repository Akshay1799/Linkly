
export const generateShortCode = ()=>{
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let charIndex = 0; charIndex < 6; charIndex++) {
        const randomIndex = Math.floor(Math.random()*chars.length())
        code += chars[randomIndex]
    }

    return code;
}