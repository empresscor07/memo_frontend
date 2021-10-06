import {Container, Button} from 'react-bootstrap';
import Login from './components/Login';
import { useState } from 'react';
function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    function handleLoginRequest(username, password) {
        if (username === 'cburns' && password === 'password') {
            setLoggedIn(true);
        }
    }

    function handleLogoutRequest() {
            setLoggedIn(false);
    }

    return (
      <Container>
          {
              loggedIn ?
              <Button onClick={handleLogoutRequest}>Logout</Button> :
              <Login handleLoginRequest={handleLoginRequest} />
          }
      </Container>
     );
}

export default App;
