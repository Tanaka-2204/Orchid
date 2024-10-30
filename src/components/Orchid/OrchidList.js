import React, { useEffect, useState } from "react";
import { useOrchid } from "../hook/useOrchid";
import { Link, useParams } from "react-router-dom";
import OrchidListItem from "./OrchidListItem";

export default function OrchidList() {
  const orchidList = useOrchid();
  const [searchTerm, setSearchTerm] = useState("");
  const { category } = useParams();
  const [filteredOrchids, setFilteredOrchids] = useState(orchidList);

  useEffect(() => {
    setFilteredOrchids(orchidList);
    if (category) {
      const filterByCategory = orchidList.filter(
        (orchid) => orchid.category == category
      );
      setFilteredOrchids(filterByCategory);
    }
    if (searchTerm) {
      const filterByName = orchidList.filter((orchid) =>
        orchid.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrchids(filterByName);
    }
  }, [orchidList, category, searchTerm]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div
            className="bg-light p-3 rounded shadow-sm sticky-top"
            style={{ marginTop: "50px" }}
          >
            <h3 className="mb-3">Categories</h3>
            <ul className="list-group">
              <li
                className={`list-group-item ${
                  category === "Dendrobium" ? "active" : ""
                }`}
              >
                <Link to="/Dendrobium">Dendrobium</Link>
              </li>
              <li
                className={`list-group-item ${
                  category === "Cattleya" ? "active" : ""
                }`}
              >
                <Link to="/Cattleya">Cattleya</Link>
              </li>
              <li
                className={`list-group-item ${
                  category === "Cymbidium" ? "active" : ""
                }`}
              >
                <Link to="/Cymbidium">Cymbidium</Link>
              </li>
              <li
                className={`list-group-item ${
                  category === "Catasetum" ? "active" : ""
                }`}
              >
                <Link to="/Catasetum">Catasetum</Link>
              </li>
              <li
                className={`list-group-item ${
                  category === "Miniature" ? "active" : ""
                }`}
              >
                <Link to="/Miniature">Miniature</Link>
              </li>
            </ul>
          </div>
          <div className="mt-2">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-9">
          <div className="row mt-4 mb-4">
            {filteredOrchids.map((orchid) => {
              return <OrchidListItem key={orchid.id} orchid={orchid} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
