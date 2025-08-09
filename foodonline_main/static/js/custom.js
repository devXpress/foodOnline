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
