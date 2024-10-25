export default (items) =>
  JSON.parse(JSON.stringify(items).replace(/"_id"/g, '"id"'));
