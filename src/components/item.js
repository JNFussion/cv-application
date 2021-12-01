import { EventHandlers } from "./experience";
import EducationField from "./educationField";
import Form from "./form";

function Item(props) {
  if (props.educaiton.isEditing) {
    return (
      <EventHandlers.Consumer>
        {({ editExperience, updateExperience, toggleIsEditing }) => {
          return (
            <Form
              eduId={props.educaiton.id}
              defaultForm={editExperience(props.educaiton.id)}
              submitHandler={updateExperience}
              hideForm={toggleIsEditing}
            />
          );
        }}
      </EventHandlers.Consumer>
    );
  }
  return <EducationField item={props.educaiton} />;
}

export default Item;
