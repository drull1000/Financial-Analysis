export function compoundInterest(
  principal,
  interestRate,
  periods,
  interestFrequency,
  periodType
) {
  const rate = interestRate / 100;
  let amount = principal;
  let n = 1;

  if (interestFrequency === "monthly") {
    n = 12;
  }
  if (periodType === "meses") {
    periods /= 12;
  }
  let rateAndPeriods = 1;
  for (let i = 1; i <= n * periods; i++) {
    rateAndPeriods *= 1 + rate / n;
  }
  amount *= rateAndPeriods;

  return amount.toFixed(2);
}

export function annuityPayment(
  principal,
  interestRate,
  periods,
  interestFrequency,
  periodType
) {
  // what does this even mean?
  let annuityPayment = 0;
  let interestFrequencyFactor = interestFrequency === "monthly" ? 12 : 1;
  let periodsInMonths = periodType === "months" ? periods : periods * 12;
  let term = Math.pow(
    1 + interestRate / (interestFrequencyFactor * 100),
    periodsInMonths
  );

  for (let i = 1; i <= periodsInMonths; i++) {
    annuityPayment +=
      principal *
      (interestRate / (interestFrequencyFactor * 100)) *
      Math.pow(term, -i);
  }

  annuityPayment /= 1 - 1 / term;
  return annuityPayment.toFixed(2);
}

export function amortizationSchedule(principal, interestRate, numYears) {
  const schedule = [];
  const monthlyInterestRate = interestRate / 12 / 100;
  const numPayments = numYears * 12;
  const monthlyPayment =
    principal *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -numPayments)));

  let remainingBalance = principal;
  let principalPayment = 0;
  let interestPaid = 0;

  for (let period = 1; period <= numPayments; period++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPaymentForRemainingBalance =
      monthlyPayment - interestPayment;

    principalPayment += principalPaymentForRemainingBalance;
    interestPaid += interestPayment;
    remainingBalance -= principalPaymentForRemainingBalance;

    console.log(monthlyInterestRate * remainingBalance);
    schedule.push({
      period: period,
      remainingBalance: parseFloat(remainingBalance.toFixed(2)),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      principalPayment: parseFloat(principalPayment.toFixed(2)),
    });
  }

  return schedule;
}
export const compoundInterestExplaination = `Os juros compostos são um método de cálculo de juros em que os ganhos gerados a cada período são reinvestidos, aumentando o valor principal para os períodos subsequentes. Diferentemente dos juros simples, onde os ganhos são calculados apenas com base no valor principal inicial, os juros compostos levam em consideração tanto o valor principal quanto os juros acumulados anteriormente.

A fórmula geral para o cálculo de juros compostos é:

A = P(1 + r/n)^(nt)

Onde:

    A é o montante total acumulado após o tempo t;
    P é o principal (ou valor inicial) investido;
    r é a taxa de juros anual expressa como decimal (por exemplo, 0,05 para 5%);
    n é o número de vezes que os juros são compostos por ano;
    t é o tempo em anos.

Essa fórmula considera a capitalização dos juros n vezes por ano. Se os juros forem compostos anualmente, n será igual a 1. Se forem compostos semestralmente, n será igual a 2. Se forem compostos trimestralmente, n será igual a 4, e assim por diante.

Para entender melhor, vamos a um exemplo:

Suponha que você investiu R$ 5.000,00 em uma conta de investimento que oferece uma taxa de juros anual de 6%, com capitalização mensal, durante 3 anos.

Usando a fórmula dos juros compostos, temos:

A = 5000(1 + 0,06/12)^(12*3)
A = 5000(1 + 0,005)^(36)
A = 5000(1,005)^(36)
A ≈ 5904,81

Portanto, após 3 anos, o montante total acumulado será de aproximadamente R$ 5.904,81.

Essa fórmula demonstra como os juros compostos podem aumentar significativamente o valor total ao longo do tempo, uma vez que os ganhos são reinvestidos e também geram seus próprios ganhos.`

