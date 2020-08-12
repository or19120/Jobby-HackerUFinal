import React, { useEffect } from "react";
import { getGit } from "../../actions/profile";
import Loader from "../layout/Loader";
import { useSelector, useDispatch } from "react-redux";
const GithubRepo = (props) => {
  const { name } = props;
  const { repos } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGit(name));
  }, []);
  return (
    <div class="profile-github">
      <h2 class="text-primary my-1">
        <i class="fab fa-github"></i> Github Repos
      </h2>
      {repos === null ? (
        <Loader />
      ) : (
        repos.map((repo) => (
          <React.Fragment>
            <div key={repos._id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>

              <div>
                <ul>
                  <li class="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li class="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li class="badge badge-light">Forks: {repo.forks_count}</li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default GithubRepo;
