interface CardProps {
  name: string;
  price: number;
  spicy: boolean;
}
function MenuCard({ name, price, spicy }: CardProps) {
  const hot = spicy ? "🌶️매움" : "순함";
  return (
    <div className="card">
      <h2>{name}</h2> <p>{price}원</p>
      <p className="level">매움단계 {hot}</p>
    </div>
  );
}

export default MenuCard;
