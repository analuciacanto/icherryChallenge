// Função para formatar a data no formato YYYY-MM-DD HH:mm:ss
function formatarData(data) {
  const d = data;
  const pad = n => String(n).padStart(2, '0');

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
         `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
export { formatarData };