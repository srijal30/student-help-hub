async function getResponse(endpoint, payload){
    console.log(JSON.stringify(payload));
    const url = 'http://localhost:8000' + endpoint;
    return await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((res) => {return res.json()})
    .catch((err) => console.log(err, 'AN ERROR OCCURED'));
}

export async function createUser(user){
    const response = await getResponse('/auth/create', user);
    localStorage.setItem('testing-local', 'SALAJ')
    return response;
};

export async function loginUser(login){
    const response = await getResponse('/auth/login', login);
    localStorage.setItem('token', response.token);
    return response.token;
};

export async function getCurrentUser(login){
    const token = localStorage.getItem('token');
    const response = await getResponse('/user/info', {'token': token});
}
