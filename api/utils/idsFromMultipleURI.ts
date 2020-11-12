// ids are the second last element if you split the URI by '/'
export default function idsFromMultipleURI(uris: string[]) {
  return uris.map((uri) => parseInt(uri.split("/").slice(-2, -1)[0]));
}
