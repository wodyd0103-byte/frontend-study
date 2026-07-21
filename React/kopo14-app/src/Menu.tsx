import Card from "./MenuCard"; // ✅ MenuCard가 아니라 Card
import "./Card.css";

function MenuCard() {
  return (
    <div className="card-list">
      <Card name="김치찌개" price={6000} spicy={true} />
      <Card name="미역국" price={10000} spicy={false} />
      <Card name="육계장" price={12000} spicy={true} />
    </div>
  );
}
export default MenuCard;
