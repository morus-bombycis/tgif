//-----Data source
const members = data.results[0].members;

//-----Congress 133 Page: Senators" & "House of Represantatives
const createTableCategories = (id) => {
  const categories = ["Full Name", "Party", "State", "Seniority", "% of Votes w/ Party"];
  //Specifies where the output is returned to
  const tbl = document.getElementById(id);
  //Orders said HTML elements to be created
  const tblHead = document.createElement('thead');
  tblHead.classList = "thead-dark"
  const tblBody = document.createElement('tbody');
  //Create the table head as well as the texts inside for all the categories in the abstract array
  for (i in categories) {
    const tblHeadRow = document.createElement('th');
    const tblHeadText = document.createTextNode(categories[i]);
    //Table head text node to be attached to the table head row; table head row to the table head
    tblHeadRow.appendChild(tblHeadText);
    tblHead.appendChild(tblHeadRow);
  }
  //Attach the table body to the table head created above
  tbl.appendChild(tblHead);
  tbl.appendChild(tblBody);

  for (j in members) {
    //Create the rows as well as the cells
    const tblDataRow = document.createElement('tr');
    const tblDataCellName = document.createElement('td');
    const tblDataCellParty = document.createElement('td');
    const tblDataCellState = document.createElement('td');
    const tblDataCellSeniority = document.createElement('td');
    const tblDataCellVotes = document.createElement('td');
    //Cause the actual data to fit into said cells as text nodes
    const tblCellTextName = document.createTextNode(members[j].first_name + " " + members[j].last_name)
    const tblCellTextParty = document.createTextNode(members[j].party);
    const tblCellTextState = document.createTextNode(members[j].state);
    const tblCellTextSeniority = document.createTextNode(members[j].seniority);
    const tblCellTextVotes = document.createTextNode(members[j].votes_with_party_pct);
    //All the cells with the data inside to be attached to the corresponding rows
    tblDataCellName.appendChild(tblCellTextName);
    tblDataCellParty.appendChild(tblCellTextParty);
    tblDataCellState.appendChild(tblCellTextState);
    tblDataCellSeniority.appendChild(tblCellTextSeniority);
    tblDataCellVotes.appendChild(tblCellTextVotes);
    tblDataRow.appendChild(tblDataCellName)
    tblDataRow.appendChild(tblDataCellParty)
    tblDataRow.appendChild(tblDataCellState)
    tblDataRow.appendChild(tblDataCellSeniority)
    tblDataRow.appendChild(tblDataCellVotes)
    tblBody.appendChild(tblDataRow)
  }
}

//Call the function for Senate and House respectively
if(document.title == "Congress 133: Senate") {
    createTableCategories("senate-data")
}else if(document.title == "Congress 133: House of Representatives"){
    createTableCategories("house-data")
}

