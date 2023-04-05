function reloadUsers() {

    // Remove/clean all rows in the table
    $("#usersTable > tbody").empty();

    $.get("/api/users", function (data) {
    for (i=0; i < data.length; i++){  

        $("#usersTable > tbody").append("<tr><td>" + data[i].id + "</td><td>" + data[i].name + "</td><td>" + data[i].email + "</td></tr>");
    }
    });
}

$(document).ready(function () {

    reloadUsers();

    $("#btnClear").click(function () {
        $("#userId").val("");
        $("#userName").val("");
        $("#userEmail").val("");
    })

    $("form").submit(function () {

        const data = {
            id: $("#userId").val(),
            name: $("#userName").val(),
            email: $("#userEmail").val()
        }

        console.log(data);

        $.post("/api/users/create",data,function(data) {
            console.log("Done");
            reloadUsers();
        });

        return false; // Don't remove this line.
    });
});