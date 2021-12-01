import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionsContext } from "./experience";

function ActionButton(props) {
  return (
    <ActionsContext.Consumer>
      {({ actionsSettings }) => (
        <button
          className={
            "transition-state btn " + actionsSettings[props.btnType].class
          }
          onClick={() => {
            actionsSettings[props.btnType].action(props.id);
          }}
        >
          <div className="icon-container">
            <FontAwesomeIcon icon={actionsSettings[props.btnType].icon} />
          </div>
        </button>
      )}
    </ActionsContext.Consumer>
  );
}

export default ActionButton;
