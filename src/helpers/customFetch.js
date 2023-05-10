export default async function customFetch(URL) {
  const response = await fetch(URL);
  const data = response.json();
  return data;
}
