export const storeLang = (code: string) => {
    localStorage.setItem('lang', JSON.stringify(code));
} 