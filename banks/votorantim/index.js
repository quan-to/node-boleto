const fs = require('fs');
const formatters = require('../../lib/formatters');
const ediHelper = require('../../lib/edi-helper');
const helper = require('./helper');


const logoB64 = fs.readFileSync(`${__dirname}/logo.jpg`, { encoding: 'base64' });

exports.options = {
  logoURL: `data:image/jpg;base64,${logoB64}`,
  codigo: '655',
};

exports.dvBarra = function (barra) {
  const resto2 = formatters.mod11(barra, 9, 1);
  return (resto2 === 0 || resto2 === 1 || resto2 === 10 || resto2 === 11) ? 1 : 11 - resto2;
};

exports.barcodeData = function (boleto) {
  return boleto.codigo_barra;  // Banco Votorantim envia já a linha digitavel pronta
};

exports.linhaDigitavel = function (barcodeData) {
  const campos = [];
  // 1. Primeiro Grupo - composto pelo código do banco, código da moéda, Valor Fixo "9"
  // e 4 primeiros digitos do PSK (codigo do cliente) e DV (modulo10) deste campo
  let campo = barcodeData.substring(0, 3) + barcodeData.substring(3, 4) + barcodeData.substring(19, 20) + barcodeData.substring(20, 24);
  campo += formatters.mod10(campo);
  campo = `${campo.substring(0, 5)}.${campo.substring(5, campo.length)}`;
  campos.push(campo);

  // 2. Segundo Grupo - composto pelas 3 últimas posiçoes do PSK e 7 primeiros dígitos do Nosso Número
  // e DV (modulo10) deste campo
  campo = barcodeData.substring(24, 34);
  campo += formatters.mod10(campo);
  campo = `${campo.substring(0, 5)}.${campo.substring(5, campo.length)}`;
  campos.push(campo);

  // 3. Terceiro Grupo - Composto por : Restante do Nosso Numero (6 digitos), IOS, Modalidade da Carteira
  // e DV (modulo10) deste campo
  campo = barcodeData.substring(34, 44);
  campo += formatters.mod10(campo);
  campo = `${campo.substring(0, 5)}.${campo.substring(5, campo.length)}`;
  campos.push(campo);

  // 4. Campo - digito verificador do codigo de barras
  campo = barcodeData.substring(4, 5);
  campos.push(campo);

  // 5. Campo composto pelo fator vencimento e valor nominal do documento, sem
  // indicacao de zeros a esquerda e sem edicao (sem ponto e virgula). Quando se
  // tratar de valor zerado, a representacao deve ser 0000000000 (dez zeros).
  campo = barcodeData.substring(5, 9) + barcodeData.substring(9, 19);
  campos.push(campo);
  return campos.join(' ');
};

exports.parseEDIFile = function () {
  throw new Error('Not implemented');
};
