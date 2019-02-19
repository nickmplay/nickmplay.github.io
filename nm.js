//nm.js functions
//test variable
var nmjs = true;
//sample rainbow colour deck
var arrColours = ['#e2431e', '#e7711b', '#f1ca3a', '#6f9654', '#1c91c0', 'pink', '#43459d'];

function isPalindrome(str){
	return str
		.split("")
		.reverse()
		.join("") === str;
};

//round to 2dp
function r2dp(number){
	return Math.round(number*100)/100;
}

//print number as string with commas
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//***date processing***
//convert date string into date object
function returnDate(data){
	if (data.indexOf("-") != -1){
		//case: YYYY-MM-DD
		var dateArray = data.split("-");
		var d = new Date( dateArray[0], dateArray[1]-1, dateArray[2]);
		return d;
	} else if(data.indexOf("/") != -1){
		//case: DD/MM/YYYY
		var dateArray = data.split("/");
		var d = new Date( dateArray[2], dateArray[1]-1, dateArray[0]);
		return d;
	}
}

//return number of days between two string dates
function nDays(ds0, ds1){
	//convert date strings into date objects
	var d0 = returnDate(ds0);
	var d1 = returnDate(ds1);
	
	return Math.round( (d1 - d0)/(1000*60*60*24) );
}

function isApreB(dsA, dsB){
	return nDays(dsA, dsB) > 0 ? true : false;
}

function isApostB(dsA, dsB){
	return dsA == dsB ? false : !isApreB(dsA, dsB);
}

//return the Xst/Xnd/Xrd/Xth depending on date number
function dayStr(num){ 
	var stNum;
	switch (true){
		case (num == 1 || num == 21 || num == 31):
			stNum = num + "st";
			break;
		case (num == 2 || num == 22):
			stNum = num + "nd";
			break;
		case (num == 3 || num == 23):
			stNum = num + "rd";
			break;
		case (num > 31):
			stNum = "Date not possible";
			break;
		default:
			stNum = num + "th";
	}
	return stNum;
}

//***data processing***
//turn an array of arrays into an HTML table string
function googToHTML(dataArray){
	var i=0, j=0;
	var oHeaders = dataArray[0];
	var nHeaders = oHeaders.length;
	var tb = {
		s: "<tr><td>",
		i: "</td><td>",
		e: "</td></tr>"
	};
	
	var sHTML = "<table><tr>";
	
	//loop headers (ie first array)
	for(i=0; i<nHeaders; i++){
		sHTML += "<th>" + oHeaders[i] + "</th>";
	}
	sHTML += "</tr>";
	
	//load data	(ie remaining arrays) into table html
	for (i=1; i<dataArray.length; i++){
		for (j=0; j<oHeaders.length; j++){
			j==0 ? sHTML += tb.s : sHTML += tb.i; 
			sHTML += dataArray[i][j] === undefined ? "-" : dataArray[i][j];
			j+1 == oHeaders.length ? sHTML += tb.e : sHTML += "";
		}
	}
	sHTML += "</table>";
	return sHTML; 
}

//append new column of data containing xSimpleMoving Average
function addXMA(dataArray, colNum, xma){
	//error trap: colNum too high
	if(colNum > dataArray[0].length-1){
		return "colNum exceeds the column limit of " + dataArray[0].length;
	}
	
	//add average of previous x data points, or current data point if history is not long enough
	var i=0, j=0;
	dataArray[0].push( xma + "MA" );
	for (i=1; i<dataArray.length; i++){
		if(i<xma+1){
			dataArray[i].push( dataArray[i][colNum] );
		} else {
			var total = 0;
			for (j=1; j<xma+1; j++){
				total += dataArray[i-j][colNum];
			}
			total /= xma;
			dataArray[i].push(total);
		}
	}
	return dataArray;
}

//append new column of data containing xStandardDeviation 
function addXSD(dataArray, colNum, xsd){
	//error trap: colNum too high
	if(colNum > dataArray[0].length-1){
		return "colNum exceeds the column limit of " + dataArray[0].length;
	}
	
	//add average of previous x data points, or current data point if history is not long enough
	var i=0, j=0;
	dataArray[0].push( xsd + "SD" );
	for (i=1; i<dataArray.length; i++){
		if(i<xsd+1){
			dataArray[i].push( 0 );
		} else {
			var data = [];
			for (j=1; j<xsd+1; j++){
				data.push( dataArray[i-j][colNum] );
			}
			
			dataArray[i].push( sdArray(data) );
		}
	}
	return dataArray;
}

