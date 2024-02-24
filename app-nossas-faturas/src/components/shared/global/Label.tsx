type LabelProps = {
  title: string;
  htmlFor?: string;
};

const Label = ({ title, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="md:text-xl text-gray-900">
      {title}
    </label>
  );
};

export default Label;
