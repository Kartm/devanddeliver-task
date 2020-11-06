// ids are the second last element if you split the URI by '/'
module.exports = function idFromURI(uris) {
  return uris.map((uri) => uri.split("/").slice(-2, -1)[0]);
};