//append new column of data containing xStandardDeviation 
function addXBB(dataArray, colNum, xbb){
	//error trap: colNum too high
	if(colNum > dataArray[0].length-1){
		return "colNum exceeds the column limit of " + dataArray[0].length;
	}
	
	//add average of previous x data points, or current data point if history is not long enough
	var i=0, j=0;
	dataArray[0].push.apply(dataArray[0], [xbb + "BB-", xbb + "MA", xbb + "BB+"]);
	for (i=1; i<dataArray.length; i++){
		if(i<xbb+1){
			dataArray[i].push( dataArray[i][colNum] );
			dataArray[i].push( dataArray[i][colNum] );
			dataArray[i].push( dataArray[i][colNum] );
		} else {
			var data = [];
			for (j=1; j<xbb+1; j++){
				data.push( dataArray[i-j][colNum] );
			}
			var mu = meanArray(data);
			var sd = sdArray(data);
			
			dataArray[i].push( mu - 2*sd );
			dataArray[i].push( mu );
			dataArray[i].push( mu + 2*sd );
		}
	}
	return dataArray;
}

//turn a JSON data object into an HTML string
function tableJSON(data){
	var h = [], i, j, tHTML = "", hn=0;
	var n = data.length;
	var tb = {
		s: "<tr><td>",
		i: "</td><td>",
		e: "</td></tr>"
	};
	
	//begin table html
	tHTML += "<table><tr>";
	
	//extract headers
	for (i in data[0]){
		h.push(i);
		hn++;
		tHTML += "<th>" + i + "</th>";
	}
	tHTML += "</tr>";
	
	//load data into table html
	for (i=0; i<data.length; i++){
		for (j=0; j<h.length; j++){
			j==0 ? tHTML += tb.s : tHTML += tb.i; 
			tHTML += data[i][ h[j] ];
			j+1 == h.length ? tHTML += tb.e : tHTML += "";
		}
	}
	
	//finish table html
	tHTML += "</table>";
	return tHTML;
}

//strip out duplicates
function uniqueArray(inputArray){
	var i, strArray = [], saDistinct = [];
	//convert into an array of strings
	for(i=0; i<inputArray.length; i++){
		strArray.push(JSON.stringify(inputArray[i]));
	} 
	
	//loop and check for uniqueness
	for(i=0; i<strArray.length; i++){
		if(saDistinct.indexOf(strArray[i]) == -1){
			saDistinct.push(strArray[i]);
		}
	}
	
	//convert from string
	for(i=0; i<saDistinct.length; i++){
		saDistinct[i] = JSON.parse(saDistinct[i]);
	}
	
	return saDistinct;
}

//process callback
function run2args(a1, a2, f){
	return f(a1,a2);
	
}

//print data into console log for diagnostics
function printAll(a){
	for(var i=0; i<a.length; i++){
		console.log(a[i]);
	}
}

//return all combinations (from ss.js)
function combinations(elements /*: Array<any> */, k/*: number */) {
    var i;
    var subI;
    var combinationList = [];
    var subsetCombinations;
    var next;

    for (i = 0; i < elements.length; i++) {
        if (k === 1) {
            combinationList.push([elements[i]])
        } else {
            subsetCombinations = combinations(elements.slice( i + 1, elements.length ), k - 1);
            for (subI = 0; subI < subsetCombinations.length; subI++) {
                next = subsetCombinations[subI];
                next.unshift(elements[i]);
                combinationList.push(next);
            }
        }
    }
    return combinationList;
}


//return all possibilities of two input arrays
function allPoss(a1, a2){
	var results = [];
	for(var i1=0; i1<a1.length; i1++){
		for(var i2=0; i2<a2.length; i2++){
			var tempToAdd = [];
			tempToAdd.push(a1[i1], a2[i2]);
			results.push(tempToAdd);
		}
	}
	
	return results;
}

//update class of a tag element in a table string
function addTagClass(tableStr, tag, contains, strClass){
	var oDiv = document.createElement("div");
	var iCount =0;
	oDiv.innerHTML = tableStr;
	
	//select rows and update class
	var rows = oDiv.getElementsByTagName(tag);
	for(var i=0; i<rows.length; i++){
		if(rows[i].innerHTML.indexOf(contains) != -1 ){
			rows[i].setAttribute("class", strClass);
			iCount++;
		}
	}
	
	return iCount > 0 ? oDiv.innerHTML : tableStr;
	//return oDiv.innerHTML;
}

//return the standard deviation of an array of numbers
function sdArray(numArray){
	var i, total = 0, mean = 0, n = 0;
	
	//calculate the mean
	for (i=0; i<numArray.length; i++){
		total += numArray[i];
		n++;
	}
	mean = total/n;
	
	//calculate sd
	total = 0;
	for (i=0; i<numArray.length; i++){
		total += Math.pow((numArray[i] - mean), 2);
	}
	total /= (n-1);
	
	return Math.sqrt(total);
}

//return mean
function meanArray(numArray){
	var i, total = 0, mean = 0, n = 0;
	
	//calculate the mean
	for (i=0; i<numArray.length; i++){
		total += numArray[i];
		n++;
	}
	return total/n;
}

//DOM manipulation
//return query selector
function Q(qs){
	return document.querySelectorAll(qs);
}

//return object of a given #id
function O(q_id){
	return document.getElementById(q_id);
}

