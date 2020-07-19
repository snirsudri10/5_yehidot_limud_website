
let subjDict;
let subjGrades = [];
let subjKeys;
let studentDict;
let studentGrades = [];
let studentKeys;

function dataEnter(students,subjects)
{
    //checking if the parameters are leagel
    if(students === null || students === "" ||subjects === null || subjects==="")
    {
        alert("data cannot be empty");
        return;
    }
    if(subjects <0 || students<0 || subjects>11)
    {
        alert("minimum of stduents or subject is 0\nmaximum number of the subjects is:11");
        return;
    }
    document.getElementById("inputData").remove(); //removing the input from the user
    var i;
    var j;
    doubleSpace(); //double space for aesthetic reasons
    for(i=0;i<subjects;i++) //creating the text input for the name of the subjects
    {
        let subjectName = document.createElement('input'); //creating input element
        subjectName.setAttribute("type","text");

        subjectName.id = i+1+"subject"; //giving id to it
        subjectName.placeholder="נושא-"+(subjects-(i));
        subjectName.value = "subject "+ (subjects-(i));////////////////////////////////////////////////////
        subjectName.className="subject"
        document.body.appendChild(subjectName); //adding it to the body
        doubleSpace() //double space for aesthetic reasons
    }
    doubleLine(); //Descending 2 lines
    for(i = 0;i<students;i++) //creating the table for the user //number of students present the columns
    {

        for(j=0;j<subjects;j++) //number of subjects represent the rows
        {
            doubleSpace();
            let gradeInput = document.createElement('input');
            gradeInput.setAttribute("type", "number"); //creating input with the type of number (the grade)
            gradeInput.min=0; //setting minimum value
            gradeInput.max=100; //setting maximum value
            gradeInput.className="grade "+i+" "+j; 
            gradeInput.id="grade "+i+" "+j;
            gradeInput.value = Math.floor(Math.random()*100)+1;// Random vlaues filler
            document.body.appendChild(gradeInput); //adding it to the body
        }
        doubleSpace();
        let studentName = document.createElement('input'); //creating input which represnt the student's name
        studentName.setAttribute("type","text"); //setting it to text type
        studentName.placeholder = "שם התלמיד/ה"
        studentName.value="student "+(+i+1);
        studentName.id = "studentName" + i;
        studentName.className="student";
        document.body.appendChild(studentName); //adding it to the body
        doubleLine();
    }

    var showGraph = document.createElement("button");
    var reload = document.createElement("button");

    showGraph.type='button'; 
    showGraph.id="showGraph";
    showGraph.className="showGraph"; 
    showGraph.innerHTML='הצג גרפים'; 
    showGraph.onclick = function(){ getStudentsAvgGrade(subjects,students);};
    document.body.appendChild(showGraph); 

    reload.type='button'; 
    reload.id="reload";
    reload.className="reload";
    reload.innerHTML='טען מחדש'; 
    reload.onclick = function(){ location.reload()};
    document.body.appendChild(reload);

    
   
}

//space function
function space()
{
    var foo = document.createTextNode("\u00A0");
    document.body.appendChild(foo); //adding the UNICODE space to the body
}


//down line function
function downLine()
{
    let firstSpace = document.createElement('br'); //Descending line
    document.body.appendChild(firstSpace);
}

function doubleLine()
{
    downLine()
    downLine()
}

function doubleSpace()
{
    space()
    space()
}

function getStudentsAvgGrade(subjects,students)
{
    var i=0,j=0;
    var cols = subjects;
    var rows = students;
    var grades= [];
    var studentNameKeys = [];
    let avg = 0; 
    var studentsAvgDict = new Dictonary();  //declearing all the varibles
    for(i =0;i<rows;i++) //scanning the cols
    {
        avg=0; //the avg reset to zero
        grades[i] = []; //2nd dimensonal of the array
        studentGrades[i] = []
        for(j=0;j<cols;j++) //scanning the rows
        {
            
            grades[i][j] = document.getElementById("grade "+i+" "+j).value; //getting the value by the i and j iterations
            if(grades[i][j] >100 || grades[i][j] <0) //checking if the grade is bigger than 100 or the grade is negetive
            {
                alert("הציון בתא" + ((i+1)) +","+(subjects-(j+1)+1)+"אינו יכול להיות גדול מהציון 100 או להיות שלילי");
                return; // if so i stop the function 
            }
            studentGrades[i].push(grades[i][j])
            avg = +avg + +grades[i][j]; //summing the values 
        }
        avg = avg/subjects; //deviding it by the number of the ubjects
        avg = roundN(avg,2); //rounding the average 2 points 
        studentsAvgDict.add(document.getElementById("studentName" + i).value,avg); //adding to the the dictonary
        studentNameKeys.push(document.getElementById("studentName" + i).value); //array of all the keys
        //alert(document.getElementById("studentName" + i).value +" avg is " +studentsAvg.findAt("studentName" + i));
    }
    studentDict = studentsAvgDict;
    studentKeys = studentNameKeys;
    //console.log(studentsAvgDict.dataStore);
    console.log(studentGrades)
    getSubjectAvgGrade(subjects,students,studentsAvgDict,studentNameKeys);
}

