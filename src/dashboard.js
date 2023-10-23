import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './components/posts/header';
import Timeline from './components/timeline';
import index from './index.css'
// import Sidebar from '../components/sidebar';
import useUser from './hooks/use-user';
import LoggedInUserContext from './context/logged-in-user';

export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser);
  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className={index.dash1}>
        <Header />
        <div className={index.dash2}>
          <Timeline />
          {/* <Sidebar /> */}
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};
