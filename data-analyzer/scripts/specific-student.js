var subjID = 0;
var testID = 0;
var firstTimePress = true;
var subjectGradesDict = new Dictonary();
var keyNames = []
var subjectContainer = document.createElement("div");
subjectContainer.id = "subjectContainer";
var subjGrades = [];
var avgArr = [];

window.onload=function()
{
    createDataForm();
    document.getElementById("studentName").focus();
}

function createDataForm()
{
 
    var container = document.createElement("div");
    container.id = "inputs";

    var title = document.createElement("h1"); //creating a title
    title.innerHTML = "ניתוח נתונים ל";
    title.className = "title";
    title.id = "title";

    var studentName = document.createElement("input"); //craeting input for the name of the student
    studentName.className = "studentName";
    studentName.id = "studentName";
    studentName.type = "text";
    studentName.placeholder = "שם התלמיד";
    
    document.body.appendChild(title); //appending the title to the body 
    document.body.appendChild(studentName); //appending the input to the body 

    var subjButton = document.createElement("button"); //if the user dont want to use enter key there is a button
    subjButton.innerHTML = "צור נושא";
    subjButton.id = "subjButton";
    subjButton.className = "subjButton";
    subjButton.type = "button";
    subjButton.onclick = function a(){ 
        if(subjName.value==="")
        {
            alert("שם הנושא אינו יכול להיות ריק");
            return;
        }
        createSubj(subjName.value,testNum.value);}
    container.appendChild(subjButton);

    var testNum = document.createElement('input'); //creating input so the user tells how many tests are in the subject
    testNum.type="number";
    testNum.placeholder = "מספר מבחנים";
    testNum.min = "1";
    testNum.max="8";
    testNum.id = "testNum";
    testNum.className = "testInput";
    container.appendChild(testNum);

    var subjName = document.createElement('input'); //creating input so the user tells how many tests are in the subject
    subjName.type="text";
    subjName.placeholder = "שם הנושא";
    subjName.id = "subjName";
    subjName.className = "subjName";
    container.appendChild(subjName);

    var removeSubjButton = document.createElement("button"); //if the user dont want to use backspace key there is a button
    removeSubjButton.innerHTML = "מחק נושא";
    removeSubjButton.id = "removeSubjButton";
    removeSubjButton.className = "removeSubjButton";
    removeSubjButton.type = "button";
    removeSubjButton.onclick = function a(){ removeSubj();}
    container.appendChild(removeSubjButton);

    var analyzeDataBtn = document.createElement("button"); //button that analyze the data after all data entered 
    analyzeDataBtn.innerHTML = "נתח נתונים";              //by the user
    analyzeDataBtn.id = "analyzeDataBtn";
    analyzeDataBtn.className = "analyzeDataBtn";
    analyzeDataBtn.type = "button";
    analyzeDataBtn.onclick = function a(){ getData(studentName.value);}
    container.appendChild(analyzeDataBtn);

    var clearData = document.createElement("button"); //button that analyze the data after all data entered 
    clearData.innerHTML = "נקה נתונים";              //by the user
    clearData.id = "clearData";
    clearData.className = "clearData";
    clearData.type = "button";
    clearData.onclick = function a(){ dataCleaner(); }
    container.appendChild(clearData);

    document.body.appendChild(container);


    var input = document.getElementById("inputs").childNodes[1]; //adding the option to craete a subjcet with the enter key
    input.addEventListener("keyup", function(event) { //and deleting a subject with the backspace key
    event.preventDefault(); //cancelling the default event
    if (event.keyCode === 13) { //eneter key code
        if(subjName.value==="")
        {
            alert("שם הנושא אינו יכול להיות ריק");
            return;
        }
        createSubj(subjName.value,testNum.value);
    }else if(event.keyCode === 8) //backspace key code
    {
        removeSubj();
    }
    });
}