function getSubjectAvgGrade(subjects,students,studentsAvgDict,studentNameKeys)
{    
    var i=0,j=0;
    var cols = students;
    var rows = subjects;
    let avg = 0;
    var grades =[];
    var subjectNameKeys = [];
    var subjectAvgDict = new Dictonary();//declearing all the varibles
    for(i = 0;i<rows;i++) //scaning the cols
    {
        avg=0; //reseting the avg to zero
        grades[i] = []; //2nd dimension of the array
        subjGrades[i] = [];
        for(j=0;j<cols;j++) //scaning the rows
        {
            grades[i][j] =  document.getElementById("grade "+j+" "+i).value; //getting the value
            subjGrades[i].push(grades[i][j]);
            avg = +avg + +grades[i][j]; //summing the avg
        }
        avg = avg/students; //calculating the avg by the studnets number
        avg = roundN(avg,2); //rounding the average 2 points 
        subjectAvgDict.add(document.getElementById(i+1+"subject").value,avg); //adding it to the dictonary
        subjectNameKeys.push(document.getElementById(i+1+"subject").value); //adding the keys to array
        //alert(document.getElementById(i+1+"subject").value +" avg is " +subjectAvg.findAt((i+1+"subject")));
    }
    console.log(subjectAvgDict.dataStore);
    subjDict = subjectAvgDict;
    subjKeys = subjectNameKeys
    DisplayGraph(subjectAvgDict,subjectNameKeys,studentsAvgDict,studentNameKeys); //calling the function that displays the graphs
}

function roundN(num,n)
{
    return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
}

function DisplayGraph(subjectAvgDict,subjectNameKeys,studentsAvgDict,studentNameKeys)
{

    try{
        document.getElementById("subjectCanvas").remove();
        document.getElementById("studentCanvas").remove();
        document.getElementById("csv").remove();
    }catch(e){

    }
    var downloadCSV = document.createElement("button");
    downloadCSV.type = 'button';
    downloadCSV.id = "csv";
    downloadCSV.className = "csv";
    downloadCSV.innerHTML = "הורד את הממוצעים"
    downloadCSV.onclick = function(){download_csv();}
    document.body.appendChild(downloadCSV);
    var studentCanvas = document.createElement('canvas'); //creating 2 cnavases for the chart
    var subjectCanvas = document.createElement('canvas');

    subjectCanvas.id = "subjectCanvas";

    studentCanvas.id = "studentCanvas";

    document.body.appendChild(studentCanvas); //appending the cnavases to the body
    document.body.appendChild(subjectCanvas);

    var ctx1 = document.getElementById(studentCanvas.id).getContext("2d"); //setting the canvas contex
    var ctx2 = document.getElementById(subjectCanvas.id).getContext("2d");
    
    var studentChart = new Chart(ctx1,//creating the chart with the constructor that gets the ctx and object that define the chart properties 
    {   
        type: 'bar',
        data:{
            labels: studentNameKeys,
            datasets: [{
                label: "ממוצע לפי תלמיד",
                data: toArr(studentsAvgDict,studentNameKeys), //pulling data out from the dictonary using the function that gets the dictonary and 
                backgroundColor:"#20415f",                   //returns it as array (only the values)
                strokeColor:"brown",
                borderWitdh :1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        suggestedMax: 100
                    }
                }]
            },
        }
    }
    );


    var subjectChart = new Chart(ctx2,
        {
            type: 'bar',
            data:{
                labels: subjectNameKeys,
                datasets: [{
                    label: "ממוצע לפי נושא",
                    data: toArr(subjectAvgDict,subjectNameKeys),
                    backgroundColor:"#20835f",
                    strokeColor:"brown",
                    borderWitdh :1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            suggestedMax: 100
                        }
                    }]
                }
            }
        }
        );

}


/*
this function is getting dictonary and the keys and return onlt the values of the keys
input:dictonary{type:dicotnary (created by the developer)},keys{type:array})
*/
function toArr(dictonary,keys)
{
    var arr = [];
    var i=0;

    for(i=0;i<dictonary.size();i++) //moving on each object in the dictonary
    {
        arr.push(dictonary.findAt(keys[i])); //pusing the values to an array;
    }

    return arr;
}

/*
create 2nd dimensonal array in order to create csv file
input: the dictonary, the keys
output: new combined array 
*/
function combineDictonary(dicotnary,keys,grades){
let i = 0,j=0;
let arr = [];
console.log("this is keys");
console.log(keys);
//console.log(dicotnary);
for(i=0;i<dicotnary.length;i++){
    arr[i] = [];
    j=0;
    arr[i][j] = keys[i];
    for(j=0;j<grades[i].length;j++){
        arr[i].push(grades[i][j])
    }
    arr[i][grades[i].length+1] = dicotnary[i];
}
console.log("this is arr")
console.log(arr);
return arr;
/*
for(i=0;i<dictonary.length;i++){
    console.log(keys[i]);
}*/
}

function download_csv(){
    var csv = ',';
    for(let i = 1;i<studentGrades.length+1;i++){
        csv= csv + 'grade '+i + ',';
    }
    csv+='average\n'
    subjCSV = combineDictonary(toArr(subjDict,subjKeys),subjKeys,subjGrades)
    console.log(subjCSV)
    subjCSV.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });
 
    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'subjectAvg.csv';
    hiddenElement.click();

    csv = ',';
    for(let i = 1;i<subjGrades.length+1;i++){
        csv= csv + 'grade '+i + ',';
    }
    csv+='average\n'
    studentCSV = combineDictonary(toArr(studentDict,studentKeys),studentKeys,studentGrades)
    //console.log(studentCSV)
    studentCSV.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });
 
    //console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'studentsAvg.csv';
    hiddenElement.click();
}