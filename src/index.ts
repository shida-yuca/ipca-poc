import axios from 'axios';
import { BigNumber } from 'bignumber.js';
import { DateTime } from "luxon";

const URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json&dataInicial=[DATA_INICIAL]&dataFinal=[DATA_FINAL]';

type Ipca = {
  data: string;
  valor: string;
}

const fetchBacenData = async (contractDate: DateTime): Promise<Ipca[]> => {
  const endDate = contractDate.minus({ month: 1 }).endOf('month');
  const initialDate = endDate.minus({ months: 11 }).startOf('month');
  const url = URL
    .replace('[DATA_INICIAL]', initialDate.setLocale('pt-BR').toLocaleString())
    .replace('[DATA_FINAL]', endDate.setLocale('pt-BR').toLocaleString());

  console.log('contractDate', contractDate.setLocale('pt-BR').toLocaleString());
  console.log('endDate', endDate.setLocale('pt-BR').toLocaleString());
  console.log('initialDate', initialDate.setLocale('pt-BR').toLocaleString());
  console.log('url', url);

  const result = await axios.get(url);
  return result.data;
}

const calculateInflation = async (contractAniversary: string) => {
  const date = DateTime.fromFormat(contractAniversary, 'dd/MM/yyyy');
  const bacenData = await fetchBacenData(date);
  const inflation = bacenData.reduce((acc: any, curr: any) => {
    return new BigNumber(acc)
      .plus(1)
      .multipliedBy(
        new BigNumber(curr.valor)
          .dividedBy(100)
          .plus(1)
      )
      .minus(1)
      .toNumber();
  }, 0);
  return inflation * 100;
}

const main = async () => {
  const inflationJan22 = await calculateInflation('01/01/2022');
  const inflationFev22 = await calculateInflation('01/02/2022');
  const inflationMar22 = await calculateInflation('01/03/2022');
  const inflationAbr22 = await calculateInflation('01/04/2022');
  const inflationMai22 = await calculateInflation('01/05/2022');
  const inflationJun22 = await calculateInflation('01/06/2022');
  const inflationJul22 = await calculateInflation('01/07/2022');
  const inflationAgo22 = await calculateInflation('01/08/2022');
  const inflationSet22 = await calculateInflation('01/09/2022');
  const inflationOut22 = await calculateInflation('01/10/2022');
  const inflationNov22 = await calculateInflation('01/11/2022');
  const inflationDez22 = await calculateInflation('01/12/2022');
  const inflationJan23 = await calculateInflation('01/01/2023');
  const inflationFev23 = await calculateInflation('01/02/2023');
  const inflationMar23 = await calculateInflation('01/03/2023');
  const inflationAbr23 = await calculateInflation('01/04/2023');

  console.log('Resultado Inflação');
  console.log('Jan/22', inflationJan22);
  console.log('Fev/22', inflationFev22);
  console.log('Mar/22', inflationMar22);
  console.log('Abr/22', inflationAbr22);
  console.log('Mai/22', inflationMai22);
  console.log('Jun/22', inflationJun22);
  console.log('Jul/22', inflationJul22);
  console.log('Ago/22', inflationAgo22);
  console.log('Set/22', inflationSet22);
  console.log('Out/22', inflationOut22);
  console.log('Nov/22', inflationNov22);
  console.log('Dez/22', inflationDez22);
  console.log('Jan/23', inflationJan23);
  console.log('Fev/23', inflationFev23);
  console.log('Mar/23', inflationMar23);
  console.log('Abr/23', inflationAbr23);
}

main();