function Card({ title, subtitle, children, actions }) {
  return (
    <div className="hfCard">
      {(title || subtitle || actions) && (
        <div className="hfCardHeader">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>

          {actions && (
            <div className="hfCardActions">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className="hfCardBody">
        {children}
      </div>
    </div>
  );
}

export default Card;

