// ids are the second last element if you split the URI by '/'
export default function idFromURIArray(uris) {
  return uris.map((uri) => uri.split("/").slice(-2, -1)[0]);
}
