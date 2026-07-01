exports.handler = async function(event) {
  const token = process.env.AIRTABLE_TOKEN;
  const { table, formula } = event.queryStringParameters;

  let allRecords = [];
  let offset = null;

  do {
    let url = `https://api.airtable.com/v0/appspqjIM0kHmnXQr/${encodeURIComponent(table)}?pageSize=100`;
    if (formula) url += '&filterByFormula=' + encodeURIComponent(formula);
    if (offset) url += '&offset=' + encodeURIComponent(offset);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    
    if (data.records) allRecords = allRecords.concat(data.records);
    offset = data.offset || null;

  } while (offset);

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ records: allRecords })
  };
};