//-----House / Senate at a Glance
const voteWithParty = (location_by_id) => {

    const voteWithPartyCategories = ["Party", "No. of Reps", "% Voted w/ Party"]

    var vote = {
        "democrats": {
            "party": "Democrats",
            "count": 0,
            "vote": 0,},

        "republicans": {
            "party": "Republicans",
            "count": 0,
            "vote": 0,},

        "independents": {
            "party": "Independents",
            "count": 0,
            "vote": 0,},

        "total":{
            "party": "Total",
            "count": 0,
            "vote": 0}
    }

    for(var i = 0; i < members.length; i++){
        vote.total.count++;
        if(members[i].party == "R"){
            vote.republicans.count++;
        }else if(members[i].party == "D"){
            vote.democrats.count++;
        }else{
            vote.independents.count++;
        }
    }

    for(var i = 0; i < members.length; i++){
        vote.total.vote += members[i].votes_with_party_pct;
        if(members[i].party == "R"){
            vote.republicans.vote += members[i].votes_with_party_pct;
        }else if(members[i].party == "D"){
            vote.democrats.vote += members[i].votes_with_party_pct;
        }else{
            vote.independents.vote += members[i].votes_with_party_pct;
        }
    }

    const votesTbl = document.getElementById(location_by_id)
    const tblHead = document.createElement('thead');
    tblHead.classList = "thead-dark"
    const tblBody = document.createElement('tbody');

    for (i in voteWithPartyCategories) {
        const tblHeadRow = document.createElement('th');
        const tblHeadText = document.createTextNode(voteWithPartyCategories[i]);
        tblHeadRow.appendChild(tblHeadText);
        tblHead.appendChild(tblHeadRow);
        votesTbl.appendChild(tblHead);
        votesTbl.appendChild(tblBody);
    }

    for (j in vote) {
        const tblDataRow = document.createElement('tr');
        const tblDataCellParty = document.createElement('td');
        const tblDataCellNoOfReps = document.createElement('td');
        const tblDataCellVotedWithParty = document.createElement('td');
        const tblCellTextParty = document.createTextNode(vote[j].party)
        const tblCellTextNoOfReps = document.createTextNode(vote[j].count);
        const tblCellTextVotedWithParty = document.createTextNode(Math.floor((vote[j].vote/vote[j].count)*100)/100);
        tblDataCellParty.appendChild(tblCellTextParty)
        tblDataCellNoOfReps.appendChild(tblCellTextNoOfReps)
        tblDataCellVotedWithParty.appendChild(tblCellTextVotedWithParty);
        tblDataRow.appendChild(tblDataCellParty)
        tblDataRow.appendChild(tblDataCellNoOfReps)
        tblDataRow.appendChild(tblDataCellVotedWithParty)
        tblBody.appendChild(tblDataRow)
    }
}

if(document.title == "Senate Attendance"){
    voteWithParty("senate-at-a-glance")
}if(document.title == "Senate: Party Loyalty"){
    voteWithParty("senate-at-a-glance")
}else if(document.title == "House Attendance"){
    voteWithParty("house-at-a-glance")
}else if(document.title == "House of Representatives: Party Loyalty"){
    voteWithParty("house-at-a-glance")
}

//-----Least Engaged (Bottom 10%)
const leastEngaged = (location_by_id) => {

    const tenCategories = ["Missed Votes %", "Full Name", "Party", "State"]

    var worstTen = members.sort(function(a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    });

    var tenPercent = Math.floor(worstTen.length*0.1);
    var worstTenPercent = worstTen.slice(0, tenPercent);

    const votesTbl = document.getElementById(location_by_id)
    const tblHead = document.createElement('thead');
    tblHead.classList = "thead-dark"
    const tblBody = document.createElement('tbody');

    for (i in tenCategories) {
    const tblHeadRow = document.createElement('th');
    const tblHeadText = document.createTextNode(tenCategories[i]);
    tblHeadRow.appendChild(tblHeadText);
    tblHead.appendChild(tblHeadRow);
    votesTbl.appendChild(tblHead);
    votesTbl.appendChild(tblBody);
    }

    for (j in worstTenPercent) {
        const tblDataRow = document.createElement('tr');
        const tblDataCellMissedVotes = document.createElement('td');
        const tblDataCellName = document.createElement('td');
        const tblDataCellParty = document.createElement('td');
        const tblDataCellState = document.createElement('td');
        const tblCellTextMissedVotes = document.createTextNode(worstTenPercent[j].missed_votes_pct);
        const tblCellTextName = document.createTextNode(worstTenPercent[j].first_name + " " + worstTenPercent[j].last_name, );
        const tblCellTextParty = document.createTextNode(worstTenPercent[j].party);
        const tblCellTextState = document.createTextNode(worstTenPercent[j].state);
        tblDataCellMissedVotes.appendChild(tblCellTextMissedVotes)
        tblDataCellName.appendChild(tblCellTextName);
        tblDataCellParty.appendChild(tblCellTextParty);
        tblDataCellState.appendChild(tblCellTextState);
        tblDataRow.appendChild(tblDataCellMissedVotes)
        tblDataRow.appendChild(tblDataCellName)
        tblDataRow.appendChild(tblDataCellParty)
        tblDataRow.appendChild(tblDataCellState)
        tblBody.appendChild(tblDataRow)
    }
}

