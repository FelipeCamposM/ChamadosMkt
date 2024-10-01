import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface RadioGroupProps {
  options: { value: string; label: string }[];
  field: any; // Aqui você pode tipar melhor de acordo com sua lib de formulários
  label: string;
  text: string;
}

const CustomRadioGroup: React.FC<RadioGroupProps> = ({ options, field, label, text}) => {
  return (
    <FormItem className="space-y-3">
      <div className="flex flex-col gap-4">
        <FormLabel className="text-xl font-semibold">{label}</FormLabel>
        <span>Classifique o nivel de prioridade:</span>
        <span className="text-sm text-gray-500">{text}</span>
      </div>
      <FormControl>
        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center gap-8">
          {options.map((option) => (
            <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel className="font-normal">{option.label}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default CustomRadioGroup;
