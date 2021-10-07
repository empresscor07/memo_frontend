import {Container} from 'react-bootstrap';
import Login from './components/Login';
import { useState, useEffect} from 'react';
import Memos from './components/Memos'
import {requestLogin} from "./services/user";
import {requestMemos, createMemo} from "./services/memos";
function App() {
    const [token, setToken] = useState('');
    const [memos, setMemos] = useState({});

    function handleError (error) {
        console.log(error)
    }

    function handleRequestMemos() {
        console.log('gimme all the memos')
        requestMemos(token).then(data => data.json(), handleError).then(json => {
            console.log(json)
        }, handleError).catch(handleError)
    }

    //whenever new render or value of token changes call handle request memos
    useEffect(() => {if (token) {handleRequestMemos()}}, [token])

    function handleLoginRequest(username, password) {
        requestLogin({username, password}).then(data => data.json(), handleError).then(json => {
            console.log(json)
            //returned object has a token value if logging in worked
            if (json.token){
                setToken(json.token);
            } else {
                console.log('no token')
            }
        }, handleError).catch(handleError)
    }

    function handleLogoutRequest() {
            setToken('');
    }

    function handleCreateMemo(memo) {
        createMemo(token, memo).then(data => data.json(), handleError).then(json => {
            console.log(json)
        }, handleError).catch(handleError)
    }

    return (
      <Container>
          {
              //if token not null then run memos function
              //else run login function to render login screen again.
              token ?
                  //pass param with handle login or logout function as the value
              <Memos handleLogoutRequest={handleLogoutRequest} handleCreateMemo={handleCreateMemo} /> :
              <Login handleLoginRequest={handleLoginRequest} />
          }
      </Container>
     );
}

export default App;
