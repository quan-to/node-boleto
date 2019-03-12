const express = require('express');

const app = express();

const { Boleto } = require('../index');

const boleto = new Boleto({
  agencia: '2938',
  banco: 'itau',
  carteira: '109',
  cedente: 'CONTAQUANTO PAGAMENTOS LTDA',
  cedente_cnpj: '26714996000190',
  codigo_cedente: '412034',
  data_emissao: '2018-12-11T00:00:00.000Z',
  data_vencimento: '2018-10-22T00:00:00.000Z',
  instrucoes: 'Teste 2  Teste 2',
  local_de_pagamento: 'PAGÁVEL EM QUALQUER BANCO.',
  nosso_numero: 24,
  numero_documento: '435',
  pagador: 'Teste UHHEUEHEUHEBRBR',
  valor: '100',
});

// console.log(boleto);

console.log(boleto.linha_digitavel);
console.log('34191.09008 00002.472934 84120.340009 7 76850000000100');

//
// // console.log(boleto['linha_digitavel']);
//
// app.use(express.static(`${__dirname}/../`));
//
// app.get('/', (req, res) => {
//   boleto.renderHTML(html => res.send(html));
// });
//
// app.listen(3003);
