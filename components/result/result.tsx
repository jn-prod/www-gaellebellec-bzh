import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarkerAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';

export function Result({ date, city, event, place }: { date: string; city: string; event: string; place: string }) {
  return (
    <div className="row">
      <div className="col-sm-2 my-3">
        <div className="rank">
          <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon> #{place}
        </div>
      </div>
      <div className="col-sm-3 my-3">
        <div>
          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
          {date}
        </div>
        <div>
          <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
          {city}
        </div>
      </div>
      <div className="col-sm-7">
        <h3 className="text-danger my-3">{event}</h3>
      </div>
    </div>
  );
}
