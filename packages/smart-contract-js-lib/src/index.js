import main from './invokesmartcontract';

(async function execute() {
  const resultExec = await main();

  console.log(resultExec);
})();