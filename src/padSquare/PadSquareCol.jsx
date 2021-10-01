import PadSquare from "./PadSquare.jsx";
import { Col } from "react-bootstrap";
function PadSquareCol(props) {
  return (
    <Col className="d-flex justify-content-center mt-3 mb-3">
      <PadSquare {...props} />
    </Col>
  );
}

export default PadSquareCol;
