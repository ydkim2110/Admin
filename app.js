var db = firebase.firestore();

function registerUser() {
	console.log('registerUser entry!');
	console.log($('#register_email').val());
	var email = $('#register_email').val();
	var password = $('#register_password').val();

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function(){
		verificationEmail();
		saveUserData(email, password);
	})
	.catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
		// ...
	});
}

function saveUserData(email, password) {
	console.log('saveUserData entry!');

	var user = firebase.auth().currentUser;
	console.log(user.uid);

	db.collection('Users').doc(user.uid).set({
		email: email,
		password: password,
		isStaff : 'false'
	}).then(function(docRef){
		console.log("Document written with ID: ", docRef.uid);
		$('#register_email').val('');
		$('#register_password').val('')
	}).catch(function(error) {	
		console.log(error);
	})
}


function verificationEmail() {
	console.log('verificationEmail entry!');

	var user = firebase.auth().currentUser;
	user.sendEmailVerification().then(function() {
	  // Email sent.
		console.log('Verification email was sented your email!')
	}).catch(function(error) {
	  // An error happened.
	  	console.log(error);
	});
}

function loginUser() {
	console.log('loginUser entry!');	
	var email = $('#email').val();
	var password = $('#password').val();

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function(){
		var user = firebase.auth().currentUser;

		db.collection("Users").doc(user.uid).get().then(function(doc) {
		    if (doc.exists) {
		        console.log("Document data:", doc.data());
		        if(doc.data().isStaff === 'true') {
		        	console.log('admin login succeed!!');
					location.href = "main.html";

		        } else {
		        	console.log('admin login failed!!');
		        	alert('관리자 계정으로 로그인 할 수 없습니다.');
					logout();
		        }

		    } else {
		        // doc.data() will be undefined in this case
		        console.log("No such document!");
		    }
		});
		$('#email').val('')
		$('#password').val('');
	})
	.catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
		// ...
	});
}

function observerUser() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			console.log('exist!')

			var displayName = user.displayName;
			var email = user.email;

			console.log('*********************');
			console.log(user.emailVerified);
			console.log('*********************');

			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			// ...
		} else {
			// User is signed out.
			console.log('NO exist!')
			// ...
		}
	});
}
observerUser();

function resultLogin() {
	var result = $('#result')[0];
	result.innerHTML = `
		<div class="alert alert-success" role="alert">
	  		<h4 class="alert-heading">Login Succeed!</h4>
	  		<p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
	  		<hr>
	  		<p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
		</div>
		<p>Hi!!!</p>
		<button class="btn btn-danger" onclick="logout()">Logout</button>
	`;
}

function logout() {
	console.log('logout!')

	firebase.auth().signOut()
	.then(function() {
		console.log('Sign out');
	}).catch(function(error){
		console.log(error);
	})
}
