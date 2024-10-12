export const convertPtBrDateToObj = (date: string): Date | null => {
  if (!date) {
    return null;
  }

  const [day, month, year] = date.split('/').map(Number);

  if (isValidDate(day, month, year)) {
    return new Date(year, month - 1, day);
  }

  return null;
};

const isValidDate = (day: number, month: number, year: number): boolean => {
  const date = new Date(year, month - 1, day);

  return (
    // a que tudo indica caso seja feita a instancia de um dia ou mês inválido "como dia 31" ou "mês 13", a instância desses valores são ilógicos
    // para entender melhor como seria uma data inválida, altere os valores do dia e mês (dia = 40, mês = 15) dos dados do usuário no user.service.ts.

    // console.log(date.getDate(), day)
    // console.log(date.getMonth(), month)
    // console.log(date.getFullYear(), year)


    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
}
