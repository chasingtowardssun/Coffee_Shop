function updateOrder(id) {
    console.log($('#update-order').serialize());
    $.ajax({
        url: '/orders/' + id,
        type: 'PUT',
        data: $('#update-order').serialize(),
        success: function (result) {
            window.location.replace("./");
        }
    })
}