if(document.title == "Senate Attendance"){
    leastEngaged("senate-least-engaged")
}else if(document.title == "House Attendance"){
    leastEngaged("house-least-engaged")
}

//-----Most Engaged (Top 10%)
const topTenAttendance = (location_by_id) => {

    const tenCategories = ["Missed Votes %", "Full Name", "Party", "State"]

    var bestTen = members.sort(function(a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });
    
    var tenPercent = Math.floor(bestTen.length*0.1);
    var topTenPercent = bestTen.slice(0, tenPercent);

    const votesTbl = document.getElementById(location_by_id)
    const tblHead = document.createElement('thead');
    tblHead.classList = "thead-dark"
    const tblBody = document.createElement('tbody');

    for (i in tenCategories) {
    const tblHeadRow = document.createElement('th');
    const tblHeadText = document.createTextNode(tenCategories[i]);
    tblHeadRow.appendChild(tblHeadText);
    tblHead.appendChild(tblHeadRow);
    votesTbl.appendChild(tblHead);
    votesTbl.appendChild(tblBody);
    }

    for (j in topTenPercent) {
        const tblDataRow = document.createElement('tr');
        const tblDataCellMissedVotes = document.createElement('td');
        const tblDataCellName = document.createElement('td');
        const tblDataCellParty = document.createElement('td');
        const tblDataCellState = document.createElement('td');
        const tblCellTextMissedVotes = document.createTextNode(topTenPercent[j].missed_votes_pct);
        const tblCellTextName = document.createTextNode(topTenPercent[j].first_name + " " + topTenPercent[j].last_name, );
        const tblCellTextParty = document.createTextNode(topTenPercent[j].party);
        const tblCellTextState = document.createTextNode(topTenPercent[j].state);
        tblDataCellMissedVotes.appendChild(tblCellTextMissedVotes)
        tblDataCellName.appendChild(tblCellTextName);
        tblDataCellParty.appendChild(tblCellTextParty);
        tblDataCellState.appendChild(tblCellTextState);
        tblDataRow.appendChild(tblDataCellMissedVotes)
        tblDataRow.appendChild(tblDataCellName)
        tblDataRow.appendChild(tblDataCellParty)
        tblDataRow.appendChild(tblDataCellState)
        tblBody.appendChild(tblDataRow)
    }
}

if(document.title == "Senate Attendance"){
    topTenAttendance("senate-most-engaged")
}else if(document.title == "House Attendance"){
    topTenAttendance("house-most-engaged")
}

//-----Least Loyal (Bottom 10%)
const leastLoyalTableCategory = (id) => {
    const categories = ["Name", "No. Party Votes", "% Party Votes"];

    var worstTen = members.sort(function(a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });

    var tenPercent = Math.floor(worstTen.length*0.1);
    var worstTenPercent = worstTen.slice(0, tenPercent);

    //Specifies where the output is returned to
    const tbl = document.getElementById(id);
    //Orders said HTML elements to be created
    const tblHead = document.createElement('thead');
    tblHead.classList = "thead-dark"
    const tblBody = document.createElement('tbody');
    //Create the table head as well as the texts inside for all the categories in the abstract array
    for (i in categories) {
      const tblHeadRow = document.createElement('th');
      const tblHeadText = document.createTextNode(categories[i]);
      //Table head text node to be attached to the table head row; table head row to the table head
      tblHeadRow.appendChild(tblHeadText);
      tblHead.appendChild(tblHeadRow);
    }
    //Attach the table body to the table head created above
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);

for (j in worstTenPercent) {
    //Create the rows as well as the cells
    const tblDataRow = document.createElement('tr');
    const tblDataCellName = document.createElement('td');
    const tblDataCellParty = document.createElement('td');
    const tblDataCellState = document.createElement('td');
    //Cause the actual data to fit into said cells as text nodes
    const tblCellTextName = document.createTextNode(worstTenPercent[j].first_name + " " + worstTenPercent[j].last_name)
    const tblCellTextParty = document.createTextNode((Math.floor(worstTenPercent[j].total_votes/100*worstTenPercent[j].votes_with_party_pct)*100)/100);
    const tblCellTextState = document.createTextNode(worstTenPercent[j].votes_with_party_pct);
    //All the cells with the data inside to be attached to the corresponding rows
    tblDataCellName.appendChild(tblCellTextName);
    tblDataCellParty.appendChild(tblCellTextParty);
    tblDataCellState.appendChild(tblCellTextState);
    tblDataRow.appendChild(tblDataCellName)
    tblDataRow.appendChild(tblDataCellParty)
    tblDataRow.appendChild(tblDataCellState)
    tblBody.appendChild(tblDataRow)
    }
}

