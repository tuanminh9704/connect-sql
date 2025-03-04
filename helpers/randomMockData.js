module.exports.genarateMockEmployees = (length) => {
    const mockData = [];
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let i = 0; i < length; i++){
        const randomCharecter = characters.charAt(Math.floor(Math.random() * characters.length));
        const randomNumber = Math.floor(Math.random() * 1000);
        mockData.push({
            employee_id: "NV" + randomCharecter + randomNumber,
            name: "Nguyen Van " + randomCharecter,
            salary: (Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)).toString(),
            department_id: 'P1' ,
            // age: 20
        })
    }
    return mockData;
}