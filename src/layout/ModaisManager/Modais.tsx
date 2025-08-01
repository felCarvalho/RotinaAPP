import { CreateRotina } from "../../modais/AddRotina/AddRotina";
import { CreateCategoria } from "../../modais/CategoriaPersonalizada/CategoriaPersonalizada";
import { Renomear } from "../../modais/Renomear/Renomear";
import { DetalhesRotina } from "../../modais/Detalhes/DetalhesRotina/DetalhesRotina";
import { NavMobile } from "../../modais/NavMobile/NavMobile";

export function Modais() {
  return (
    <>
      <CreateRotina />
      <CreateCategoria />
      <Renomear />
      <DetalhesRotina />
      <NavMobile />
    </>
  );
}
