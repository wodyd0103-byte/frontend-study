import { useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  return <h2>{id}번 사용자 상세</h2>;
}

export default UserDetail;
