// var enVersion = window.location.pathname.includes("/en/")

// const apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/1kKnjdWTbLGFc-bl7VEYyrrO-xEk6ws5YeU41llRYZw4/values/"
// const apiKey = "key=AIzaSyD1hD6OXLqkeWVizdMh2PYxF1ZyCa_jPo4";

// var apis = {
//   posts: {
//     fr: apiUrl + "posts!2:1000?" + apiKey,
//     en: apiUrl + "posts_en!2:1000?" + apiKey,
//   },
//   calendar: {
//     fr: apiUrl + "calendarOutput!1:1000?" + apiKey,
//     en: apiUrl + "calendarOutput_en!1:1000?" + apiKey,
//   },
//   results: {
//     fr: apiUrl + "resultsOutput!1:1000?" + apiKey,
//     en: apiUrl + "resultsOutput_en!1:1000?" + apiKey,
//   },
// };

export const getAll = (kind: 'post' | 'calendar' | 'results', version: 'en' | 'fr' = 'fr') => {
    let entity;
    switch (kind) {
        case 'post':
            entity = 'posts{version}!2:1000';
            break
        case 'calendar':
            entity = 'calendarOutput{version}!1:1000';
            break
        case 'results':
            entity = 'resultsOutput{version}!1:1000';
            break
        default:
            throw new Error('<base.service | getAll> kind param is required');
    }

    // apply locals
    entity.replace('{version}', version === 'en' ? '_en' : '');

    return fetch(`https://sheets.googleapis.com/v4/spreadsheets/1kKnjdWTbLGFc-bl7VEYyrrO-xEk6ws5YeU41llRYZw4/values/${entity}?key=AIzaSyD1hD6OXLqkeWVizdMh2PYxF1ZyCa_jPo4`)
        .then(res => res.json())
        .catch(err => {console.error(err)})
}