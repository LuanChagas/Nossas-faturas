type LabelProps = {
  title: string;
  htmlFor?: string;
  className?: string;
};

const Label = ({ title, htmlFor, className }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`md:text-xl text-gray-900 ${className}`}
    >
      {title}
    </label>
  );
};

export default Label;
