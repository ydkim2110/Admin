console.log('main.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCGnE6JjOvkym4BXu7hVmdRZtfbDdRxj9U',
  authDomain: 'study-82168.firebaseapp.com',
  projectId: 'study-82168'
});


$('#admin_main_link').on('click', function(){
	$('#wrapper').html(mainViewPage());
});
$('#admin_register_link').on('click', function(){
	$('#wrapper').html(registerViewPage());
});

$('#admin_read_link').on('click', function(){
	$('#wrapper').html(readViewPage());

	var page = "";

	var db = firebase.firestore();
	db.collection("FinanceInfoList").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
	    querySnapshot.forEach((doc) => {
	        console.log(`${doc.id} => ${doc.data().category}`);
	    	page += `<tr>
			      <th scope="row">${doc.data().category}</th>
			      <td>${doc.data().sub_category}</td>
			      <td>${doc.data().company_name}</td>
			      <td>${dateManipulation(doc.data().timestamp)}</td>
			      <td><button>Delete</button></td>
			      <td><button>Edit</button></td>
			    </tr>
	        `;
	    });
	    $('#financeInfo_table').html(page);
	});
});

function dateManipulation(x) {
	var myDate = new Date(x);
	var yyyy = myDate.getFullYear();
    var MM = myDate.getMonth()+1; // getMonth() is zero-based
    var dd  = myDate.getDate();

    var hh = myDate.getHours();
    var mm = myDate.getMinutes();

   	return String(yyyy +'/'+ MM +'/'+ dd + ' ' + hh + ':' + mm); // Leading zeros for mm and dd
}

// Save Data
$(document).on('click', '#save_btn', function(){
	console.log('btn click!!');

	var db = firebase.firestore();
	db.collection("FinanceInfoList").add({
		category: $('#category').val(),
		sub_category: $('#sub_category').val(),
		company_name: $('#company_name').val(),
		title: $('#title').val(),
		start_date: $('#start_date').val(),
		end_date: $('#end_date').val(),
		content: $('#content').val(),
		image_url: $('#image_url').val(),
		content_link: $('#content_link').val(),
		timestamp: firebase.firestore.FieldValue.serverTimestamp()
	}).then(function(docRef){
		console.log("Document written with ID : ", docRef.id);

		$('#category').val('');
		$('#sub_category').val('');
		$('#company_name').val('');
		$('#title').val('');
		$('#start_date').val('');
		$('#end_date').val('');
		$('#content').val('');
		$('#image_url').val('');
		$('#content_link').val('');

	}).catch(function(error){
		console.log("Error: "+error);
	})

	db.collection("FinanceInfoList").get().then((querySnapshot) => {
	    querySnapshot.forEach((doc) => {
	        console.log(`${doc.id} => ${doc.data()}`);
	    });
	});

});


/*
firebase.initializeApp({
  apiKey: 'AIzaSyCGnE6JjOvkym4BXu7hVmdRZtfbDdRxj9U',
  authDomain: 'study-82168.firebaseapp.com',
  projectId: 'study-82168'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// 데이터 쓰기
function saveData() {

	var name = $('#name').val();
	var email = $('#email').val();
	var phone = $('#phone').val();

	db.collection("users").add({
	    name: name,
	    email: email,
	    phone: phone
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	    $('#name').val('');
	    $('#email').val('');
	    $('#phone').val('');
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});

}

// 데이터 읽기
//var user_table = document.getElementById('user_table');
var user_table = $('#user_table')[0];

db.collection("users").onSnapshot((querySnapshot) => {
	user_table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
        user_table.innerHTML += `
			<tr>
		      <th scope="row">${doc.id}</th>
		      <td>${doc.data().name}</td>
		      <td>${doc.data().email}</td>
		      <td>${doc.data().phone}</td>
		      <td><button class="btn btn-danger" onclick="deleteData('${doc.id}')">Delete</button></td>
		      <td><button class="btn btn-warning" onclick="updateData('${doc.id}', '${doc.data().name}', '${doc.data().email}', '${doc.data().phone}')">Edit</button></td>
		    </tr>
        `;
    });
});

// 데이터 삭제
function deleteData(id) {
	db.collection("users").doc(id).delete().then(function() {
    	console.log("Document successfully deleted!");
	}).catch(function(error) {
	    console.error("Error removing document: ", error);
	});
}

// 데이터 업데이트
function updateData(id, name, email, phone) {

	$('#name').val(name);
	$('#email').val(email);
	$('#phone').val(phone);

	var eidtBtn = $('#save_btn')[0];
	eidtBtn.innerHTML = 'Edit';

	eidtBtn.onclick = function(){

		var firestoreFef = db.collection("users").doc(id);

		var name = $('#name').val();
		var email = $('#email').val();
		var phone = $('#phone').val();

		return firestoreFef.update({
			    name: name,
			    email: email,
			    phone: phone
		})
		.then(function() {
		    console.log("Document successfully updated!");
		    eidtBtn.innerHTML = 'Save';
    	    $('#name').val('');
		    $('#email').val('');
		    $('#phone').val('');
		})
		.catch(function(error) {
		    // The document probably doesn't exist.
		    console.error("Error updating document: ", error);
		});
	}
}


*/