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
  console.log('inflation', inflation * 100);
  return inflation;
}

console.log(calculateInflation('01/04/2023'));