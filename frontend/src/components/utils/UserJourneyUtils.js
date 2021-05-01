import moment from "moment";
import React from "react";

class UserJourneyUtils {
  isRuPhoneNumber(str) {
    return str.trim().length === 10 && this.isNormalInteger(str);

  }

  isNormalInteger(str) {
    const n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }

  dateFormat(date) {
    return moment(date).format("LLL");
  }

  getUserName(user) {
    const firstName = user.firstName ? `${user.firstName} ` : "";
    const lastName = user.lastName ? user.lastName : "";
    const name = `${firstName}${lastName}`;
    return name ? name : user.email;
  }

  resolvePointLabel(index, point, pointsSize) {
    if (index === 0) {
      return this.dateFormat(point.dispatchDate);
    } else if (index === pointsSize - 1) {
      return this.dateFormat(point.arrivalDate);
    } else {
      return (
        <>
          <p
            style={{
              marginBottom: 0,
              marginTop: "-10px",
            }}
          >
            {this.dateFormat(point.dispatchDate)}
          </p>
          <p>{this.dateFormat(point.arrivalDate)}</p>
        </>
      );
    }
  }
}

export default new UserJourneyUtils();