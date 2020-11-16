$(document).ready(function(){
    $('select').change(function(event){
        let order_object_name = event.target.id;
        let order_id = order_object_name.split('-')[1];
        let order_status = $('#' + order_object_name).val();
        let order_price = $('#order_price-' +order_id).val();

        console.log(`order ${order_id} changed to ${order_status}`);
        console.log(order_price);
        // send ajax request to update DB

        updateOrder(order_id, {'orderStatus': order_status, 'totalPrice': order_price});
    });

    $('.price_text').change(function(event) {
        let order_object_name = event.target.id;
        let order_id = order_object_name.split('-')[1];
        let order_status = $('#order_status-' + order_id).val();
        let order_price = $('#' + order_object_name).val();

        console.log(`order ${order_id} changed to ${order_status}`);
        console.log(order_price);
        // send ajax request to update DB

        updateOrder(order_id, {'orderStatus': order_status, 'totalPrice': order_price});
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