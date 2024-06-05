import { useState, Children, cloneElement } from 'react';

interface RadioGroupProps extends React.PropsWithChildren {
  defaultSelected?: number;
}

export const RadioGroup = ({ children }: RadioGroupProps) => {
  const [selectedRadio, setSelectedRadio] = useState<number[]>([]);

  const getRadio = () => {
    const mappedRadio = Children.map(children, (radioButton, idx) => {
      if (!radioButton) return;

      const { onClick } = (
        radioButton as React.ReactElement<React.ComponentProps<'input'>>
      ).props;

      const newProps = {
        onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          handleChange(idx);
          if (onClick) onClick(e);
        },
        checked: selectedRadio.includes(idx),
      };

      return cloneElement(
        radioButton as React.ReactElement<
          HTMLInputElement,
          string | React.JSXElementConstructor<'input'>
        >,
        newProps
      );
    });

    return mappedRadio;
  };

  const handleChange = (idx: number) => {
    if (selectedRadio.includes(idx))
      setSelectedRadio((prev) =>
        prev.filter((selectedIdx) => selectedIdx !== idx)
      );
    else setSelectedRadio([idx]);
  };

  return <div className="flex flex-col gap-4">{getRadio()}</div>;
};

export default RadioGroup;
