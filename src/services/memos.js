const base_url = 'http://localhost:3000/api/'

export function requestMemos(token) {
    return fetch(base_url + 'memo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function createMemo(token, memo) {
    console.log(token)
    console.log(memo)
    return fetch(base_url + 'memo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(memo)
    })
}