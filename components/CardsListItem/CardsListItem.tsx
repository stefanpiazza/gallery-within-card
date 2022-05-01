type CardsListItemProps = {
  children: React.ReactNode;
};

export const CardsListItem: React.FC<CardsListItemProps> = ({ children }) => {
  return <li className="cards__list-item">{children}</li>;
};
