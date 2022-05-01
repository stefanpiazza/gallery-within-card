type CardsListItemProps = {
  children: React.ReactNode;
};

export const CardsListItem: React.FC<CardsListItemProps> = ({ children }) => {
  return <li className="card__list-item">{children}</li>;
};
