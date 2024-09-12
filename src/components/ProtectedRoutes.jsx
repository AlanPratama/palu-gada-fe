import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, condition, target }) {
  return condition ? children : <Navigate to={target} replace />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
  condition: PropTypes.any.isRequired,
  target: PropTypes.string.isRequired,
};

export default ProtectedRoute;