if(document.title == "House of Representatives: Party Loyalty"){
    leastLoyalTableCategory("house-least-loyal")
}else if(document.title == "Senate: Party Loyalty"){
    leastLoyalTableCategory("senate-least-loyal")
}

//-----Most Loyal (Top 10%)
const mostLoyalTableCategory = (id) => {
    const categories = ["Name", "No. Party Votes", "% Party Votes"];

    var topTen = members.sort(function(a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    var tenPercent = Math.floor(topTen.length*0.1);
    var topTenPercent = topTen.slice(0, tenPercent);

    //Specifies where the output is returned to
    const tbl = document.getElementById(id);
    //Orders said HTML elements to be created
    const tblHead = document.createElement('thead');
    tblHead.classList = "thead-dark"
    const tblBody = document.createElement('tbody');
    //Create the table head as well as the texts inside for all the categories in the abstract array
    for (i in categories) {
      const tblHeadRow = document.createElement('th');
      const tblHeadText = document.createTextNode(categories[i]);
      //Table head text node to be attached to the table head row; table head row to the table head
      tblHeadRow.appendChild(tblHeadText);
      tblHead.appendChild(tblHeadRow);
    }
    //Attach the table body to the table head created above
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);

for (j in topTenPercent) {
    //Create the rows as well as the cells
    const tblDataRow = document.createElement('tr');
    const tblDataCellName = document.createElement('td');
    const tblDataCellParty = document.createElement('td');
    const tblDataCellState = document.createElement('td');
    //Cause the actual data to fit into said cells as text nodes
    const tblCellTextName = document.createTextNode(topTenPercent[j].first_name + " " + topTenPercent[j].last_name);
    const tblCellTextParty = document.createTextNode((Math.floor(topTenPercent[j].total_votes/100*topTenPercent[j].votes_with_party_pct)*100)/100);
    const tblCellTextState = document.createTextNode(topTenPercent[j].votes_with_party_pct);
    //All the cells with the data inside to be attached to the corresponding rows
    tblDataCellName.appendChild(tblCellTextName);
    tblDataCellParty.appendChild(tblCellTextParty);
    tblDataCellState.appendChild(tblCellTextState);
    tblDataRow.appendChild(tblDataCellName)
    tblDataRow.appendChild(tblDataCellParty)
    tblDataRow.appendChild(tblDataCellState)
    tblBody.appendChild(tblDataRow)
    }
}

if(document.title == "House of Representatives: Party Loyalty"){
    mostLoyalTableCategory("house-most-loyal")
}else if(document.title == "Senate: Party Loyalty"){
    mostLoyalTableCategory("senate-most-loyal")
}


//******Checkbox Filters
//Syntax: target.addEventListener(type, listener [, options]);
document.getElementById("R").addEventListener("click", function () { 
    filter()
    //renderTable() 
});
document.getElementById("D").addEventListener("click", function () { 
    filter()
    //renderTable() 
});
document.getElementById("I").addEventListener("click", function () { 
    filter()
    //renderTable() 
});

function getCheckboxesValue() {
    var checkboxes = []
    //The given variable retrieves and displays all the elements associated with the checked checkboxes
    var selectedParties = document.querySelectorAll('input[type=checkbox]:checked');
    //Push the elements belonging to all the checked items into the array of var checkboxes
    for (i = 0; i < selectedParties.length; i++) {
        checkboxes.push(selectedParties[i].value)
    }
    return checkboxes
}

function renderTable(members) {
    let id = 0
    if(document.title.includes("House")){
        id="house-data"
    }else{
        id="senate-data"
    }
    //Grab the existing table in html whose ID is specified below
    var tbody = document.getElementById(id)
    tbody.innerHTML = " "
    var checkedChexboxes = getCheckboxesValue()
    //Create the following components of the table
    const tblHead = document.createElement('thead')
    tblHead.classList = "thead-dark"
    var th = document.createElement("th")
    var th1 = document.createElement("th")
    var th2 = document.createElement("th")
    var th3 = document.createElement("th")
    var th4 = document.createElement("th")
    //Attach together the components created above
    tbody.appendChild(tblHead)
    tblHead.appendChild(th)
    tblHead.appendChild(th1)
    tblHead.appendChild(th2)
    tblHead.appendChild(th3)
    tblHead.appendChild(th4)
    //Fill the table head with the following nodes
    th.innerHTML = "Name"
    th1.innerHTML = "Party"
    th2.innerHTML = "State"
    th3.innerHTML = "Seniority"
    th4.innerHTML = "% of Votes w/ Party"

    for (var i = 0; i < members.length; i++) {
        //When checkboxes are selected, display the following table which includes relevant items
        // if (checkedChexboxes.includes(members[i].party)){
            var row = document.createElement("tr")
            var td = document.createElement("td")
            var td1 = document.createElement("td")
            var td2 = document.createElement("td")
            var td3 = document.createElement("td")
            var td4 = document.createElement("td")
            td.innerHTML = members[i].first_name + " " + members[i].last_name
            td1.innerHTML = members[i].party
            td2.innerHTML = members[i].state
            td3.innerHTML = members[i].seniority
            td4.innerHTML = members[i].votes_with_party_pct
            row.appendChild(td)
            row.appendChild(td1)
            row.appendChild(td2)
            row.appendChild(td3)
            row.appendChild(td4)
            tbody.appendChild(row)
        //If not, display the following table which includes all the items
        //"=== 0" in this case specfies that nothing is checked
        // }else if(checkedChexboxes.length === 0){
            // var row = document.createElement("tr")
            // var td = document.createElement("td")
            // var td1 = document.createElement("td")
            // var td2 = document.createElement("td")
            // var td3 = document.createElement("td")
            // var td4 = document.createElement("td")
            // td.innerHTML = members[i].first_name + " " + members[i].last_name
            // td1.innerHTML = members[i].party
            // td2.innerHTML = members[i].state
            // td3.innerHTML = members[i].seniority
            // td4.innerHTML = members[i].votes_with_party_pct
            // row.appendChild(td)
            // row.appendChild(td1)
            // row.appendChild(td2)
            // row.appendChild(td3)
            // row.appendChild(td4)
            // tbody.appendChild(row)
        // }
    }
}

renderTable(members)

//*****Drodown Menu Filter

function getDropdownValue() {
    var selectedState = document.getElementById("state").value
    return selectedState
}

let state = []

for (i=0; i < members.length; i++){
state.push(members[i].state)
}

//If the elementOfTheArray is not(!) included in the newArrayWithoutDuplictes, put it in
function removeDuplicate(stateParameter) {
    let newArrayWithoutDuplicates = []
    stateParameter.map(elementOfTheArray => {
        if(!newArrayWithoutDuplicates.includes(elementOfTheArray)){
            newArrayWithoutDuplicates.push(elementOfTheArray)
        }
    })
    return newArrayWithoutDuplicates
}

var newStateArray = removeDuplicate(state)
var newStateArraySorted = newStateArray.sort()

// function renderTableStates() {
//     let id = 0
//     if(document.title.includes("House")){
//         id="house-data"
//     }else{
//         id="senate-data"
//     }
//     //Grab the existing table in html whose ID is specified below
//     var tbody = document.getElementById(id)
//     tbody.innerHTML = ""
//     var dropdownSelection = document.getElementById("state")
//     dropdownSelection.innerHTML = ""
//     //Create the following components of the table
//     const tblHead = document.createElement('thead')
//     tblHead.classList = "thead-dark"
//     var th = document.createElement("th")
//     var th1 = document.createElement("th")
//     var th2 = document.createElement("th")
//     var th3 = document.createElement("th")
//     var th4 = document.createElement("th")
//     //Attach together the components created above
//     tbody.appendChild(tblHead)
//     tblHead.appendChild(th)
//     tblHead.appendChild(th1)
//     tblHead.appendChild(th2)
//     tblHead.appendChild(th3)
//     tblHead.appendChild(th4)
//     //Fill the table head with the following nodes
//     th.innerHTML = "Name"
//     th1.innerHTML = "Party"
//     th2.innerHTML = "State"
//     th3.innerHTML = "Seniority"
//     th4.innerHTML = "% of Votes w/ Party"

//     for (var i = 0; i < members.length; i++) {
//         //When an option is selected, display the following table which includes relevant items
//         if (members[i].state === selectedState){
//             var row = document.createElement("tr")
//             var td = document.createElement("td")
//             var td1 = document.createElement("td")
//             var td2 = document.createElement("td")
//             var td3 = document.createElement("td")
//             var td4 = document.createElement("td")
//             td.innerHTML = members[i].first_name + " " + members[i].last_name
//             td1.innerHTML = members[i].party
//             td2.innerHTML = members[i].state
//             td3.innerHTML = members[i].seniority
//             td4.innerHTML = members[i].votes_with_party_pct
//             row.appendChild(td)
//             row.appendChild(td1)
//             row.appendChild(td2)
//             row.appendChild(td3)
//             row.appendChild(td4)
//             tbody.appendChild(row)
//         //If not, display the following table which includes all the items
//         //"=== 0" in this case specfies that nothing is checked
//         }else if(dropdownSelection.length === 0){
//             var row = document.createElement("tr")
//             var td = document.createElement("td")
//             var td1 = document.createElement("td")
//             var td2 = document.createElement("td")
//             var td3 = document.createElement("td")
//             var td4 = document.createElement("td")
//             td.innerHTML = members[i].first_name + " " + members[i].last_name
//             td1.innerHTML = members[i].party
//             td2.innerHTML = members[i].state
//             td3.innerHTML = members[i].seniority
//             td4.innerHTML = members[i].votes_with_party_pct
//             row.appendChild(td)
//             row.appendChild(td1)
//             row.appendChild(td2)
//             row.appendChild(td3)
//             row.appendChild(td4)
//             tbody.appendChild(row)
//         }
//     }
// }

// renderTableStates()

function statefilter(){

    var dropdown = document.getElementById("state")
    var optionAll = document.createElement("option")
    optionAll.value = "All"
    optionAll.innerHTML = "All"
    dropdown.appendChild(optionAll)
    newStateArraySorted.forEach(stateInThatArray => {

    var options = document.createElement("option")
    options.innerHTML = stateInThatArray
    options.value=stateInThatArray
    dropdown.appendChild(options)
    });

    document.getElementById("state").addEventListener("change", function () {
    // var select =     document.getElementById("state")
    // var stateSelected = select.options[select.selectedIndex].text;
    // renderTableStates()
    // console.log(stateSelected)
    // selectedState = stateSelected
    filter()
    })
}

var selectedState = ""
statefilter()

function filter(){
    let parties = getCheckboxesValue()
    let state = getDropdownValue()
    let filteredMembers = []
    if(parties.length === 0 && state === "All"){
        filteredMembers = members;
    }else if(parties.length !== 0 && state === "All"){
        for(let i = 0; i < members.length; i++){
            if(parties.includes(members[i].party)){
                filteredMembers.push(members[i])
            }
        }
    }else if(parties.length === 0 && state !== "All"){
        for(let i = 0; i < members.length; i++){
            if(state.includes(members[i].state)){
                filteredMembers.push(members[i])
            }
        }
    }else{let temporaryArray=[]
        //loops through the members, filters out or keeps the members depending on the match
        temporaryArray=members.filter(member=>member.state===state)
        parties.forEach(party=>{
        let temporaryArray1=[]
        temporaryArray1.push(temporaryArray.filter(member=>member.party===party))
        filteredMembers.push(temporaryArray1[0][0]);
    })
    }
    renderTable(filteredMembers)
}
