interface RadioGroupInterface {
  children?: JSX.Element[];
  onToggle?: (value: string) => void;
}
export type RadioGroupProps = RadioGroupInterface;
