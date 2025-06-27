// Policies.jsx
import React from "react";
import { FaUndoAlt, FaExchangeAlt, FaTruck, FaHeadset } from "react-icons/fa";
import "../App.css";

const policies = [
  {
    id: 1,
    icon: <FaUndoAlt />,
    title: "7 Days Return",
    description: "Return within 7 days for a full refund.",
  },
  {
    id: 2,
    icon: <FaExchangeAlt />,
    title: "Exchange Policy",
    description: "Exchange within 7 days with receipt.",
  },
  {
    id: 3,
    icon: <FaTruck />,
    title: "Free Shipping",
    description: "Free shipping on orders over $50.",
  },
  {
    id: 4,
    icon: <FaHeadset />,
    title: "24/7 Support",
    description: "Round-the-clock customer support.",
  },
];

const Policies = () => {
  return (
    <section className="policies-section">
      <div className="policies-row">
        {policies.map((policy) => (
          <div key={policy.id} className="policy-item">
            <div className="policy-icon">{policy.icon}</div>
            <div className="policy-text">
              <h4>{policy.title}</h4>
              <p>{policy.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Policies;
