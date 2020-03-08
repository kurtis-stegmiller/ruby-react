import React, { Fragment, useEffect} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubscriptions } from "../actions/dashboard";

const Subscriptions = ({history, getSubscriptions, subscriptions, keyword}) => {

  useEffect(() => {
    getSubscriptions()
  }, [])

  return (
    <Fragment>
      <div className="modalTable_header">
        Select one of the following subscriptions to reserve 123.ch/{keyword === undefined ? "" : keyword.keyword}
      </div>
      <div className="SubItems">
        {subscriptions.map(elem => {
          return (
            <div className="SubItem" key={elem.id}>
              <div className="SubItem_header">{elem.name}</div>
              <div className="SubItem_content">
                <div className="SubItem_title">{elem.amount}{elem.currency}</div>
                {elem.per_month && <div className="SubItem_description">{elem.per_month} {elem.currency} / mo</div>}
                {elem.discount && <div className="SubItem_save">Save Over {elem.discount}</div>}
                <button onClick={() => {window.location.href = elem.payment_url}} className="btn default grey">Order Now</button>
              </div>
            </div>
          )
        })}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    subscriptions: state.dashboard.subscriptions
  }
};

const mapDispatchToProps = {
  getSubscriptions
}

Subscriptions.propTypes = {
  getSubscriptions: PropTypes.func,
  subscriptions: PropTypes.array,
  keyword: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
