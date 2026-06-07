// Camada de Interface do Usuário

import { iniciarMenu } from "../services/MenuService";

export async function executarFluxoPrincipal(): Promise<void> {
  await iniciarMenu();
}
