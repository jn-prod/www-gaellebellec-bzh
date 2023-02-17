import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export function Event({ date, city, title }: { date: string; city: string; title: string }) {
  return (
    <div className="row">
      <div className="col-sm-3 my-3">
        <span className="">
          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
          {date}
        </span>
        <span className="">
          <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
          {city}
        </span>
      </div>
      <div className="col-sm-9">
        <h3 className="text-danger my-3">{title}</h3>
      </div>
    </div>
  );
}
