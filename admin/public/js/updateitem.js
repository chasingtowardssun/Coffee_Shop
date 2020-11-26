$(document).ready(function () {
    console.log('ready');

    $("#update-item").submit(function (event) {
        event.preventDefault();

        const id = $('#item_id').val();

        console.log(id + '=>' + $('#update-item').serialize());
        $.ajax({
            url: '/items/' + id,
            type: 'PUT',
            data: $('#update-item').serialize(),
            success: function (result) {
                window.location.replace("./");
            }
        })
    });
});