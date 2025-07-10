const getProfilePic = (name: string) => {
    if (!name || name.length === 0) return 'g'; // fallback

    // Sum ASCII values of all characters in the name
    const total = name
        .toLowerCase()
        .split('')
        .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

    const index = total % 7; // Assume 7 profile images: a.png to g.png
    const res = String.fromCharCode(97 + index); // 'a' = 97

    return res;
};

export default getProfilePic;