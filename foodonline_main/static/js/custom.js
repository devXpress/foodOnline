let autocomplete;

function initAutoComplete(){
autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('id_address'),
    {
        types: ['geocode', 'establishment'],
        //default in this app is "IN" - add your country code
        componentRestrictions: {'country': ['ng']},
    })
// function to specify what should happen when the prediction is clicked
autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged (){
    var place = autocomplete.getPlace();

    // User did not select the prediction. Reset the input field or alert()
    if (!place.geometry){
        document.getElementById('id_address').placeholder = "Start typing...";
    }
    else{
        //console.log('place name=>', place.name)
       // console.log('Full address =>', place.formatted_address);
        //console.log('Latitude =>', place.geometry.location.lat());
        //console.log('Longitude =>', place.geometry.location.lng());
        //let postalCode = '';
        //if (place.address_components) {
       // place.address_components.forEach(component => {
            //if (component.types.includes('postal_code')) {
           //     postalCode = component.long_name;
           // }
       // });
   // }
   // console.log('Pincode =>', postalCode || 'No pincode found');
    }
    // get the address components and assign them to the fields
    //console.log(place);
    var geocoder = new google.maps.Geocoder()
    var address = document.getElementById('id_address').value

    geocoder.geocode({'address': address}, function(result,status){
        //console.log('result =>', result)
        //console.log('status =>', status)
        if(status === 'OK'){
            var latitude = result[0].geometry.location.lat();
            var longitude = result[0].geometry.location.lng();

            //console.log('lat=>',latitude)
            //onsole.log('long=>', longitude)
            $('#id_latitude').val(latitude);
            $('#id_longitude').val(longitude);;

        

        }
    });
    //loop through the address component and assign other data
    console.log(place.address_components)
    for(var i=0; i<place.address_components.length; i++){
        for(var j=0; j<place.address_components[i].types.length; j++){
            if(place.address_components[i].types[j] ==='country'){
                $('#id_country').val(place.address_components[i].long_name);
            }
            //get state
            if(place.address_components[i].types[j] ==='administrative_area_level_1'){
                $('#id_state').val(place.address_components[i].long_name);
            //get city
             }
            if(place.address_components[i].types[j] ==='locality'){
                $('#id_city').val(place.address_components[i].long_name);
            }
             //get pin code
            if(place.address_components[i].types[j] ==='postal_code'){
                $('#id_pin_code').val(place.address_components[i].long_name);
            }else{
                $('#id_pin_code').val("");
            }
    }

}}

$(document).ready(function(){
    // Add to cart functionality
    $('.add_to_cart').on('click', function(e){
        e.preventDefault();
        var food_id = $(this).attr('data-id');
        var url = $(this).attr('data-url');
        
        $.ajax({
            type: 'GET',  // Changed from POST to GET since your view handles GET requests
            url: url,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'  // Explicitly set the header
            },
            success: function(response){
                console.log(response);
                if (response.status === 'login_required') {
                    swal({
                        title: "Login Required",
                        text: response.message,
                        icon: "warning",
                        button: "OK",
                    }).then(() => {
                        window.location.href = '/login/';
                    });
                }
                else if (response.status === 'Failed') {
                    swal({
                        title: "Error",
                        text: response.message,
                        icon: "error",
                        button: "OK",
                    });
                }
                else{
                     $('#cart_counter').html(response.cart_counter['cart_count']);
                     $('#qty-' + food_id).html(response.qty);

                     applyCartAmount(response.cart_amount['subtotal'], 
                                    response.cart_amount['tax'], 
                                    response.cart_amount['grand_total']);
                }
               
            }
           
        });
    });
    //place the cart item quantity on load
    $('.item_qty').each(function(){
        var the_id = $(this).attr('id')
        var qty = $(this).data('qty')
        console.log(qty)
        $('#' + the_id).html(qty);
    });

// Decrease cart functionality
    $('.decrease_cart').on('click', function(e){
        e.preventDefault();
        var food_id = $(this).attr('data-id');
        var url = $(this).attr('data-url');
        var cart_id = $(this).attr('id'); // Get the cart item ID for deletion
        
        $.ajax({
            type: 'GET',  // Changed from POST to GET since your view handles GET requests
            url: url,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'  // Explicitly set the header
            },
            success: function(response){
                console.log(response);
                if (response.status === 'login_required') {
                    swal({
                        title: "Login Required",
                        text: response.message,
                        icon: "warning",
                        button: "OK",
                    }).then(() => {
                        window.location.href = '/login/';
                    });
                }

                
                if (response.status === 'Failed') {
                    console.log(response);
                    swal({
                        title: "Error",
                        text: response.message,
                        icon: "error",
                        button: "OK",
                    });
                }
                else{
                     $('#cart_counter').html(response.cart_counter['cart_count']);
                     $('#qty-' + food_id).html(response.qty);

                     applyCartAmount(response.cart_amount['subtotal'], 
                                    response.cart_amount['tax'], 
                                    response.cart_amount['grand_total']);

                        if (window.location.pathname === '/cart/') {
                            removeCartItem(response.qty, cart_id); // Call the function to remove the item if quantity is 0
                            checkEmptyCart();
                    
                        }

                        
               

            }}
           
        });
    })

    // Delete cart functionality
    $('.delete_cart').on('click', function(e){  
        e.preventDefault();
        
        var cart_id = $(this).attr('data-id');
        var url = $(this).attr('data-url');
        
        $.ajax({
            type: 'GET',  // Changed from POST to GET since your view handles GET requests
            url: url,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'  // Explicitly set the header
            },
            success: function(response){
                console.log(response);
               
                if (response.status === 'Failed') {
                    swal({
                        title: "Error",
                        text: response.message,
                        icon: "error",
                        button: "OK",
                    });
                }
                else{
                     $('#cart_counter').html(response.cart_counter['cart_count']);
                     swal(response.status, response.message, "success");

                     applyCartAmount(response.cart_amount['subtotal'], 
                                    response.cart_amount['tax'], 
                                    response.cart_amount['grand_total']);
                                    
                     removeCartItem(0, cart_id);
                     checkEmptyCart();
                }
               
            }
           
        });
    });
    // delete cart element if the quantity is 0
  function removeCartItem(cartItemQty,cart_id) {
   
        if (cartItemQty <= 0) {
           document.getElementById('cart_item_' + cart_id).remove();
           swal("Item Removed", "The item has been removed from your cart.", "success");
        }}
    

    // Check if the cart is empty and show a message if it is
    function checkEmptyCart() {
        var cart_counter = document.getElementById('cart_counter').innerHTML
        if (cart_counter == '0') {
            document.getElementById('empty-cart-message').style.display = 'block';
            
        }
    }

    //Apply cart amount 
    function applyCartAmount(subtotal, tax, grand_total) {
        if (window.location.pathname === '/cart/') {
            $('#subtotal').html(subtotal);
            $('#tax').html(tax);
            $('#total').html(grand_total);
        }
        
    }
    
});
