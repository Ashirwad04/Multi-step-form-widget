const APP_NAME = "ashirwad";

let currentStep = 1;

const formSteps = document.querySelectorAll(".form-step");
const steps = document.querySelectorAll(".step");


// ======================================
// RECORD IDS
// ======================================

let basicRecordId = null;
let educationRecordId = null;


// ======================================
// INIT
// ======================================

ZOHO.CREATOR.init().then(function () {

    console.log("Widget Initialized");

});


// ======================================
// SHOW STEP
// ======================================

function showStep(step){

    formSteps.forEach((form)=>{
        form.classList.remove("active");
    });

    steps.forEach((item)=>{
        item.classList.remove("active");
    });

    formSteps[step - 1].classList.add("active");

    steps[step - 1].classList.add("active");

    currentStep = step;
}


// ======================================
// STEP CLICK
// ======================================

function goToStep(step){

    // STEP 1

    if(step == 1){

        showStep(1);

    }

    // STEP 2

    else if(step == 2){

        if(basicRecordId){

            showStep(2);

        }
        else{

            alert("Please complete Basic Details first");

        }

    }

    // STEP 3

    else if(step == 3){

        if(educationRecordId){

            showStep(3);

        }
        else{

            alert("Please complete Education Details first");

        }

    }

}


// ======================================
// BACK BUTTON
// ======================================

function prevStep(step){

    showStep(step);

    // BACK TO BASIC DETAILS

    if(step == 1){

        getBasicRecord();

    }

}


// ======================================
// SAVE BASIC DETAILS
// ======================================

function saveBasicDetails(){

    const name = document.getElementById("name").value;

    const role = document.getElementById("role").value;

    const phone = document.getElementById("phone").value;



    // VALIDATION

    if(name == "" || role == "" || phone == ""){

        alert("Please fill all fields");

        return;

    }



    const formData = {

        data:{

            Name:name,

            Roll:role,

            Phone_no:phone

        }

    };



    // CREATE RECORD

    ZOHO.CREATOR.API.addRecord({

        appName:APP_NAME,

        formName:"Basic_Details",

        data:formData

    }).then(function(response){

        console.log(response);

        if(response.code == 3000){

            alert("Basic Details Saved");



            // SAVE RECORD ID

            basicRecordId = response.data.ID;



            console.log("Basic Record ID :", basicRecordId);



            // CHANGE BUTTON

            document.getElementById("basicBtn").innerText =
            "Update & Next";



            // CHANGE BUTTON FUNCTION

            document.getElementById("basicBtn").onclick =
            updateBasicDetails;



            // COMPLETE STEP

            steps[0].classList.add("completed");



            // NEXT STEP

            showStep(2);

        }

    });

}


// ======================================
// GET BASIC RECORD
// ======================================

function getBasicRecord(){

    if(!basicRecordId){

        return;

    }

    ZOHO.CREATOR.API.getRecordById({

        appName:APP_NAME,

        reportName:"Basic_Details_Report",

        id:basicRecordId

    }).then(function(response){

        console.log(response);

        if(response.code == 3000){

            // FILL INPUTS

            document.getElementById("name").value =
            response.data.Name || "";

            document.getElementById("role").value =
            response.data.Roll || "";

            document.getElementById("phone").value =
            response.data.Phone_no || "";



            // BUTTON TEXT

            document.getElementById("basicBtn").innerText =
            "Update & Next";



            // BUTTON FUNCTION

            document.getElementById("basicBtn").onclick =
            updateBasicDetails;

        }

    });

}


// ======================================
// UPDATE BASIC DETAILS
// ======================================

function updateBasicDetails(){

    const name = document.getElementById("name").value;

    const role = document.getElementById("role").value;

    const phone = document.getElementById("phone").value;



    if(name == "" || role == "" || phone == ""){

        alert("Please fill all fields");

        return;

    }



    const formData = {

        data:{

            Name:name,

            Roll:role,

            Phone_no:phone

        }

    };



    ZOHO.CREATOR.API.updateRecord({

        appName:APP_NAME,

        reportName:"Basic_Details_Report",

        id:basicRecordId,

        data:formData

    }).then(function(response){

        console.log(response);

        if(response.code == 3000){

            alert("Basic Details Updated");

            showStep(2);

        }

    });

}



// ======================================
// SAVE EDUCATION DETAILS
// ======================================

function saveEducationDetails(){

    const college = document.getElementById("college").value;

    const degree = document.getElementById("degree").value;

    const year = document.getElementById("year").value;



    // VALIDATION

    if(college == "" || degree == "" || year == ""){

        alert("Please fill all fields");

        return;

    }



    const formData = {

        data:{

            Collage_Name:college,

            Degree:degree,

            Passing_Year:year

        }

    };



    // CREATE RECORD

    ZOHO.CREATOR.API.addRecord({

        appName:APP_NAME,

        formName:"Education_Details",

        data:formData

    }).then(function(response){

        console.log(response);

        if(response.code == 3000){

            alert("Education Details Saved");



            // SAVE RECORD ID

            educationRecordId = response.data.ID;



            // CHANGE BUTTON TEXT

            document.getElementById("educationBtn").innerText =
            "Update & Next";



            // CHANGE BUTTON FUNCTION

            document.getElementById("educationBtn").onclick =
            updateEducationDetails;



            // COMPLETE STEP

            steps[1].classList.add("completed");



            // OPEN STEP 3

            showStep(3);

        }

    });

}



// ======================================
// GET EDUCATION RECORD
// ======================================

