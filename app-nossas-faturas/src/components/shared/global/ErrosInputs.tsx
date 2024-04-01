import { AlertDescription } from "../../ui/alert";

type ErrosInputsProps = {
  title: string;
  className?: string;
};

const ErrosInputs = ({ title, className }: ErrosInputsProps) => {
  return (
    <section className={`${className} flex  border border-red-300 rounded-lg`}>
      <AlertDescription className="text-sm pl-1 text-red-400 ">
        {title}
      </AlertDescription>
    </section>
  );
};

export default ErrosInputs;
