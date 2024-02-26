type ListaCadastrosProps = {
  children: React.ReactNode;
};

const ListaCadastros = ({ children }: ListaCadastrosProps) => {
  return (
    <section className="sm:pt-5 pt-5 w-full  ">
      <ul className="w-full flex flex-col gap-3 overflow-y-auto">{children}</ul>
    </section>
  );
};

export default ListaCadastros;
