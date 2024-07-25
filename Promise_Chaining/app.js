//This is a FAKE Http Request Function
//It takes 1 second to resolve or reject the promise, depending on the url that is passed in

const pages = {
	'/users'        : [
		{ id: 1, username: 'Bilbo' },
		{ id: 5, username: 'Esmerelda' }
	],
	'/users/1'      : {
		id        : 1,
		username  : 'Bilbo',
		upvotes   : 360,
		city      : 'Lisbon',
		topPostId : 454321
	},
	'/users/5'      : {
		id       : 5,
		username : 'Esmerelda',
		upvotes  : 571,
		city     : 'Honolulu'
	},
	'/posts/454321' : {
		id    : 454321,
		title :
			'Ladies & Gentlemen, may I introduce my pet pig, Hamlet'
	},
	'/about'        : 'This is the about page!'
};


const fakeRequest=(url)=>{
	return new Promise((resolve,reject)=>{
		const data = pages[url];
		if(data){
			resolve({status:"clear",data});
		}else{
			reject({status:404});
		}
	});
}

fakeRequest("/users")

.then((response)=>{
	const id = response.data[0].id;
	
	return fakeRequest(`/users/${id}`);
})


	.then((response)=>{
		const postNumber = response.data.topPostId;
		
	return fakeRequest(`/posts/${postNumber}`)
	})

	.then((response)=>{
		
		const post = response.data.title;
		console.log(post);
	})

.catch((err)=>{
	console.log("error happened:" ,err);
})
// ************************************************
// ATTEMPT 2 (deliberate error to illustrate CATCH)
// ************************************************
// fakeRequest('/users')
// 	.then((res) => {
// 		console.log(res);
// 		const id = res.data[0].id;
// 		return fakeRequest(`/useALSKDJrs/${id}`); //INVALID URL, CATCH WILL RUN!
// 	})
// 	.then((res) => {
// 		console.log(res);
// 		const postId = res.data.topPostId;
// 		return fakeRequest(`/posts/${postId}`);
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log('OH NO!', err);
// 	});
