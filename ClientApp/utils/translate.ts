export const hasHtml = (value: string): boolean => {
    const pattern = /(&[^\s]*;|<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>)/;
    return !value ? false : value.search(pattern) >= 0;
};

export const getActiveLanguage = (languages: { id: number, name: string, code: string }[], languageCode: string): { id: number, name: string, code: string } => {
    const active: { id: number, name: string, code: string } = languages.filter(x => x.code === languageCode)[0];
    return active;
}