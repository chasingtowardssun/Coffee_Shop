$(document).ready(function () {
    $('select').change(function (event) {
        let order_object_name = event.target.id;
        let order_id = order_object_name.split('-')[1];
        let order_status = $('#' + order_object_name).val();
        // let order_price = $('#order_price-' + order_id).val();

        console.log(`order ${order_id} changed to ${order_status}`);
        // console.log(order_price);
        // send ajax request to update DB

        // updateOrder(order_id, {'orderStatus': order_status, 'totalPrice': order_price});
        updateOrder(order_id, {'orderStatus': order_status});
    });

    // $('.price_text').change(function(event) {
    //     let order_object_name = event.target.id;
    //     let order_id = order_object_name.split('-')[1];
    //     let order_status = $('#order_status-' + order_id).val();
    //     // let order_price = $('#' + order_object_name).val();
    //
    //     console.log(`order ${order_id} changed to ${order_status}`);
    //     // console.log(order_price);
    //     // send ajax request to update DB
    //
    //     // updateOrder(order_id, {'orderStatus': order_status, 'totalPrice': order_price});
    //     updateOrder(order_id, {'orderStatus': order_status});
    // });

    $('.detail_btn').click(function (event) {
        let order_object_name = event.target.id;
        let order_id = order_object_name.split('-')[1];
        console.log(`Getting details for order ${order_id}`);

        getOrderDetails(order_id);
    });
});


function updateOrder(id, data) {
    $.ajax({
        url: '/orders/' + id,
        type: 'PUT',
        data: data,
        success: function (result) {
            window.location.replace("./orders");
        }
    })
}


function getOrderDetails(id) {
    $.ajax({
        url: '/orders/' + id,
        type: 'GET',
        data: {},
        success: function (result) {
            $(`#order_detail_content-${id}`).html(result);
            if ($(`#order_detail-${id}`).is(":visible")) {
                $(`#order_detail-${id}`).hide();
            } else {
                $(`#order_detail-${id}`).show();
            }
        }
    })
}
