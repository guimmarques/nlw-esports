import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";

interface SelectProps {
  name: string;
  placeholder: string;
  items: {
    id: string;
    name: string;
  }[];
}

export function SelectComp(props: SelectProps) {
  const { placeholder, items, name } = props;
  return (
    <Select.Root name={name}>
      <Select.SelectTrigger className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 justify-between flex items-center">
        <Select.SelectValue placeholder={placeholder} />
        <Select.SelectIcon>
          <CaretDown size={24} className="text-zinc-400" />
        </Select.SelectIcon>
      </Select.SelectTrigger>
      <Select.SelectPortal className="w-[calc(100%-1.25rem)] translate-x-5 translate-y-5">
        <Select.SelectContent className="overflow-hidden bg-zinc-900 rounded">
          <Select.SelectScrollUpButton>
            <CaretUp size={24} />
          </Select.SelectScrollUpButton>
          <Select.SelectViewport>
            {items.map((item) => (
              <Select.SelectItem
                key={item.id}
                value={item.id}
                className="text-white rounded flex items-center px-6 py-2 mx-3 my-2 border-1 border-white self-center relative hover:bg-white hover:text-zinc-900"
              >
                <Select.SelectItemText className="text-white">
                  {item.name}
                </Select.SelectItemText>
                <Select.SelectItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
                  <Check size={16} />
                </Select.SelectItemIndicator>
              </Select.SelectItem>
            ))}
          </Select.SelectViewport>
          <Select.SelectScrollDownButton>
            <CaretDown size={24} />
          </Select.SelectScrollDownButton>
        </Select.SelectContent>
      </Select.SelectPortal>
    </Select.Root>
  );
}
