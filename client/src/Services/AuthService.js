/* export default {
    login : user => {
        return fetch('/user/login', {
            method : "post",
            body : JSON.stringify,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res =>{
            if(res.status !== 401)
            return res.json().then(data => data);
         else
           return { isAuthenticated : false, user : {matric : '',role : ''}};   
        } )
    },
    register : user => {
        return fetch('/user/register', {
            method : "post",
            body : JSON.stringify,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
         .then(data => data);  
    },
    logout: () => {
        return fetch('/user/logout')
        .then(res => res.json())
        .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/user/authenticated')
        .then(res => {
          if(res.status !== 401)
            return res.json().then(data => data);
         else
           return { isAuthenticated : false, user : {matric : '',role : ''}};   
        }) 
    }
} */


export default {
    login : user =>{
        console.log(user);
        return fetch('/user/login',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated : false, user : {matric : "",role : ""}};
        })
    },
    register : user =>{
        console.log(user);
        return fetch('/user/register',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    logout : ()=>{
        return fetch('/user/logout')
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated : ()=>{
        return fetch('/user/authenticated')
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return { isAuthenticated : false, user : {matric : "",role : ""}};
                });
    }

}