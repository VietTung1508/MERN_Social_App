import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import "./loading.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Loading(props) {
  const isUpload = props.isUpload;
  const isDelete = props.isDelete;
  return (
    <div className="loading">
      <div className="loading__message">
        <FontAwesomeIcon icon={faCircleNotch} className="spinner" />
        <h1>
          Please wait for {isUpload || isDelete ? "post" : "website"} to{" "}
          {isDelete ? "delete" : "load"}....
        </h1>
      </div>
    </div>
  );
}

export default Loading;
