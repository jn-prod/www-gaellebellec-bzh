export const getAll = (kind: 'post' | 'calendar' | 'results', version: 'en' | 'fr' = 'fr') => {
  let entity;
  const versionSuffix = version === 'fr' ? '' : `_${version}`;
  switch (kind) {
    case 'post':
      entity = `posts${versionSuffix}!2:1000`;
      break;
    case 'calendar':
      entity = `calendarOutput${versionSuffix}!1:1000`;
      break;
    case 'results':
      entity = `resultsOutput${versionSuffix}!1:1000`;
      break;
    default:
      throw new Error('<base.service | getAll> kind param is required');
  }

  // apply locals
  entity.replace('{version}', version === 'en' ? '_en' : '');

  return fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/1kKnjdWTbLGFc-bl7VEYyrrO-xEk6ws5YeU41llRYZw4/values/${entity}?key=AIzaSyD1hD6OXLqkeWVizdMh2PYxF1ZyCa_jPo4`
  )
    .then((res) => res.json())
    .then((res) => res.values)
    .catch((err) => {
      console.error(err);
    });
};