function createSubj(subjectName,testNum)
{
    if(testNum<=0 || testNum>8) //checking if the given values are accepted
    {
        alert("מספר המבחנים לא יכול להיות קטן או שווה ל0 או גדול מ8");
        return;
    }

    var div = document.createElement("div"); //creating a divs for every new subject 

    
    var subjName = document.createElement("input"); //creating input for the name of the subject
    subjName.placeholder = "שם הנושא";

    subjName.id = "subjectNameID:"+ subjID;
    subjName.style.textAlign = "right";
    if(keyNames.includes(subjectName))
    {
        alert("אי אפשר ליצור נושאים עם שמות זהים");
        subjectGradesDict.clearDictonary();
        return;
    }else{
        keyNames.push(subjectName);
        subjName.value = subjectName;
    }
    subjID++;
    div.id = "divID:"+subjID;
    if(subjID===1) //if its the first subject its to be 10% from the top
    {
        subjName.style.marginTop = "10%";
    }else{
        subjName.style.marginTop = "4%";
    }


    testID++;
    for (let index = 0; index < testNum; index++) 
    {
        var test = document.createElement("input");
        test.type = "number";
        test.id = "testID:"+testID;
        test.className = "test";
        test.placeholder = " מבחן "+(index+1);
        test.value = Math.floor(Math.random()*100)+1;
        test.name = String(testNum);
        div.appendChild(test);
    }
    div.appendChild(subjName);
    subjectContainer.appendChild(div);
    document.body.appendChild(subjectContainer);
    let firstSpace = document.createElement('br'); //Descending line
    firstSpace.id = "space"+subjID;
    document.body.appendChild(firstSpace);

    //remove when done:
    document.getElementById("subjName").value = String(subjID);
    console.log(keyNames);
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

function removeSubj()
{
    document.getElementById("space"+subjID).remove(); //removing the space 

    document.getElementById("divID:"+subjID).remove();
    subjectGradesDict.popLast();
    keyNames.pop();
    subjID--; //decreasing the tracking variables
    testID--; //
    if(subjID===0)
    {
        firstTimePress= true;
    }
}


function getData()
{
    if(subjID===0)
    {
        alert("נתונים לא קיימים");
        return;
    }else if(!firstTimePress)
    {
        subjectGradesDict.clearDictonary();
    }
    document.getElementById("inputs").remove();
    var reload = document.createElement("button"); //button that analyze the data after all data entered 
    reload.innerHTML = "הזן מחדש";              //by the user
    reload.id = "reload";
    reload.className = "reload";
    reload.type = "button";
    reload.onclick = function a(){location.reload()}  
    document.body.appendChild(reload);

    var print = document.createElement("button"); //button that analyze the data after all data entered 
    print.innerHTML = "הדפס נתונים";              //by the user
    print.id = "print";
    print.className = "print";
    print.type = "button";
    print.onclick = function a(){window.print();}  
    document.body.appendChild(print);

    var download = document.createElement("button"); //button that analyze the data after all data entered 
    download.innerHTML = "הורד נתונים";              //by the user
    download.id = "download";
    download.className = "download";
    download.type = "button";
    download.onclick = function a(){download_csv()}  
    document.body.appendChild(download);

    let firstSpace = document.createElement('br'); //Descending line
    firstSpace.id = "space";
    document.body.appendChild(firstSpace);

    for (var i = 0; i < subjID; i++) 
    {
        var divData = document.getElementById("divID:"+(i+1)).childNodes;
        var data = Array.from({length:(divData.length-1)})
        subjGrades[i] = []
        for (var j = 0; j < (divData.length-1); j++) 
        {
            data[j]=divData[j].value //data.push(divData[j].value);
            subjGrades[i].push(divData[j].value)
        }
        var DictonaryAdd = subjectGradesDict.add(divData[divData.length-1].value,data)

        if(DictonaryAdd ==="missing")
        {
            alert("שם הנושא באחד מהתיבות חסר");
            subjectGradesDict.clearDictonary();
            return;
        }
    }
    
    console.log(subjectGradesDict.dataStore)
    lineGraph();
    radarGraph();
    firstTimePress = false;
    document.getElementById("subjectContainer").remove();

}

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
        arr[i].pop()
        arr[i].push(avgArr[i]);
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
    
    var csv = '';
    arrCSV = combineDictonary(toArr(subjectGradesDict,keyNames),keyNames,subjGrades)
    arrCSV.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });
 
    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'SpecificStudentExcel.csv';
    hiddenElement.click();
}

function roundN(num,n)
{
    return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
}

