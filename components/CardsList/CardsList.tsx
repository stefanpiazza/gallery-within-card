type CardsListProps = {
  children: React.ReactNode;
};

export const CardsList: React.FC<CardsListProps> = ({ children }) => {
  return <ul className="cards__list">{children}</ul>;
};
