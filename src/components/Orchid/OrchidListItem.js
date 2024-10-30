import { Link } from "react-router-dom";

export default function OrchidListItem(props) {
  const orchid = props.orchid;
  return (
    <div className="col-md-3 mt-4">
      <div className="card">
        <div key={orchid.id}>
          <Link to={"/detail/" + orchid.id}>
            <img
              src={orchid.image}
              alt=""
              style={{
                marginTop: "12px",
                width: "250px",
                height: "250px",
              }}
            />

            <div className="card-body">
              <h6
                className="card—title"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textAlign: "start",
                }}
              >
                {orchid.name}
                {
                  <span style={{ color: "Red" }}>
                    {orchid?.isSpecial ? " (Special)" : ""}
                  </span>
                }
              </h6>
              <div className="row" role="group">
                <div className="col-12" style={{ textAlign: "start" }}>
                <span className="mt-4">{`Rating: ${orchid.rating}`}</span>
                  <br />
                  <span className="mt-4">{`Color: ${orchid.color}`}</span>
                  <br />
                  <span className="mt-4">{`Origin: ${orchid.origin}`}</span>
                  <br />
                  <span className="mt-4">{`Category: ${orchid.category}`}</span>
                </div>
              </div>
            </div>
          </Link>
          <div className="card-footer text-center">
            <Link to={`/detail/${orchid.id}`}>
              <button className="btn btn-primary">Detail</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
