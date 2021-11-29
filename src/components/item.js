import { EventHandlers } from "./educationInformation";
import EducationInformationField from "./educationInformationField";
import Form from "./form";

function Item(props) {
  if (props.educaiton.isEditing) {
    return (
      <EventHandlers.Consumer>
        {({ editEducation, updateEducation, toggleIsEditing }) => {
          return (
            <Form
              eduId={props.educaiton.id}
              defaultForm={editEducation(props.educaiton.id)}
              submitHandler={updateEducation}
              hideForm={toggleIsEditing}
            />
          );
        }}
      </EventHandlers.Consumer>
    );
  }
  return <EducationInformationField item={props.educaiton} />;
}

export default Item;
