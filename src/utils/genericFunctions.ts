export const capitalize = (key: string) => {
  const keySplited = key.split(' ');
  const capitalized = keySplited.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalized.join(' ');
};
