exports.handler = async function(event) {
  const token = process.env.AIRTABLE_TOKEN;
  const { table, formula } = event.queryStringParameters;
  
  const url = `https://api.airtable.com/v0/appspqjIM0kHmnXQr/${encodeURIComponent(table)}?pageSize=100${formula ? '&filterByFormula=' + encodeURIComponent(formula) : ''}`;
  
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  const data = await response.json();
  
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data)
  };
};
