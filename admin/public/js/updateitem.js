function updateItem(id) {
    console.log($('#update-item').serialize());
    $.ajax({
        url: '/items/' + id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function (result) {
            window.location.replace("./");
        }
    })
}
