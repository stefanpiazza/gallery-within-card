import type { NextPage } from "next";
import { Card } from "../components/Card";
import { CardsList } from "../components/CardsList";
import { CardsListItem } from "../components/CardsListItem";
import { Listings } from "../types";

const listings: Listings = require("../listings.json");

const Home: NextPage = () => {
  return (
    <div className="cards">
      <CardsList>
        {listings.map((listing, index) => {
          return (
            <CardsListItem key={`card-list-item-${index}`}>
              <Card listing={listing} />
            </CardsListItem>
          );
        })}
      </CardsList>
    </div>
  );
};

export default Home;