function getEducationRecord(){

    if(!educationRecordId){

        return;

    }

    ZOHO.CREATOR.API.getRecordById({

        appName:APP_NAME,

        reportName:"Education_Details_Report",

        id:educationRecordId

    }).then(function(response){

        console.log(response);

        if(response.code == 3000){

            // FILL INPUTS

            document.getElementById("college").value =
            response.data.Collage_Name || "";

            document.getElementById("degree").value =
            response.data.Degree || "";

            document.getElementById("year").value =
            response.data.Passing_Year || "";



            // BUTTON TEXT

            document.getElementById("educationBtn").innerText =
            "Update";



            // BUTTON FUNCTION

            document.getElementById("educationBtn").onclick =
            updateEducationDetails;

        }

    });

}





// ======================================
// UPDATE EDUCATION DETAILS
// ======================================
function updateEducationDetails(){

    const college = document.getElementById("college").value;

    const degree = document.getElementById("degree").value;

    const year = document.getElementById("year").value;



    if(college == "" || degree == "" || year == ""){

        alert("Please fill all fields");

        return;

    }



    const formData = {

        data:{

            Collage_Name:college,

            Degree:degree,

            Passing_Year:year

        }

    };



    ZOHO.CREATOR.API.updateRecord({

        appName:APP_NAME,

        reportName:"Education_Details_Report",

        id:educationRecordId,

        data:formData

    }).then(function(response){

        console.log(response);

        if(response.code == 3000){

            alert("Education Details Updated");



            // OPEN STEP 3

            showStep(3);

        }

    });

}

// ======================================
// DOCUMENT RECORD ID
// ======================================

let documentRecordId = null;


// ======================================
// SAVE DOCUMENTS
// ======================================

function saveDocuments(){


    const resumeFiles =
    document.getElementById("resume").files;

    const tenthFiles =
    document.getElementById("tenthMarksheet").files;

    const twelfthFiles =
    document.getElementById("twelfthMarksheet").files;



    if(
        resumeFiles.length == 0 ||
        tenthFiles.length == 0 ||
        twelfthFiles.length == 0
    ){

        alert("Please upload all documents");

        return;

    }



    // CREATE RECORD

    ZOHO.CREATOR.API.addRecord({

        appName:APP_NAME,

        formName:"Documents_Upload",

        data:{
            data:{}
        }

    }).then(function(response){

        console.log(response);



        if(response.code == 3000){

            documentRecordId = response.data.ID;



            // UPLOAD FILES

            uploadMultipleFiles(
                "Upload_Resume",
                resumeFiles
            );

            uploadMultipleFiles(
                "Upload_10th_Marksheet",
                tenthFiles
            );

            uploadMultipleFiles(
                "Upload_12th_Marksheet",
                twelfthFiles
            );



            alert("Documents Uploaded Successfully");



            document.getElementById("documentBtn").innerText =
            "Update Documents";



            document.getElementById("documentBtn").onclick =
            updateDocuments;

        }

    });

}


function uploadMultipleFiles(fieldName, files){

    for(let i = 0; i < files.length; i++){

        let config = {

            appName : APP_NAME,

            reportName : "Documents_Upload_Report",

            id : documentRecordId,

            fieldName : fieldName,

            file : files[i]

        };



        ZOHO.CREATOR.API.uploadFile(config)
        .then(function(response){

            console.log(response);

        });

    }

}

// ======================================
// UPLOAD RESUME
// ======================================

function uploadResume(fileObject){

    var config = {

        appName : APP_NAME,

        reportName : "Documents_Upload_Report",

        id : documentRecordId,

        fieldName : "Upload_Resume",

        file : fileObject

    };



    ZOHO.CREATOR.API.uploadFile(config)
    .then(function(response){

        console.log(response);

        if(response.code == 3000){

            console.log("Resume Uploaded");



            // NEXT FILE

            const tenth =
            document.getElementById("tenthMarksheet").files[0];

            upload10th(tenth);

        }

    });

}

// ======================================
// UPLOAD 10TH
// ======================================

function upload10th(fileObject){

    var config = {

        appName : APP_NAME,

        reportName : "Documents_Upload_Report",

        id : documentRecordId,

        fieldName : "Upload_10th_Marksheet",

        file : fileObject

    };



    ZOHO.CREATOR.API.uploadFile(config)
    .then(function(response){

        console.log(response);

        if(response.code == 3000){

            console.log("10th Uploaded");



            // NEXT FILE

            const twelfth =
            document.getElementById("twelfthMarksheet").files[0];

            upload12th(twelfth);

        }

    });

}

// ======================================
// UPLOAD 12TH
// ======================================

function upload12th(fileObject){

    var config = {

        appName : APP_NAME,

        reportName : "Documents_Upload_Report",

        id : documentRecordId,

        fieldName : "Upload_12th_Marksheet",

        file : fileObject

    };



    ZOHO.CREATOR.API.uploadFile(config)
    .then(function(response){

        console.log(response);

        if(response.code == 3000){

            console.log("12th Uploaded");



            alert("All Documents Uploaded Successfully");



            // COMPLETE STEP

            steps[2].classList.add("completed");



            // BUTTON TEXT

            document.getElementById("documentBtn").innerText =
            "Update Documents";

        }

    });

}




// ======================================
// UPDATE DOCUMENTS
// ======================================
function updateDocuments(){


    const resumeFiles =
    document.getElementById("resume").files;

    const tenthFiles =
    document.getElementById("tenthMarksheet").files;

    const twelfthFiles =
    document.getElementById("twelfthMarksheet").files;



    if(resumeFiles.length > 0){

        uploadMultipleFiles(
            "Upload_Resume",
            resumeFiles
        );

    }



    if(tenthFiles.length > 0){

        uploadMultipleFiles(
            "Upload_10th_Marksheet",
            tenthFiles
        );

    }



    if(twelfthFiles.length > 0){

        uploadMultipleFiles(
            "Upload_12th_Marksheet",
            twelfthFiles
        );

    }



    alert("Documents Updated Successfully");

}




