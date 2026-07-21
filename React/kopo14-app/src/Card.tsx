interface CardProps {
  title: string;
  description: string;
  level: number;
}
function Card({ title, description, level }: CardProps) {
  const stars = "★".repeat(level); // 별 개수 계산
  return (
    <div className="card">
      <h2>{title}</h2> <p>{description}</p>
      <p className="level">난이도 {stars}</p>
    </div>
  );
}

export default Card;