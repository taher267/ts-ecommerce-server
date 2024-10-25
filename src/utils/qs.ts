const generateQueryString = (query: { [key: string]: string | number }) => {
  return Object.keys(query)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
    )
    .join("&");
};
export default generateQueryString;
