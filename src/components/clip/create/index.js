import "../../../asset/css/interviewShedule.css";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";

import {useDispatch, useSelector} from "react-redux";
import {popUpActions} from "../../../redux/store/popup";
import {useState} from "react";
import {saveClip} from "../../../api/service";
import Swal from "sweetalert2";

const ClipCreate = () => {
  const dispatch = useDispatch();
  const showPopUp = useSelector((state) => state.popup.showModal);
  const hidePopUp = () => {
    dispatch(popUpActions.hide());
  };
  const [enterLink, setEnterLink] = useState("");
  const addUserHandler = async (event) => {
    event.preventDefault();

    const saveData = {
      url: enterLink,
    };
    try {
      const result = await saveClip(saveData);
      console.log(result.status);

      console.log(result.data);
      if (result.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Share your movie successful!!!",
          showConfirmButton: false,
          timer: 1500,
          style: "display:block",
        });
        dispatch(popUpActions.hide());
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          text: error.response.data.error,
          confirmButtonText: "OK",
        });
      } else if (error.request) {
        Swal.fire({
          icon: "error",
          text: error.request,
          confirmButtonText: "OK",
        });
      } else {
        console.log("Error", error.message);
        Swal.fire({
          icon: "error",
          text: error.message,
          confirmButtonText: "OK",
        });
      }
    }
  };
  const enterLinkChangHanler = (event) => {
    setEnterLink(event.target.value);
  };

  return (
    <Modal
      show={showPopUp}
      className="modal-content2"
      contentClassName="modal-content1"
    >
      <ModalHeader>
        <div className="header_2">
          <h5 style={{ color: "#007bff" }}>SHARE YOUR MOVIE</h5>
        </div>

        <div style={{ borderBottom: "0px solid" }}></div>
      </ModalHeader>

      <ModalBody>
        <div>
          <div className="modal-header1">
            <form onSubmit={addUserHandler}>
              <table>
                <tbody>
                  <tr>
                    <td className="left-modal2">
                      <label>YOUTUBE LINK :</label>
                    </td>
                    <td>
                      <input
                        type="link"
                        onChange={enterLinkChangHanler}
                        value={enterLink}
                        placeholder="Youtube Link"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="taolichpvfooter">
                <button
                  type="button"
                  className="btn btn-light"
                  data-dismiss="modal"
                  onClick={hidePopUp}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-danger-del">
                  Share
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default ClipCreate;
