// import React from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// const Alert = ({ alerts }) => {
//   //making sure that there are errors when printing alerts
//   return alerts !== null && alerts.length > 0
//     ? alerts.map((alert) => (
//         <div key={alert.id} className={`alert alert-${alert.alertType}`}>
//           {alert.message}
//         </div>
//       ))
//     : null;
// };
// Alert.propTypes = {
//   alerts: PropTypes.array.isRequired,
// };
// const mapStateToProps = (state) => ({
//   alerts: state.alert,
// });
// export default connect(mapStateToProps)(Alert);

import React from "react";
import { useSelector } from "react-redux";
const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  //making sure that there are errors when printing alerts
  return (
    alerts !== null &&
    alerts.length > 0 && (
      <section className="container">
        {alerts.map((alert) => (
          <div key={alert.id} className={` alert alert-${alert.alertType}`}>
            {alert.message}
          </div>
        ))}
      </section>
    )
  );
};
export default Alert;
