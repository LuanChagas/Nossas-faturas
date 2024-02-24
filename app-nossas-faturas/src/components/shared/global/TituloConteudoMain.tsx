type TituloConteudoMainProps = {
  title: string;
};

const TituloConteudoMain = ({ title }: TituloConteudoMainProps) => {
  return (
    <>
      <div>
        <h2 className="text-4xl">{title}</h2>
      </div>
    </>
  );
};

export default TituloConteudoMain;
