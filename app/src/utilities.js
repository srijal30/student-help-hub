async function getResponse(endpoint, payload){
    const url = 'https://54.87.10.175:8000' + endpoint;
    return await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((res) => {return res.json()})
    .catch((err) => console.log('AN ERROR OCCURED WHILE CONTACTING SERVER:', err));
}

export async function createUser(user){
    const response = await getResponse('/auth/create', user);
    console.log(response);
    return response;
};

export async function loginUser(login){
    const response = await getResponse('/auth/login', login);
    if(response.success){
        localStorage.setItem('token', response.data.token);
    }
    return response;
};

export async function getCurrentUser(){
    const token = localStorage.getItem('token');
    const response = await getResponse('/user/info', {'token': token});
    return response;
}

export async function createEssay(essay){
    const payload = { ...essay, token: localStorage.getItem('token') };
    const response = await getResponse('/essay/create', payload);
    return response;
}

export async function othersEssays(){
    const payload = {token: localStorage.getItem('token')};
    const response = await getResponse('/essay/others', payload);
    return response;
}

export async function yourEssays(){
    const payload = {token: localStorage.getItem('token')};
    const response = await getResponse('/essay/yours', payload);
    return response;
}

export async function commentOnEssay(comment){
    const payload = {token: localStorage.getItem('token'), ...comment};
    const response = await getResponse('/user/comment', payload);
    return response;
}