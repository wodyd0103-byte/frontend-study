import Card from "./Card";
import "./Card.css";
function CardPractice() {
  return (
    <div className="card-list">
      <Card title="HTML" description="웹의 뼈대" level={1} />
      <Card title="CSS" description="화면 꾸미기" level={2} />
      <Card title="JavaScript" description="동작" level={3} />
    </div>
  );
}
export default CardPractice;
