import { Dispatch, SetStateAction } from "react";

interface TextInputInterface {
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
  value: string;
}
export type TextInputType = TextInputInterface;
