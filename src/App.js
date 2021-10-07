import {Container} from 'react-bootstrap';
import Login from './components/Login';
import { useState, useEffect} from 'react';
import Memos from './components/Memos'
import {requestLogin} from "./services/user";
import {requestMemos, createMemo, deleteMemo} from "./services/memos";

function App() {
    const [token, setToken] = useState('');
    const [memos, setMemos] = useState([]);
    let needsRefresh = false;
    function handleError (error) {
        console.log(error)
    }

    function handleRequestMemos() {
        console.log('gimme all the memos')
        requestMemos(token).then(data => data.json(), handleError).then(json => {
            console.log(json)
            setMemos(json.memo_list)
        }, handleError).catch(handleError)
    }

    //whenever new render or value of token changes call handle request memos
    useEffect(() => {if (token) {handleRequestMemos()}}, [token])
    // useEffect(() => {if (needsRefresh) {handleRequestMemos()}}, [needsRefresh])

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

    async function handleCreateMemo(memo) {
        await createMemo(token, memo).then(data => data.json(), handleError).then(json => {
            console.log(json)

        }, handleError).catch(handleError)
        handleRequestMemos();
    }

    async function handleDeleteMemo(memo) {
        await deleteMemo(token, memo)
        setMemos(memos.filter(item => item.id !== memo.id));

    }

    return (
      <Container>
          {
              //if token not null then run memos function
              //else run login function to render login screen again.
              token ?
                  //pass param with handle login or logout function as the value
              <Memos handleLogoutRequest={handleLogoutRequest} handleCreateMemo={handleCreateMemo} memos={memos} handleDeleteMemo={handleDeleteMemo}/> :
              <Login handleLoginRequest={handleLoginRequest} />
          }
      </Container>
     );
}

export default App;
