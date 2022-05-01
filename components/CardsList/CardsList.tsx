type CardsListProps = {
  children: React.ReactNode;
};

export const CardsList: React.FC<CardsListProps> = ({ children }) => {
  return <ul className="card__list">{children}</ul>;
};