function dataCleaner()
{
    if(subjID===0)
    {
        alert("לא קיימים נתונים");
        return;
    }
    for (var i = 1; i < subjID+1; i++) {
        var divData = document.getElementById("divID:"+i).childNodes;
        for (var j = 0; j < (divData.length-1); j++) 
        {
            divData[j].value = null;
        }
    }
    subjectGradesDict.clearDictonary();
}



function lineGraph()
{
    var dataSets = []
    for (let index = 0; index < subjID; index++) {
        var options = new Object();
        var labelsArr = [];     //instead of 0 dont forget to change the outter loop
        for (let i = 1; i < subjectGradesDict.findAt(keyNames[index]).length+1; i++) {
            labelsArr.push("מבחן "+i);
        }
        options.label = keyNames[index];
        options.labels = labelsArr;
        options.data = subjectGradesDict.findAt(keyNames[index]);
        options.type = "line";
        options.backgroundColor = "rgba("+String(Math.floor(Math.random() * 255))+","+String(Math.floor(Math.random() * 255))+","+String(Math.floor(Math.random() * 255))+",1)";
        options.borderColor = options.backgroundColor;
        options.fill = false;
        options.fillColor = options.backgroundColor;
        dataSets.push(options);
    }
    //console.log(dataSets)
  
    if(!firstTimePress)
    {
        try{
            for (let o = 0; o < subjID; o++) {
                document.getElementById("line-bar"+o).remove();
            }
        }catch(e){}
    }
    var ctx = document.createElement("canvas");
    ctx.id = "line-bar";
    ctx.style.width = 200;
    ctx.style.height = 200;
    var lineChartLabels = [ "מבחן 1", "מבחן 2", "מבחן 3", "מבחן 4", "מבחן 5", "מבחן 6", "מבחן 7", "מבחן 8"];
    document.body.appendChild(ctx);
    var studentChart = new Chart(ctx,//creating the chart with the constructor that gets the ctx and object that define the chart properties 
        {   
            type: 'line',
            data:{
                labels:  lineChartLabels,
                datasets: dataSets
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
        });

    for (let c = 0; c < subjID; c++) {
        var ctx = document.createElement("canvas");
        ctx.id = "line-bar"+c;
        ctx.style.width = 200;
        ctx.style.height = 200;
        var lineChartLabels = [ "מבחן 1", "מבחן 2", "מבחן 3", "מבחן 4", "מבחן 5", "מבחן 6", "מבחן 7", "מבחן 8"]
        document.body.appendChild(ctx);
        var studentChart = new Chart(ctx,//creating the chart with the constructor that gets the ctx and object that define the chart properties 
            {   
                type: 'line',
                data:{
                    labels:lineChartLabels,
                    datasets: [
                    {
                        label: keyNames[c],
                        data: dataSets[c].data, 
                        backgroundColor:dataSets[c].fillColor,
                        borderWitdh :6,
                        borderColor:dataSets[c].fillColor,
                        fill: false,
                        //steppedLine: false
                    }
                ]
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
            });
    }   
}


function radarGraph()
{
    var data = []
    var tempArr = []
    for (let index = 0; index < subjID; index++) {
        tempArr = subjectGradesDict.findAt(keyNames[index])
        var avg = 0;
        for (let i = 0; i < tempArr.length; i++) {
            avg = avg+(+tempArr[i]);
            //console.log("appending avg :"+avg);
        }
        avg = (avg/Number(tempArr.length));
        //console.log(avg);
        data.push(avg);
    }
    avgArr = data;
    const ctx = document.createElement("canvas");
    ctx.id = "radarGraph";
    ctx.style.width = "600px";
    ctx.style.height = "600px";
    ctx.className = "radar";
    document.body.appendChild(ctx);
    var radar = new Chart(ctx.getContext("2d"),{
        type:"radar",
        data:{
            labels: keyNames,
            datasets: [
                {
                    label:"חוזקות וחולשות",
                    backgroundColor:'rgba(48, 232, 51,0.3)',
                    borderColor:'rgba(48, 232, 51,0.5)',
                    data:data
                }
            ]
        },
        options:{
            responsive:false,
            defaultFontSize:15,
            scales: {
                ticks: {
                    suggestedMax:100
                }
            }
        }
    });
    

}