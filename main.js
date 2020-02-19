//-----House / Senate at a Glance
const voteWithParty = (location_by_id, members) => {

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

    //Add up all the members from each party
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

    //Add up the percentage of the members of each party voting with the party
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

    //Render the tables
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
        //Calculate the average and round it up to the 2nd decimal place
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

//-----Least Engaged (Bottom 10%)
const leastEngaged = (location_by_id, members) => {

    const tenCategories = ["Missed Votes %", "Full Name", "Party", "State"]

    //Sort the list from the lowest to the highest
    var worstTen = members.sort(function(a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    });

    //Round up the list to the bottom 10%
    var tenPercent = Math.floor(worstTen.length*0.1);
    var worstTenPercent = worstTen.slice(0, tenPercent);

    //Render the table
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

//-----Most Engaged (Top 10%)
const topTenAttendance = (location_by_id, members) => {

    const tenCategories = ["Missed Votes %", "Full Name", "Party", "State"]

    //Sort the list from the highest to the lowest
    var bestTen = members.sort(function(a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });
    
    //Round up the list to the top 10%
    var tenPercent = Math.floor(bestTen.length*0.1);
    var topTenPercent = bestTen.slice(0, tenPercent);

    //Render the table
    //Specifies where the output is returned to
    const votesTbl = document.getElementById(location_by_id)
    //Orders said HTML elements to be created
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

//-----Least Loyal (Bottom 10%)
const leastLoyalTableCategory = (id, members) => {
    const categories = ["Name", "No. Party Votes", "% Party Votes"];

    //Sort the list from the lowest to the highest
    var worstTen = members.sort(function(a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });

    //Round up the list to the bottom 10%
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

//-----Most Loyal (Top 10%)
const mostLoyalTableCategory = (id, members) => {
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

//******Checkbox Filters
if(document.title.includes("Congress")){
//The following events occur when changes are added to the specified elements
document.getElementById("R").addEventListener("change", function () { 
    filter()
});
document.getElementById("D").addEventListener("change", function () { 
    filter()
});
document.getElementById("I").addEventListener("change", function () { 
    filter()
});}

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
    }
}

//*****Drodown Menu Filter
//Specifies which HTML element the filter function below calls
function getDropdownValue() {
    var selectedState = document.getElementById("state").value
    return selectedState
}

function updateStateFilter(states){
    var dropdown = document.getElementById("state")
    var optionAll = document.createElement("option")
    //When "All" is selected, members of all states are generated accordingly
    optionAll.value = "All";
    optionAll.innerHTML = "All";
    dropdown.appendChild(optionAll)
    //When a certain state is selected, the value "state" responds as an option
    states.forEach(state => {
        var options = document.createElement("option")
        options.innerHTML = state;
        options.value = state;
        dropdown.appendChild(options)
    });

    //When a change is added, the following function is called
    document.getElementById("state").addEventListener("change", function () {
        filter()
    })
}

function filter(){
    let parties = getCheckboxesValue()
    let state = getDropdownValue()
    let filteredMembers = members

    //If a certain state is selected (not "All"), filter the members accordingly
    if(state !== "All"){
        filteredMembers = filteredMembers.filter(member => member.state === state)
    }
    console.log(filteredMembers)

    //If a certain party / parties are selected (more than 0), filter the members accordingly
    if(parties.length > 0){
        filteredMembers = filteredMembers.filter(member => parties.includes(member.party))
    }
    console.log(filteredMembers)

    renderTable(filteredMembers)
}

//Retrieve the list of the members and return the Json object with the server response
function fetchUserData(){
    if(document.title.includes("House")){
    return fetch('https://api.propublica.org/congress/v1/113/house/members.json',{
      method: "GET",
      headers: {
        "X-API-Key": "rpNCuXoYOkPWov7EdSX7RpORSbKWNcVBHELvbvpQ"
      }
    })
      .then((response) => response.json())
    }else if(document.title.includes("Senate")){
        return fetch('https://api.propublica.org/congress/v1/113/senate/members.json',{
      method: "GET",
      headers: {
        "X-API-Key": "rpNCuXoYOkPWov7EdSX7RpORSbKWNcVBHELvbvpQ"
      }
    })
      .then((response) => response.json())
    }
}

if(document.title.includes("Congress")){
//Call the fetch function from above
fetchUserData().then(data => {
    members = data.results[0].members
    //Render the table of the members
    renderTable(members)
    

    //Generate the state list and update the dropdown filter by canceling the duplicates and sorting alphabetically
    var states = members.map(member => member.state)
    var uniqueStates = states.filter((state, index) => states.indexOf(state) === index)
    uniqueStates.sort()

    updateStateFilter(uniqueStates)

    
})}else{

    //Render the tables for all the other pages
fetchUserData().then(data => {
    members = data.results[0].members
    if(document.title == "Senate Attendance"){
        topTenAttendance("senate-most-engaged", members)
    }else if(document.title == "House Attendance"){
        topTenAttendance("house-most-engaged", members)
    }
    
    if(document.title == "House of Representatives: Party Loyalty"){
        mostLoyalTableCategory("house-most-loyal", members)
    }else if(document.title == "Senate: Party Loyalty"){
        mostLoyalTableCategory("senate-most-loyal", members)
    }
    
    if(document.title == "House of Representatives: Party Loyalty"){
        leastLoyalTableCategory("house-least-loyal", members)
    }else if(document.title == "Senate: Party Loyalty"){
        leastLoyalTableCategory("senate-least-loyal", members)
    }
    
    if(document.title == "Senate Attendance"){
        leastEngaged("senate-least-engaged", members)
    }else if(document.title == "House Attendance"){
        leastEngaged("house-least-engaged", members)
    }
    
    if(document.title == "Senate Attendance"){
        voteWithParty("senate-at-a-glance", members)
    }if(document.title == "Senate: Party Loyalty"){
        voteWithParty("senate-at-a-glance", members)
    }else if(document.title == "House Attendance"){
        voteWithParty("house-at-a-glance", members)
    }else if(document.title == "House of Representatives: Party Loyalty"){
        voteWithParty("house-at-a-glance", members)
    }
})
}

// -----Search bar
// document.getElementById("searchbar").addEventListener("change", function () { 
//     filter()
// });

// function searchFunction() { 
//     let input = document.getElementById('searchbar').value 
//     input=input.toLowerCase(); 
//     let x = document.getElementsById(members.first_name + members.last_name); 
      
//     for (i = 0; i < x.length; i++) {  
//         if (!x[i].innerHTML.toLowerCase().includes(input)) { 
//             x[i].style.display="none"; 
//         } 
//         else { 
//             x[i].style.display="list-item";                  
//         } 
//     } 
//     searchFunction(x)
// } 

// const list = document.getElementById('house-data');
// function setList(group) {
//     clearList();
//     for (const person of group) {
//         const item = document.createElement
//     }
// }

// function clearList() {

// }
// const searchInput = document.getElementById('search');

// searchInput.addEventListener('input', () => {

// })

