import { motion } from "framer-motion";

//para retirar as estilizações padrões como cores e largura/altura, sempre use "!important" do css para ficar em cima da padrão.
//Oque é "!important" do CSS? 'é uma feature que diz que o style que usa ela tem uma nivel de importância maior na hora da render.
//bgTrack === fundo do toogle
// bgThumb === cor da bolinha que ativa e desativa
//"!" no código é uma classe do taillwindcss que abrevia o nome de "!important" e também o usa por baixo dos panos.

interface ToggleProps {
  boleano: boolean;
  setBoleano: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  bgTrack?: string;
  bgTrackActive?: string;
  bgThumb?: string;
  ariaLabel?: string;
}

export function Toggle({ boleano, setBoleano, name, bgTrack, bgTrackActive, bgThumb, ariaLabel }: ToggleProps) {
  function isChecked({ checked }: { checked: boolean }) {
    return checked ? bgTrackActive || "bg-blue-400" : bgTrack || "bg-blue-100";
  }
  return (
    <label className="cursor-pointer">
      <input type="checkbox" checked={boleano} className="sr-only" name={name} aria-label={ariaLabel} onChange={setBoleano} />
      <motion.div
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={` ${isChecked({ checked: boleano })} flex h-7 w-12.5 items-center rounded-full shadow-md shadow-blue-50`}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          initial={{ x: 0, scale: 0.8 }}
          animate={boleano ? { x: 23, scale: 1 } : { x: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 100 }}
          className={`${bgThumb} h-6.5 w-6.5 rounded-full bg-white`}
        ></motion.div>
      </motion.div>
    </label>
  );
}
