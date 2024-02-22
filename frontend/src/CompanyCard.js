import React from 'react';
import { Link } from 'react-router-dom';

function CompanyCard({ company }) {
  return (
    <Link to={`/companies/${company.handle}`} className="card">
      <div className="card-body">
        <h5 className="card-title">{company.name}</h5>
        <p className="card-text">{company.description}</p>
      </div>
    </Link>
  );
}

export default CompanyCard;
