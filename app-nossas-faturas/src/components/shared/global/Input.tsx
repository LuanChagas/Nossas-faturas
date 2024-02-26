import { moedaBR, diasMes } from "@/utils/masks/InputsMasks";
import React, { InputHTMLAttributes } from "react";

type TypeMaskInput = "DiaSemana" | "MoedaBR";

const ImaskInput = (
  mask: TypeMaskInput,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const maskHandlers = {
    DiaSemana: diasMes,
    MoedaBR: moedaBR,
  };
  return maskHandlers[mask](e);
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  mask?: TypeMaskInput;
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ mask, className, ...props }: InputProps, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        onChange={(e) => {
          if (mask) ImaskInput(mask, e);
          props.onChange && props.onChange(e);
        }}
        className={`${className} border border-violet-700 rounded-lg  focus:ring-1 focus:ring-violet-700 focus:outline-none p-1 shadow-sm text-gray-900 `}
      />
    );
  }
);

export default Input;
