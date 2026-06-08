// RF13 - Ponto de entrada. Instancia os serviços e inicia o fluxo principal.

import { executarFluxoPrincipal } from "./controller/TerminalController";

async function main(): Promise<void> {
  await executarFluxoPrincipal();
}

main();
