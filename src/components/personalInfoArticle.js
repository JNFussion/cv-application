import PersonalInfoField from "./personalInfoField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhoneSquare, faEdit } from "@fortawesome/free-solid-svg-icons";

function PersonalInfoArticle(props) {
  return (
    <article className="personal-info-container">
      <button className="btn-edit" onClick={props.clickHandler}>
        <div className="icon-container">
          <FontAwesomeIcon icon={faEdit} />
        </div>
      </button>
      <h2 className="font-extrabold">Personal Info.</h2>
      <section className="field-container">
        <h3>Full Name</h3>
        <p>
          <PersonalInfoField
            text={props.personalInfo.firstName}
            isEditing={false}
          />{" "}
          <PersonalInfoField
            text={props.personalInfo.lastName}
            isEditing={false}
          />
        </p>
      </section>
      <section className="field-container">
        <h3>Current Location</h3>
        <p>
          <PersonalInfoField
            text={props.personalInfo.location.city}
            isEditing={false}
          />
          {", "}
          <PersonalInfoField
            text={props.personalInfo.location.country}
            isEditing={false}
          />
        </p>
      </section>
      <section className="field-container">
        <h3>Contact</h3>
        <ul className="fa-ul">
          <PersonalInfoField
            text={props.personalInfo.contact.phoneNumber}
            isEditing={false}
            IsContact={true}
            iconName={faPhoneSquare}
          />
          <PersonalInfoField
            text={props.personalInfo.contact.email}
            isEditing={false}
            IsContact={true}
            iconName={faAt}
          />
        </ul>
      </section>
    </article>
  );
}

export default PersonalInfoArticle;
