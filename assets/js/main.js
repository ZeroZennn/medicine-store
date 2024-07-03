async function fetchDB(table) {
  const response = await fetch(`data/${table}.json`);
  return response.json();
}