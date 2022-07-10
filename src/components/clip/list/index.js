import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../pagination/index";
import {withRouter} from "react-router-dom";
import * as apiaxios from "../../../api/service";
import {popUpActions} from "../../../redux/store/popup";
import "../../../asset/css/interviewShedule.css";
import ClipCreate from "../create";

function ClipList() {
  const isAuthen = useSelector((state) => state.auth.isAuthenticated);
  const showPopUp = useSelector((state) => state.popup.showModal);
  const [clips, setClips] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [candiPerPage, setCandiPerPage] = useState();
  useEffect(() => {
    apiaxios
      .getClips(`clip?page=${currPage}&latest=true`)
      .then((res) => {
        setClips(res.data.data);
        setCandiPerPage(res.data.total);
      });
  }, [currPage, showPopUp]);
  const dispatch = useDispatch();
  const showModal = (data) => {
    dispatch(popUpActions.show());
    dispatch(popUpActions.setData(data));
  };
  const paginate = (pageNumber) => setCurrPage(pageNumber);

  return (
    <div>
      <ClipCreate />

      <h3 className="text-header">
        Funny Movies
      </h3>
      {isAuthen && <div className="input-toolbar">
        <div className="uploader-candi">
          <button
              id="open-addcandi"
              className="btn-add-candi"
              type="submit"
              onClick={() =>
                  showModal({
                  })
              }
          >
            Share Movie
          </button>
        </div>
      </div>}
      <div className="grid wide home-candidate">
        <div className="table-body">
          {clips.length > 0 ? (
              clips?.map((clip) => (
              <ul className="row sm-gutter sm-gutter--list"
                key={clip.id} >
                <li className="col l-2-8-candi">
                  <img src={clip.thumbnail} alt="logo" className="logo" style={{width:"300px"}}></img>
                </li>
                <li className="col l-2-8-candi" style={{paddingLeft:"16px"}}>{clip.title}</li>
                <li className="col l-2-8-candi">{clip.description}</li>
                <li className="col l-2-8-candi">{clip.author}</li>
                <li className="col l-2-8-candi">
                  <a href={clip.url} target='_blank'>
                    Link Clip
                  </a>
                </li>
              </ul>
            ))
          ) : (
            <div>
              <p className="mess-table-candidate">No Data</p>
            </div>
          )}
        </div>
      </div>
      <Pagination
        className="pagination"
        candiPerPage={clips.length}
        totalCandis={candiPerPage}
        paginate={paginate}
      />
    </div>
  );
}
export default withRouter(ClipList);
