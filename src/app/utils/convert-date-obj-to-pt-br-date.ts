export const convertDateObjToPtBrDate = (date: Date): string => {
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // já que estamos passando para string e também para o formato pt-BR, o mês estará indexado, somando com "1" o valor do mês ficara correto quando convertido.
  const year = padZero(date.getFullYear());

  return day + "/" + month + "/" + year;
}

const padZero = (value: number): string => { // método que será responsável por adicionar o "0" em unidades. Por exemplo: "1" ou "9" passa a ser "01" ou "09".
  const currentValue: string = '0' + value;

  return value < 10 ? currentValue : value.toString();
}
