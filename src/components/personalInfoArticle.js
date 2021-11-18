import PersonalInfoField from "./personalInfoField";

function PersonalInfoArticle(props) {
  return (
    <article className="personal-info-container">
      <h2>Personal Info.</h2>
      <section>
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
      <section>
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
      <section>
        <h3>Contact</h3>
        <ul>
          <PersonalInfoField
            text={props.personalInfo.contact.phoneNumber}
            isEditing={false}
            IsContact={true}
          />
          <PersonalInfoField
            text={props.personalInfo.contact.email}
            isEditing={false}
            IsContact={true}
          />
        </ul>
      </section>
    </article>
  );
}

export default PersonalInfoArticle;