export const annuityExplaination = `O pagamento de anuidade é um tipo de transação financeira em que um valor fixo é pago regularmente, geralmente uma vez por ano, em troca de benefícios ou serviços específicos. É comumente usado em diferentes contextos, como em associações, seguros, planos de saúde, cartões de crédito e empréstimos.

Quando se trata de empréstimos ou financiamentos, a anuidade refere-se a pagamentos regulares feitos pelo mutuário para liquidar uma dívida ao longo de um período de tempo específico. Esses pagamentos geralmente são compostos por uma parte do capital (valor principal) e uma parte dos juros. O valor da anuidade é calculado usando fórmulas específicas, como a fórmula da anuidade constante.

A fórmula da anuidade constante é:

PMT = (PV * r) / (1 - (1 + r)^(-n))

Onde:
- PMT é o valor da anuidade (pagamento periódico);
- PV é o valor presente ou principal da dívida;
- r é a taxa de juros periódica;
- n é o número de períodos de pagamento.

Essa fórmula permite calcular o valor da anuidade constante necessária para pagar um empréstimo em um determinado número de períodos, considerando uma taxa de juros fixa.

Por exemplo, suponha que você pegue um empréstimo de R$ 50.000,00 a uma taxa de juros anual de 8% para ser pago em 5 anos (60 meses). Usando a fórmula da anuidade constante, temos:

PMT = (50000 * 0,08) / (1 - (1 + 0,08)^(-60))
PMT ≈ 1.038,79

Portanto, você precisaria fazer pagamentos mensais de aproximadamente R$ 1.038,79 para liquidar o empréstimo em 5 anos.

É importante notar que existem diferentes variações e métodos de cálculo de anuidades, como anuidades antecipadas (quando o pagamento é feito no início do período) e anuidades postecipadas (quando o pagamento é feito no final do período). Além disso, a fórmula apresentada é apenas uma das maneiras de calcular uma anuidade constante e pode variar dependendo do contexto específico e das regras aplicáveis.`

export const amortizationScheduleExplaination = `Uma tabela de amortização é uma ferramenta utilizada para acompanhar o pagamento de um empréstimo ao longo do tempo, fornecendo informações detalhadas sobre cada pagamento periódico. Ela mostra a evolução do saldo devedor, o valor dos juros pagos e a quantia amortizada em cada período.

A tabela de amortização é calculada com base nas informações do empréstimo, incluindo o valor do empréstimo, a taxa de juros, o prazo de pagamento e o método de amortização utilizado. O método mais comum é o sistema de amortização constante (SAC), mas existem outros, como o sistema Price.

Vamos considerar o exemplo de um empréstimo de R$ 10.000, com uma taxa de juros anual de 10% e um prazo de pagamento de 5 anos (60 meses) utilizando o método SAC. Para calcular a tabela de amortização, precisamos seguir os seguintes passos:

    Calcular a amortização mensal: A amortização é a parte do pagamento que reduz o saldo devedor. No caso do SAC, a amortização é constante em cada período. Nesse exemplo, o valor do empréstimo é dividido pelo número de meses, ou seja, R$ 10.000 / 60 = R$ 166,67.

    Calcular os juros mensais: Os juros são calculados com base no saldo devedor remanescente em cada período. No primeiro mês, o saldo devedor é igual ao valor do empréstimo, então os juros seriam 10% de R$ 10.000, o que resulta em R$ 1.000.

    Calcular o pagamento mensal: O pagamento mensal é a soma da amortização e dos juros. No primeiro mês, seria R$ 166,67 (amortização) + R$ 1.000 (juros) = R$ 1.166,67.

    Calcular o novo saldo devedor: O saldo devedor remanescente é reduzido pela amortização a cada período. No primeiro mês, o saldo devedor seria R$ 10.000 - R$ 166,67 = R$ 9.833,33.

Esses cálculos são repetidos para cada período até o final do prazo de pagamento. Cada mês, a amortização continua constante, mas os juros são recalculados com base no saldo devedor remanescente.

Uma vez que todos esses cálculos são realizados para cada período, os valores são organizados em uma tabela. A tabela de amortização mostra o número do período, o pagamento mensal, a parte do pagamento correspondente aos juros, a parte do pagamento correspondente à amortização e o saldo devedor remanescente.

Essa é uma visão geral de como funciona uma tabela de amortização e como ela é calculada. A tabela permite que o mutuário visualize o progresso do pagamento do empréstimo, acompanhe a redução do saldo devedor e entenda a composição dos pagamentos mensais entre juros e amortização."
`;
