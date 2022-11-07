function removeData(id){
    //get data from localstorage and store to contaclist array
    //we must to use JSON.parse, because data as string, we need convert to array
    contactList = JSON.parse(localStorage.getItem('list')) ?? []

    contactList = contactList.filter(function(value){ 
        return value.id != id; 
    });

    // save array into localstorage
    localStorage.setItem('list', JSON.stringify(contactList))

    //get data again
    allData2()
}